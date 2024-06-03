import { connectDb } from "../connect";
import { Group } from "../Models/Group";
import { User } from "../Models/User";

export async function getGroup({params}: {params?: {_id: string}}) {

    await connectDb();

    try {
        if (params) {
            const group = await Group.findById(params._id);
            if (group) return group;
        }
    } catch (e: any) {
        return null;
    }
}