import { redirect } from "next/navigation";
import Content from "@/app/CheckoutComponents/Content";
import { getGift } from "@/lib/actions/getGift";
import { getGuest } from "@/lib/actions/getGuest";

export default async function Home({params}: {params?: {gift_id: string, _id: string}}) {
    const gift = await getGift({params});

    const guest = await getGuest({params});

    if (!guest) redirect(`/`);

    if (!gift) redirect(`/guest/${params?._id}`);

    return <Content gift={gift} item={guest} />
}