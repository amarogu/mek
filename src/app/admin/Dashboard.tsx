'use client';
import { Session } from "next-auth";
import { AdminData, truncateMessage } from "@/lib/helpers";
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
import Header from "./Header";
import MessagesSquare from '../../../public/messages_square.svg';
import MessagesSquareDark from '../../../public/messages_square_dark.svg';
import Label from "./Label";
import Clock from '../../../public/clock.svg';
import ClockDark from '../../../public/clock_dark.svg';
import List from "./List";

export default function Dashboard({ session, data }: { session: Session, data: AdminData }) {
    const groups = data.filter(e => 'users' in e);
    const individuals = data.filter(e => !('users' in e));
    const groupedIndividuals: string[] = [];

    groups.forEach(g => {
        g.users.forEach(u => {
            groupedIndividuals.push(u._id);
        });
    });

    const parsedData = [...groups, ...individuals.filter(i => (!groupedIndividuals.includes(i._id) && i.name !== 'admin'))];

    const entitiesWithMessages = data.filter(e => e.msgs.length !== 0 && e.name !== 'admin');

    return (
        <div className="flex h-full flex-col overflow-y-hidden gap-8">
            <DashboardNav />
            <div className="container grid grid-cols-1 gap-6 mx-auto">
                <Card background padding className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <CircleImage width='w-32' height='h-32' src={CardImage} alt='Imagem de Maria e Kalil' />
                        <ThemeImage containerClassName="pt-4 w-4 h-4" srcDark={SettingsDark} srcLight={Settings} alt="Configurações" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Maria e Kalil</h1>
                        <Link className="opacity-75" href='https://mariaekalil.com/'>https://mariaekalil.com/</Link>
                    </div>
                </Card>
                <Card background>
                    <Header image={[MessagesSquare, MessagesSquareDark]} title="Mensagens" alt="Mensagens">
                        <Label text="Recentes" image={[Clock, ClockDark]} imageAlt="Recentes" />
                    </Header>
                    <List>
                        {
                            entitiesWithMessages
                                .sort((a, b) => new Date(b.msgs[0].createdAt).getTime() - new Date(a.msgs[0].createdAt).getTime())
                                .slice(0, 3)
                                .map((e, i) => {
                                    return (
                                        <div key={i} className="flex items-center gap-2 justify-between">
                                            <h3 className="text-base font-bold">{e.name}</h3>
                                            <p>{truncateMessage(e.msgs[0].content)}</p>
                                        </div>
                                    );
                                })
                        }
                    </List>
                </Card>
            </div>
        </div>
    )
}