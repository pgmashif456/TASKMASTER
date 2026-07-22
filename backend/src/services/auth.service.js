 import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import hashPassword from "../utils/hashPassword.js";
import comparePassword from "../utils/comparePassword.js";
import generateToken from "../utils/generateToken.js";
 //**---------------------register user----------------------- */
 export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
//**---------------------login user----------------------- */
export const loginUser = async (loginData) => {
  const { email, password } = loginData;

  // Find User
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare Password
  const isPasswordValid = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate Token
  const token = generateToken(user);

  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return {
    token,
    user: userResponse,
  };
};
//**---------------------get profile service ----------------------- */
export const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};