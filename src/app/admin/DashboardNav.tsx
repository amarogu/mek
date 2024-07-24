import ThemeImage from "../ThemeImage";
import Logo from '../../../public/meklogo.svg';
import LogoDark from '../../../public/meklogo_dark.svg';
import Image from "next/image";
import ProfilePic from '../../../public/img2_us.png';
import Menu from '../../../public/apps.svg';
import MenuDark from '../../../public/apps_dark.svg';
import Dropdown from "../Dropdown";
import Add from '../../../public/add_circle.svg';
import AddDark from '../../../public/add_circle_dark.svg';
import Chat from '../../../public/chat.svg';
import ChatDark from '../../../public/chat_dark.svg';
import GuestList from '../../../public/guest_list.svg';
import GuestListDark from '../../../public/guest_list_dark.svg';
import Cancel from '../../../public/cancel_default.svg';
import CancelDark from '../../../public/cancel_default_dark.svg';
import { signOut } from "next-auth/react";

export default function DashboardNav() {
    return (
        <header>
            <nav className="flex justify-between items-center">
                <ThemeImage srcDark={LogoDark} srcLight={Logo} className="w-24" alt='Maria & Kalil (Logo)' />
                <div className="flex gap-4 items-center">
                    <Dropdown labelImage={[Menu, MenuDark]} width='w-40' textSize="text-sm" options={['Convidados', 'Mensagens', 'Cadastrar']} optionsLabels={[[GuestList, GuestListDark], [Chat, ChatDark], [Add, AddDark]]} />
                    <Dropdown action={() => signOut()} labelCircle labelImage={[ProfilePic, ProfilePic]} width='w-32' textSize="text-sm" options={['Sair']} optionsLabels={[[Cancel, CancelDark]]} />
                </div>
            </nav>
        </header>
    )
}