import express from "express"
const RouterMain = express.Router();

import userRouter from "./userRoute.js"
import cityRouter from "./cityRoute.js"
import localAriaRouter from "./loaclCityRoute.js"
import servicesRouter from "./servicesRoute.js"





RouterMain.use("/user", userRouter);
RouterMain.use("/city", cityRouter);
RouterMain.use("/local-aria", localAriaRouter);
RouterMain.use("/services", servicesRouter);


export default RouterMain;