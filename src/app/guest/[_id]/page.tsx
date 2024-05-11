'use server';
import { connectDb } from "@/lib/connect";
import { User } from "@/lib/Models/User";
import Content from "../../Content";
import { redirect } from "next/navigation";

export default async function Home({params}: {params?: {_id: string}}) {
    let user: User | null = null;
    let parsedUser: User | null = null;

    await connectDb();

    try {
        if (params) user = await User.findById(params._id);
        if (user && params) parsedUser = {
            _id: params._id,
            name: user.name,
            msgs: user.msgs,
            gender: user.gender,
            __v: user.__v
        };
    } catch (e: any) {
        redirect('/');
    }

    if (!user || !parsedUser) redirect('/');

    return <Content item={parsedUser} />;
}