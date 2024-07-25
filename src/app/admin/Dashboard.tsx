'use client';
import { Session } from "next-auth";
import { AdminData } from "@/lib/helpers";
import DashboardNav from "./DashboardNav";
import Card from "./Card";
import CardImage from '../../../public/img7_us.png';
import CircleImage from "./CircleImage";
import Link from "next/link";
import Settings from '../../../public/settings.svg';
import SettingsDark from '../../../public/settings_dark.svg';
import ThemeImage from "../ThemeImage";
import Image from "next/image";
import MeshGradientDark from '../../../public/mesh_gradient_dark.png';

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
            <picture className="absolute -z-10 top-0 left-0 w-screen h-screen">
                <Image src={MeshGradientDark} alt="" className="w-full h-full" />
            </picture>
            <div className="container mx-auto">
                <Card className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <CircleImage width='w-32' height='h-32' src={CardImage} alt='Imagem de Maria e Kalil' />
                        <ThemeImage containerClassName="pt-4" srcDark={SettingsDark} srcLight={Settings} alt="Configurações" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Maria e Kalil</h1>
                        <Link className="opacity-75" href='https://mariaekalil.com/'>https://mariaekalil.com/</Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}