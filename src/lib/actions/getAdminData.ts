import { HydratedDocument, MergeType, Model } from "mongoose";
import { IGift, IUser, IGroup, IMsg } from "../Models/Interfaces";

export interface IAdminData {
    entities: HydratedDocument<MergeType<IUser | IGroup, {msgs: IMsg[], giftsGiven: IGift[]}>>[];
}

export async function getAdminData({User, Group}: {User: Model<IUser>, Group: Model<IGroup>}): Promise<IAdminData | null> {
    const users = await User.find().populate<{giftsGiven: IGift[], msgs: IMsg[]}>({path: 'msgs giftsGiven', options: {_recursed: true}});
    const groups = await Group.find().populate<{giftsGiven: IGift[], msgs: IMsg[]}>({path: 'msgs giftsGiven', options: {_recursed: true}});
    const entities = [...users, ...groups];
    if (entities) return {entities};
    return null;
}