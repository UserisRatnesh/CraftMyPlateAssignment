import express from "express";
import cors from "cors";
import connectDB from "./DB/index.js";
import dotenv from "dotenv";

dotenv.config();

// load the environment variable
const app = express();
app.use(cors());



// Routers
app.get("/", (req, res) => {
    return res.json({ msg: "This is home route" });

});

connectDB();

app.listen(3000, () => {
    console.log("Server started at port 3000...");
})
