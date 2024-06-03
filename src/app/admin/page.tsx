import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Dashboard from "./Dashboard";
import { getAdminData } from "@/lib/actions/getAdminData";
import { connectDb } from "@/lib/connect";
import { connection, models } from "mongoose";

export default async function Home() {

    const session = await getServerSession(authOptions);

    console.log(connection.readyState);

    const modelsLocal = await connectDb();

    console.log(connection.readyState);
    console.log(models);

    if (session) {
        if (modelsLocal) {
            const {User, Group} = modelsLocal;
            const data = await getAdminData({User, Group});
            return null;
            
        }
    }
}