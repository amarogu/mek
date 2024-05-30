import { User } from "@/lib/Models/User";
import { connectDb } from "@/lib/connect";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const name = req.nextUrl.searchParams.get('name');
    const gender = req.nextUrl.searchParams.get('gender');
    const password = req.nextUrl.searchParams.get('password');
    const role = req.nextUrl.searchParams.get('role');
    await connectDb();
    try {
        if (!name || !gender) {
            return Response.json({message: 'Please make a complete request'})
        } else {
            if (password && role) {
                const user = new User({name, gender, password, role});
                await user.save();
                return Response.json({message: 'User registered successfully', user});
            } else {
                const user = new User({name, gender});
                await user.save();
                return Response.json({message: 'User registered successfully', user});
            }
        }
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e});
    }
}