import { connectDb } from "../connect";
import { IUser, User } from "../Models/User";
import { Group, IGroup } from "../Models/Group";
import { IGift } from "../Models/Gift";

export async function getGiftsGiven() {
    await connectDb();
    try {
        const users = await User.find().populate<{giftsGiven: IGift[]}>('giftsGiven');
        const groups = await Group.find().populate<{giftsGiven: IGift[]}>('giftsGiven');
        if (users) return users;
        if (groups) return groups;
        return null;
    } catch (e: any) {
        console.log(e);
        return null;
    }
}