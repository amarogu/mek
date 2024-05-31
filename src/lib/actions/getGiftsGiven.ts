import { connectDb } from "../connect";
import { User } from "../Models/User";
import { Group } from "../Models/Group";

export async function getGiftsGiven() {
    await connectDb();
    try {
        const users = await User.find().populate('giftsGiven');
        const groups = await Group.find().populate('giftsGiven');
        if (users) return users.map(u => u.toObject());
        if (groups) return groups.map(g => g.toObject());
        return null;
    } catch (e: any) {
        console.log(e);
        return null;
    }
}