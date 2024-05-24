import mongoose from "mongoose";
import 'dotenv/config';

export const connectDb = async () => {
    try {
        if (mongoose.connection.readyState !== 1) await mongoose.connect(process.env.DB_URI as string);
    } catch(err) {
        console.error(err);
    }
}