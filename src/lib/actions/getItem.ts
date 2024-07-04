import { Model } from "mongoose";
import { IGroup, IUser } from "../Models/Interfaces";
import { LeanDocument, Populated } from "../helpers";

export async function getItem({params, User, Group}: {params?: {_id: string}, User: Model<IUser>, Group: Model<IGroup>}) {
    try {
        if (params) {
            const guest = await User.findById(params._id);
            const group = await Group.findById(params._id).populate<{users: IUser[]}>('users');;
            if (guest) {
                const parsedGuest: LeanDocument<IUser> = guest.toObject({flattenObjectIds: true});
                return parsedGuest;
            }
            if (group) {
                const parsedGroup: Populated<IGroup, {
                    users: IUser[];
                }> = group.toObject({flattenObjectIds: true});
                return parsedGroup;
            }
            return null;
        }
        return null;
    } catch {
        return null;
    }
}