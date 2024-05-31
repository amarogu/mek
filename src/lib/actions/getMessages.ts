import { User } from "@/lib/Models/User";
import { connectDb } from "@/lib/connect";
import { Group } from "../Models/Group";

export async function getMessages() {
    await connectDb();
    try {
        const users = await User.find().populate('msgs');
        const groups = await Group.find().populate('msgs');
        if (users) return users.map(u => u.toObject());
        if (groups) return groups.map(g => g.toObject());
        return null;
    } catch (e: any) {
        return null;
    }
}