import { Router } from "express";
import {getAllUsers,registerUser} from "../controllers/userController.js"


const userRouter = Router();

userRouter.get("/users",getAllUsers)
userRouter.post("/register",registerUser)


export default userRouter;