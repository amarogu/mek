'use server';
import { connectDb } from "@/lib/connect";
import Content from "../../Content";
import { redirect } from "next/navigation";
import { Group } from "@/lib/Models/Group";
import { User } from "@/lib/Models/User";

export default async function Home({params}: {params?: {_id: string}}) {
    let group: Group | null = null;
    let users: User[] = []
    let parsedUsers: string[] = []
    let parsedGroup: Group | null = null;

    await connectDb();

    try {
        if (params) group = await Group.findById(params._id);
        if (group) users = await User.find({ _id: { $in: group?.users } });
        if (users) parsedUsers = users.map(user => user._id.toString());
        if (group && params) parsedGroup = {
            _id: params._id,
            name: group.name,
            gender: group.gender,
            __v: group.__v,
            users: parsedUsers,
            link: group.link
        };
    } catch (e: any) {
        redirect('/');
    }

    if (!group || !parsedGroup) redirect('/');

    return <Content item={parsedGroup} />;
}