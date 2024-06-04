import { Model } from "mongoose";
import { IUser } from "../Models/Interfaces";

export async function getGuest({params, User}: {params?: {_id: string}, User: Model<IUser>}) {
    try {
        if (params) {
            const guest = await User.findById(params._id);
            if (guest) {
                const parsedGuest = guest.toObject<IUser & {_id: string}>({flattenObjectIds: true});
                return parsedGuest;
            }
            return null;
        }
        return null;
    } catch (e: any) {
        return null;
    }
}