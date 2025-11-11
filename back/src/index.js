// import all modules -----
import express from "express";
import dotenv from "dotenv";


// import all file and variables ----- 
import RouterMain from "../routes/route.js"
import connectDB from "../config/db.js"


// make main variabls --------------
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

// make routes  --------------
app.use("/test", (req, res) => {
    res.json({ sms: "This app is runnunig" })
})
app.use('/api', RouterMain);



console.log('PORT', PORT)
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})