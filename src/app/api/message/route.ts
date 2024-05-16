import { Msg } from "@/lib/Models/Msg";
import { connectDb } from "@/lib/connect";
import { NextRequest } from "next/server";
import { User } from "@/lib/Models/User";
import { Group } from "@/lib/Models/Group";

export async function POST(req: NextRequest) {
    await connectDb();
    const body = await req.json() as { owner: string, content: string };

    try {
        const user = await User.findById(body.owner);
        const group = await Group.findById(body.owner);
        if (user) {
            const msg = new Msg({owner: user._id, content: body.content});
            user.msgs.push(msg._id);
            await msg.save();
            await user.save();
            return Response.json({message: 'Message sent successfully', msg});
        }
        if (group) {
            const msg = new Msg({owner: group._id, content: body.content});
            group.msgs.push(msg._id);
            await msg.save();
            await group.save();
            return Response.json({message: 'Message sent successfully', msg});
        }
        
        return Response.json({message: 'Instance not found'});
        
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e});
    }
}