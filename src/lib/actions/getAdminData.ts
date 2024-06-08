import { HydratedDocument, MergeType, Model } from "mongoose";
import { IPurchase, IUser, IGroup, IMsg, IGift } from "../Models/Interfaces";

export interface IAdminData {
    entities: HydratedDocument<MergeType<IUser | IGroup, {msgs: IMsg[], purchases: MergeType<IPurchase, {giftGiven: IGift, msg: IMsg}>[]}>>[];
}

export async function getAdminData({User, Group}: {User: Model<IUser>, Group: Model<IGroup>}): Promise<IAdminData | null> {
    const users = await User.find().populate<{msgs: IMsg[]}>('msgs').populate<{purchases: MergeType<IPurchase, {giftGiven: IGift, msg: IMsg}>[]}>({path: 'purchases', populate: {path: 'msg giftGiven'}});
    const groups = await Group.find().populate<{msgs: IMsg[]}>('msgs').populate<{purchases: MergeType<IPurchase, {giftGiven: IGift, msg: IMsg}>[]}>({path: 'purchases', populate: {path: 'msg giftGiven'}});
    const entities = [...users, ...groups];
    if (entities) return {entities};
    return null;
}