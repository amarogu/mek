import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Dashboard from "./Dashboard";
import { getAdminData } from "@/lib/actions/getAdminData";

export default async function Home() {

    const session = await getServerSession(authOptions);

    if (session) {
        const data = await getAdminData();
        if (data) return <Dashboard data={data} session={session} />
    }
}