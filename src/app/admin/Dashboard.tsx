'use client';
import { Session } from "next-auth";
import { AdminData } from "@/lib/helpers";
import DashboardNav from "./DashboardNav";
import Card from "./Card";
import Image from "next/image";
import CardImage from '../../../public/img7_us.png';
import CircleImage from "./CircleImage";

export default function Dashboard({session, data}: {session: Session, data: AdminData}) {
    const groups = data.filter(e => 'users' in e);
    const individuals = data.filter(e => !('users' in e));
    const groupedIndividuals: string[] = [];

    groups.forEach(g => {
        g.users.forEach(u => {
            groupedIndividuals.push(u._id);
        });
    });

    const parsedData = [...groups, ...individuals.filter(i => (!groupedIndividuals.includes(i._id) && i.name !== 'admin'))];

    return (
        <div className="flex h-full flex-col overflow-y-hidden gap-8">
            <DashboardNav />
            <Card>
                <CircleImage width='w-32' height='h-32' src={CardImage} alt='Imagem de Maria e Kalil' />
            </Card>
        </div>
    )
}