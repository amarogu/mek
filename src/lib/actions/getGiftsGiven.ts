import { connectDb } from "../connect";
import { User } from "../Models/User";

export async function getGiftsGiven() {
    await connectDb();
    try {
        const users = await User.find().populate('giftsGiven');
        if (!users) return null;
        return users;
    } catch {
        return null;
    }
}