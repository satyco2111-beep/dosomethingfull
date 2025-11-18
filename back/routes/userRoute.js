import { Router } from "express";
import {getAllUsers,registerUser ,verifyEmail,forgotPassword, loginUser ,logoutUser } from "../controllers/userController.js"
import {authMiddleware} from "../middleware/userAuth.js"


const userRouter = Router();

userRouter.get("/users",getAllUsers)
userRouter.post("/register",registerUser)
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authMiddleware, logoutUser);

export default userRouter;