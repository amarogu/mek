import { User } from "@/lib/Models/User";
import { connectDb } from "@/lib/connect";

export async function getMessages() {
    await connectDb();
    try {
        const users = await User.find().populate('msgs');
        if (!users) return null;
        return users;
    } catch (e: any) {
        return null;
    }
}