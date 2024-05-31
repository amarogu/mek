import { getGiftsGiven } from "./getGiftsGiven";
import { getMessages } from "./getMessages";

export async function getAdminData() {
    const giftsGiven = await getGiftsGiven();
    const msgs = await getMessages();
    if (!msgs || !giftsGiven) return null;
    return {msgs, giftsGiven};
}