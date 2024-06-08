import { redirect } from "next/navigation";
import Content from "@/app/CheckoutComponents/Content";
import { getGift } from "@/lib/actions/getGift";
import { getGroup } from "@/lib/actions/getGroup";
import { connectDb } from "@/lib/connect";

export default async function Home({params}: {params?: {gift_id: string, _id: string}}) {
    const models = await connectDb();
    if (models) {
        const { Gift, Group } = models;
        const gift = await getGift({params, Gift});

        const group = await getGroup({params, Group});

        if (!group) redirect('/');

        if (!gift) redirect(`/group/${params?._id}`);

        if (gift.soldOut) redirect(`/group/${params?._id}`);

        return <Content gift={gift} item={group} />
    } else {
        redirect('/');
    }
}