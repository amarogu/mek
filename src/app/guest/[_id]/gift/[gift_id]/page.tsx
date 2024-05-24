import { redirect } from "next/navigation";
import Content from "@/lib/CheckoutComponents/Content";
import { getGift } from "@/lib/actions/getGift";

export default async function Home({params}: {params?: {gift_id: string, _id: string}}) {
    const gift = await getGift({params});

    if (!gift) redirect(`/guest/${params?._id}`);

    return <Content gift={gift} />
}