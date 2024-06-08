import { redirect } from "next/navigation";
import Content from "@/app/CheckoutComponents/Content";
import { getGift } from "@/lib/actions/getGift";
import { getGuest } from "@/lib/actions/getGuest";
import { connectDb } from "@/lib/connect";

export default async function Home({params}: {params?: {gift_id: string, _id: string}}) {

    const models = await connectDb();

    if (models) {
        const { Gift, User } = models;

        const gift = await getGift({params, Gift});

        const guest = await getGuest({params, User});

        if (!guest) redirect(`/`);

        if (!gift) redirect(`/guest/${params?._id}`);

        if (gift.soldOut) redirect(`/group/${params?._id}`);

        return <Content gift={gift} item={guest} />
    } else {
        redirect('/');
    }
}