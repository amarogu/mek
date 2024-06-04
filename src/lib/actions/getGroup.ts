import { Model } from "mongoose";
import { IGroup } from "../Models/Interfaces";

export async function getGroup({params, Group}: {params?: {_id: string}, Group: Model<IGroup>}) {
    try {
        if (params) {
            const group = await Group.findById(params._id);
            if (group) {
                const parsedGroup = group.toObject<IGroup & {_id: string}>({flattenObjectIds: true});
                return parsedGroup;
            }
            return null;
        }
        return null;
    } catch (e: any) {
        return null;
    }
}