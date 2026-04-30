import {Router} from "express";

import {protect} from "../middleware/auth.js";

import {login,session,changePassword} from "../controllers/authController.js";


const authRouter=Router();

authRouter.post("/login",login);
authRouter.get("/session",protect,session);
authRouter.post("/change-password",protect,changePassword);

export default authRouter;