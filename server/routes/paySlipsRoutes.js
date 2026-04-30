import { Router } from "express";
import { protect, adminProtect } from "../middleware/auth.js";
import { createPaySlip, getPaySlipById, getPaySlips } from "../controllers/paySlipController.js";


const paySlipRouter = Router();


paySlipRouter.post("/", protect, adminProtect, createPaySlip);
paySlipRouter.get("/", protect, getPaySlips);
paySlipRouter.get("/:id", protect, getPaySlipById);

export default paySlipRouter;