import { connectDb } from "../connect";
import { User } from "../Models/User";

export async function getGuest({params}: {params?: {_id: string}}) {
    await connectDb();

    let user: User | null = null;
    let parsedUser: User | null = null;

    try {
        if (params) user = await User.findById(params._id);
        if (user && params) parsedUser = {
            _id: params._id,
            name: user.name,
            msgs: user.msgs,
            gender: user.gender,
            __v: user.__v,
            giftsGiven: user.giftsGiven.map(gift => gift.toString())
        };
        return parsedUser;
    } catch (e: any) {
        return null;
    }
}