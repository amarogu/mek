import { connectDb } from "../connect";
import { User } from "../Models/User";
import { Group } from "../Models/Group";
import { IGift } from "../Models/Gift";

export async function getGiftsGiven() {
    await connectDb();
    try {
        const users = await User.find().populate<{giftsGiven: IGift[]}>('giftsGiven');
        const groups = await Group.find().populate<{giftsGiven: IGift[]}>('giftsGiven');
        const entities = [...users, ...groups];
        if (entities) return entities;
        return null;
    } catch (e: any) {
        console.log(e);
        return null;
    }
}