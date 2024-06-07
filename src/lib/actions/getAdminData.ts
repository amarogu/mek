import { FlattenMaps, HydratedDocument, MergeType, Model } from "mongoose";
import { IPurchase, IUser, IGroup, IMsg } from "../Models/Interfaces";

export interface IAdminData {
    entities: HydratedDocument<MergeType<IUser | IGroup, {msgs: IMsg[], purchases: IPurchase[]}>>[];
}

export async function getAdminData({User, Group}: {User: Model<IUser>, Group: Model<IGroup>}): Promise<IAdminData | null> {
    const users = await User.find().populate<{purchases: IPurchase[], msgs: IMsg[]}>({path: 'msgs purchases'});
    const groups = await Group.find().populate<{purchases: IPurchase[], msgs: IMsg[]}>({path: 'msgs purchases'});
    const entities = [...users, ...groups];
    if (entities) return {entities};
    return null;
}