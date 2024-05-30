'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Dashboard({session}: {session: Session}) {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}