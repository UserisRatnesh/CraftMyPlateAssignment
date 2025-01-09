import express from "express";
import cors from "cors";
import connectDB from "./DB/index.js";
import userRouter from "./router/user.js";
import menuRouter from "./router/menu.js";
import orderRouter from "./router/order.js";

// load the environment variable
const app = express();
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routers
app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/order", orderRouter);


app.listen(3000, () => {
    console.log("Server started at port 3000...");
})
