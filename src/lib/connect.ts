import { connection, connect } from "mongoose";
import { Gift } from "./Models/Gift";
import { User } from "./Models/User";
import { Group } from "./Models/Group";
import { Msg } from "./Models/Msg";
import 'dotenv/config';

export const connectDb = async () => {
    try {
        if (connection.readyState !== 1) {
            await connect(process.env.DB_URI as string);
        }

        return {
            User,
            Group,
            Gift,
            Msg
        }
    } catch(err) {
        return null;
    }
}