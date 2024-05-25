import { redirect } from "next/navigation";
import Content from "@/app/CheckoutComponents/Content";
import { getGift } from "@/lib/actions/getGift";
import { getGroup } from "@/lib/actions/getGroup";

export default async function Home({params}: {params?: {gift_id: string, _id: string}}) {
    const gift = await getGift({params});

    const group = await getGroup({params});

    if (!group) redirect('/');

    if (!gift) redirect(`/group/${params?._id}`);

    return <Content gift={gift} item={group} />
}