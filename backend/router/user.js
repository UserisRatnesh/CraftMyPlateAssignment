import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../DB/schema.js"
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();
const SECRET = process.env.SECRET;


router.get("/", (req, res) => {
    return res.json({ msg: "This is home page" });

});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(403).json({ msg: 'User does not exists' });
        }

        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
        res.json({ msg: 'Logged in successfully', token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post("/signup", async (req, res) => {
    try {
        console.log("This is body = ", req.body);
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(403).json({ msg: 'User already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
        res.json({ msg: 'User created successfully', token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
