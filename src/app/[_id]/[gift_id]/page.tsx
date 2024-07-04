import CheckoutContent from "@/app/CheckoutComponents/CheckoutContent";
import { getGift } from "@/lib/actions/getGift";
import { getItem } from "@/lib/actions/getItem";
import { connectDb } from "@/lib/connect";
import { redirect } from "next/navigation";

export default async function Home({params}: {params?: {_id: string, gift_id: string}}) {
    const models = await connectDb();

    if (models) {
        const {Gift, User, Group} = models;

        const item = await getItem({params, User, Group});
        const gift = await getGift({params, Gift});

        if (!item) redirect('/');

        if (!gift) redirect(`/${params?._id}`);

        if (gift.soldOut) redirect(`/${params?._id}`);

        return <CheckoutContent gift={gift} item={item} />;
    }

    return null;
}