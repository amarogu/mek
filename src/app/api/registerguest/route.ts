import { User } from "@/lib/Models/User";
import { connectDb } from "@/lib/connect";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const name = req.nextUrl.searchParams.get('name');
    const gender = req.nextUrl.searchParams.get('gender');
    const multipleGuests = req.nextUrl.searchParams.get('multipleGuests');
    try {
        await connectDb();
        const user = new User({name, gender, multipleGuests});
        await user.save();
        return Response.json({message: 'User registered successfully', user});
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e});
    }
}