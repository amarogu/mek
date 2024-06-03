import { HydratedDocument, MergeType } from "mongoose";
import { getGiftsGiven } from "./getGiftsGiven";
import { getMessages } from "./getMessages";
import { IUser } from "../Models/User";
import { IGroup } from "../Models/Group";
import { IGift } from "../Models/Gift";
import { IMsg } from "../Models/Msg";

export interface IAdminData {
    giftsGiven: HydratedDocument<MergeType<IUser | IGroup, {giftsGiven: IGift[]}>>[];
    msgs: HydratedDocument<MergeType<IUser | IGroup, {msgs: IMsg[]}>>[];
}

export async function getAdminData() {
    const giftsGiven = await getGiftsGiven();
    const msgs = await getMessages();
    if (!msgs || !giftsGiven) return null;
    return {msgs, giftsGiven};
}