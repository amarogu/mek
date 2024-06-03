import { HydratedDocument, MergeType } from "mongoose";
import { getGiftsGiven } from "./getGiftsGiven";
import { getMessages } from "./getMessages";
import { IGift, IUser, IGroup, IMsg } from "../Models/Interfaces";
export interface IAdminData {
    giftsGiven: HydratedDocument<MergeType<IUser | IGroup, {giftsGiven: IGift[]}>>[];
    msgs: HydratedDocument<MergeType<IUser | IGroup, {msgs: IMsg[]}>>[];
}

export async function getAdminData(): Promise<IAdminData | null> {
    const giftsGiven = await getGiftsGiven();
    const msgs = await getMessages();
    if (!msgs && giftsGiven) return {giftsGiven, msgs: []};
    if (msgs && !giftsGiven) return {giftsGiven: [], msgs};
    if (msgs && giftsGiven) return {giftsGiven, msgs};
    return null;
}