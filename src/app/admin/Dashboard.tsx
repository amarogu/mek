'use client';
import { IGift, IGroup, IMsg, IUser } from "@/lib/Models/Interfaces";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { MergeType } from "mongoose";

export default function Dashboard({session, data}: {session: Session, data?: MergeType<IUser | IGroup, {msgs: IMsg[], giftsGiven: IGift[], _id: string}>[]}) {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
            
        </div>
    )
}