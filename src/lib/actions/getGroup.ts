import { connectDb } from "../connect";
import { Group } from "../Models/Group";
import { User } from "../Models/User";

export async function getGroup({params}: {params?: {_id: string}}) {
    let group: Group | null = null;
    let users: User[] = []
    let parsedUsers: string[] = []
    let parsedMsgs: string[] = []
    let parsedGroup: Group | null = null;

    await connectDb();

    try {
        if (params) group = await Group.findById(params._id);
        if (group) users = await User.find({ _id: { $in: group?.users } });
        if (users) parsedUsers = users.map(user => user._id.toString());
        if (group) parsedMsgs = group.msgs.map(msg => msg.toString());
        if (group && params) parsedGroup = {
            _id: params._id,
            name: group.name,
            gender: group.gender,
            __v: group.__v,
            users: parsedUsers,
            link: group.link,
            msgs: parsedMsgs
        };
        return parsedGroup;
    } catch (e: any) {
        return null;
    }
}