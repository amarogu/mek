'use client';
import { User } from "@/lib/Models/User";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Dashboard({session, data}: {session: Session, data: {giftsGiven: User, msgs: User}}) {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}