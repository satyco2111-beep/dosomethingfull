import { Router } from "express";
import {getAllUsers,registerUser ,verifyEmail,forgotPassword} from "../controllers/userController.js"


const userRouter = Router();

userRouter.get("/users",getAllUsers)
userRouter.post("/register",registerUser)
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/forgot-password", forgotPassword);

export default userRouter;