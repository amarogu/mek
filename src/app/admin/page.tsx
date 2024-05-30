import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Dashboard from "./Dashboard";

export default async function Home() {

    const session = await getServerSession(authOptions);

    if (session) return <Dashboard session={session} />
}