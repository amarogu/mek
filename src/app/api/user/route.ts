import { connectDb } from "@/lib/connect";
import { User } from "@/lib/Models/User";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const _id = req.nextUrl.searchParams.get('_id');
    await connectDb();
    try {
        const user = await User.findById(_id);
        if (!user) {
            return Response.json({message: 'User not found'});
        }
        return Response.json({message: 'User found successfully', user});
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e});
    }
}