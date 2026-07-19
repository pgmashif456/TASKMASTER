 import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  registerUser,
  loginUser,
  getProfile,
} from "../services/auth.service.js";


export const registerController = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "User registered successfully",
      result
    )
  );
});

export const loginController = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      result
    )
  );
});

export const profileController = asyncHandler(async (req, res) => {
  const user = await getProfile(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Profile fetched successfully",
      user
    )
  );
});