import { Router } from "express";
import {getAllProvider,registerProvider} from "../controllers/providerController.js"


const providerRouter = Router();

providerRouter.get("/",getAllProvider)
providerRouter.post("/register",registerProvider)


export default providerRouter;