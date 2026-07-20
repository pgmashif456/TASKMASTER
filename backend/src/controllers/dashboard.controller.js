  import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getAdminDashboard,
  getStudentDashboard,
} from "../services/dashboard.service.js";

//admin dashboard controller//
export const getAdminDashboardController = asyncHandler(
  async (req, res) => {
    const dashboard = await getAdminDashboard();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Admin dashboard fetched successfully",
        dashboard
      )
    );
  }
);
//student dashboard controller//
export const getStudentDashboardController = asyncHandler(
  async (req, res) => {
    const dashboard = await getStudentDashboard(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Student dashboard fetched successfully",
        dashboard
      )
    );
  }
);