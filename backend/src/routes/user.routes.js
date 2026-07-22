    
   import { Router } from "express";
import authMiddleware, {
  authorize,
} from "../middlewares/auth.middleware.js";
import { getStudentsController } from "../controllers/user.controller.js";

const router = Router();

router.get(
  "/students",
  authMiddleware,
  authorize("ADMIN"),
  getStudentsController
);

export default router;