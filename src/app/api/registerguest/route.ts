import { User } from "@/lib/Models/User";
import { connectDb } from "@/lib/connect";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDb();
        const name = req.nextUrl.searchParams.get('name');
        const user = new User({name});
        await user.save();
        return Response.json({message: 'User registered successfully', user});
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e});
    }
}