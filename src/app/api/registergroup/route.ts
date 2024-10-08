import { connectDb } from "@/lib/connect";
import { type NextRequest } from "next/server";
import { User } from "@/lib/Models/User";
import { Group } from "@/lib/Models/Group";

export async function POST(req: NextRequest) {
    const body = await req.json() as { users: { name: string, gender: 'male' | 'female' | 'non-binary' | 'gender-fluid' }[], name: string };
    await connectDb();
    try {
        const users = body.users.map(user => new User(user));
        await User.insertMany(users);
        const group = new Group({users: users.map(user => user._id), name: body.name});
        await group.save();
        return Response.json({message: 'Group registered successfully', group});
    } catch (e: any) {
        console.log(e);
        return Response.json({message: 'An error occurred', error: e});
    }
}