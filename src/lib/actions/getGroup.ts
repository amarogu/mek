import { MergeType, Model } from "mongoose";
import { IGroup, IUser } from "../Models/Interfaces";
import { LeanDocument } from "../helpers";

export async function getGroup({params, Group}: {params?: {_id: string}, Group: Model<IGroup>}) {
    try {
        if (params) {
            const group = await Group.findById(params._id).populate<{users: IUser[]}>('users');
            if (group) {
                const parsedGroup: MergeType<LeanDocument<IGroup>, {users: LeanDocument<IUser>[]}> = group.toObject({flattenObjectIds: true});
                return parsedGroup;
            }
            return null;
        }
        return null;
    } catch (e: any) {
        return null;
    }
}