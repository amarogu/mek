import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Dashboard from "./Dashboard";
import { getAdminData } from "@/lib/actions/getAdminData";
import { connectDb } from "@/lib/connect";
import { AdminData } from "@/lib/helpers";

export default async function Home() {

    const session = await getServerSession(authOptions);

    const models = await connectDb();

    if (session) {
        if (models) {
            const {User, Group} = models;
            const data = await getAdminData({User, Group});
            if (data) {
                const parsedData: AdminData = data.entities.map(entity => {
                    return entity.toObject({flattenObjectIds: true});
                });
                return <Dashboard session={session} data={parsedData} />
            }
            
        }
    }
}