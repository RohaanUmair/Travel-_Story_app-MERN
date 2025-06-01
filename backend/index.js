import express from "express";
import cors from 'cors'
import { connectToDb } from "./lib/mongodb.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import User from "./models/UserModel.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors({origin: '*'}));


app.post('/create-account', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            error: true, message: 'All Fields are required'
        });
    }


    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({
            error: true, message: 'User Already exists'
        });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashedPassword
    });

    await user.save();

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '72h' }
    );


    return res.status(201).json({
        error: false,
        user: { fullName: user.fullName, email: user.email },
        accessToken,
        message: 'Registration Successful'
    })
});



async function connect() {
    try {
        await connectToDb();

        app.listen(5000, () => {
            console.log('Server running on PORT: 5000')
        });
    } catch (error) {
        console.error(error);
    }
}

connect();