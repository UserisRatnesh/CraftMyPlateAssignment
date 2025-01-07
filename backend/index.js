import express from "express";
import cors from "cors";

const app = express();
app.use(cors());



// Routers
app.get("/", (req, res) => {
    return res.json({ msg: "This is home route" });

});

app.listen(3000, () => {
    console.log("Server started at port 3000...");
})
