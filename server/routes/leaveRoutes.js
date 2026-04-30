import { Router } from "express";
import { protect, adminProtect } from "../middleware/auth.js";
import { createLeave, getLeaves, updateLeaveStatus } from "../controllers/leaveController.js";

const leaveRouter = Router();


leaveRouter.post("/", protect, createLeave);
leaveRouter.get("/", protect, getLeaves);
leaveRouter.patch("/:id", protect, adminProtect, updateLeaveStatus);

export default leaveRouter;
