import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../DB/schema.js"
import dotenv from "dotenv";
import authenticateJwt from "../middleware/auth.js";
dotenv.config();


const router = express.Router();
const SECRET = process.env.SECRET;

router.get("/me", authenticateJwt, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(403).json({ msg: "User doesn't exist" });
        }
        console.log(user);
        res.json({ username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username, password });
        if (!existingUser) {
            return res.status(403).json({ msg: 'User does not exists' });
        }

        const token = jwt.sign({ username, password }, SECRET, { expiresIn: '1h' });
        res.json({ msg: 'Logged in successfully', token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username, password });
        if (existingUser) {
            return res.status(403).json({ msg: 'User already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ username, password }, SECRET, { expiresIn: '1h' });
        res.json({ msg: 'User created successfully', token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
