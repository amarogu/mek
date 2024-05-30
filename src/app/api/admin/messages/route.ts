import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            
        } else {
            return Response.json({message: 'Unauthorized'}, {status: 401});
        }
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e});
    }
}