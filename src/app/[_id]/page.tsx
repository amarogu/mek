import instance from "@/lib/axios";
import { type User } from "@/lib/Models/User";
import Content from "./Content";
import { redirect } from "next/navigation";

export default async function Home({params}: {params?: {_id: string}}) {
    let user: User | null = null;

    try {
        user = (await instance.get(`user?_id=${params?._id}`)).data.user as User;
        console.log(user);
    } catch (error) {
        console.error(error);
    }

    if (!user) {
        redirect('/');
    }

    return <Content user={user} />;
}