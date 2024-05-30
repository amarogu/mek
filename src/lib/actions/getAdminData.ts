import { getGiftsGiven } from "./getGiftsGiven";
import { getMessages } from "./getMessages";

export async function getAdminData() {
    const giftsGiven = await getGiftsGiven();
    const msgs = await getMessages();
    if (!giftsGiven || !msgs) return null;
    return {giftsGiven, msgs};
}