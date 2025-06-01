import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;


export async function connectToDb() {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'travel-story-db'
        });
    } catch (error) {
        throw error;
    }
}