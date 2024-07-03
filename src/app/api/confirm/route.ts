import { NextRequest } from "next/server";
import { connectDb } from "@/lib/connect";

export async function POST(req: NextRequest) {
    const models = await connectDb();
    const body = await req.json() as { confirmed: boolean, _id: string };
    if (models) {
        try {
            const { User } = models;
            const u = await User.findById(body._id);
            if (u) {
                if (u.confirmed) {
                    u.lastRevokedConfirmation = new Date();
                } else {
                    u.lastConfirmed = new Date();
                }
                u.confirmed = body.confirmed;
                u.save();
                return Response.json({message: 'User confirmed successfully', user: u});
            } else {
                return Response.json({message: 'User not found'}, {status: 404});
            }
        } catch(e) {
            return Response.json({message: 'An error occurred', error: e});
        }
    } else {
        return Response.json({message: 'Could not load models'}, {status: 500});
    }
}