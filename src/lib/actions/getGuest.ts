import { connectDb } from "../connect";
import { User } from "../Models/User";

export async function getGuest({params}: {params?: {_id: string}}) {
    await connectDb();

    try {
        if (params) {
            const guest = await User.findById(params._id);
            if (guest) return guest;
        }
    } catch (e: any) {
        return null;
    }
}