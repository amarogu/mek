import Content from "../../Content";
import { redirect } from "next/navigation";
import { getGifts } from "@/lib/actions/getGifts";
import { getGuest } from "@/lib/actions/getGuest";
import { connectDb } from "@/lib/connect";

export default async function Home({params}: {params?: {_id: string}}) {

    const models = await connectDb();

    if (models) {
        const { Gift, User } = models;
        const gifts = await getGifts({ Gift });
        const guest = await getGuest({params, User});

        if (!guest) redirect('/');

        if (gifts) return <Content gifts={gifts} item={guest} />;
    }

    return null;
}