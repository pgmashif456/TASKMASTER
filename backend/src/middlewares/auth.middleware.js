  import jwt from "jsonwebtoken";

import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

// ============================
// Authentication Middleware
// ============================
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Access token is required"));
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token expired"));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token"));
    }

    next(error);
  }
};

// ============================
// Role Authorization Middleware
// ============================
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }

    next();
  };
};

export default authMiddleware;