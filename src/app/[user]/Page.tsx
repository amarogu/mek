'use client';
import instance from "@/lib/axios";
import { type User } from "@/lib/Models/User";
import Content from "./Content";
import { redirect } from "next/navigation";

export default async function Home({params}: {params?: {user: string}}) {
    let user: User | null = null;

    console.log('hey')

    try {
        user = (await instance.get(`user?_id=${params?.user}`)).data.user as User;
        console.log(user);
    } catch (error) {
        console.error(error);
    }

    if (!user) {
        redirect('/');
    }

    return <Content user={user} />;
}