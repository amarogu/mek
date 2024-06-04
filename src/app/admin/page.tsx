import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Dashboard from "./Dashboard";
import { getAdminData } from "@/lib/actions/getAdminData";
import { connectDb } from "@/lib/connect";
import { IGift, IGroup, IMsg, IUser } from "@/lib/Models/Interfaces";
import { MergeType } from "mongoose";

export default async function Home() {

    const session = await getServerSession(authOptions);

    const models = await connectDb();

    if (session) {
        if (models) {
            const {User, Group} = models;
            const data = await getAdminData({User, Group});
            if (data) {
                const parsedData: MergeType<IUser | IGroup, {msgs: IMsg[], giftsGiven: IGift[], _id: string}>[] = data.entities.map(entity => {
                    return entity.toObject({flattenObjectIds: true});
                });
                return <Dashboard session={session} data={parsedData} />
            }
            
        }
    }
}