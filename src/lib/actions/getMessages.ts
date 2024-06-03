import { User } from "@/lib/Models/User";
import { connectDb } from "@/lib/connect";
import { Group } from "../Models/Group";
import { IMsg } from "../Models/Msg";

export async function getMessages() {
    await connectDb();
    try {
        const users = await User.find().populate<{msgs: IMsg[]}>('msgs');
        const groups = await Group.find().populate<{msgs: IMsg[]}>('msgs');
        if (users) return users;
        if (groups) return groups;
        return null;
    } catch (e: any) {
        return null;
    }
}