import express from "express";
import cors from 'cors'
import { connectToDb } from "./lib/mongodb.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import User from "./models/UserModel.js";
import TravelStory from "./models/TravelStoryModel.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import authenticateToken from "./utilities.js";
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


app.post('/login', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User Not Found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid Cedentials' });
    }


    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '72h' }
    );


    return res.status(200).json({
        error: false,
        message: 'Login successful',
        user: { fullName: user.fullName, email: user.email },
        accessToken
    })
});


app.get('/get-user', authenticateToken, async (req, res) => {
    const { userId } = req.user;

    const isUser = await User.findOne({ _id: userId });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: ''
    })
});


app.post('/add-travel-story',authenticateToken, async (req, res) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;
    
    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return res.status(400).json({
            error: true,
            message: 'All fields are required'
        });
    }

    const parsedVisitedDate = new Date(parseInt(visitedLocation));

    try {
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate
        });

        await travelStory.save();
        res.status(201).json({
            story: travelStory,
            message: 'Added Successfully'
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

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