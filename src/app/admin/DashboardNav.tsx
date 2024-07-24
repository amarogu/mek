import ThemeImage from "../ThemeImage";
import Logo from '../../../public/meklogo.svg';
import LogoDark from '../../../public/meklogo_dark.svg';
import Image from "next/image";
import ProfilePic from '../../../public/img2_us.png';
import Menu from '../../../public/apps.svg';
import MenuDark from '../../../public/apps_dark.svg';
import Dropdown from "../Dropdown";

export default function DashboardNav() {
    return (
        <header>
            <nav className="flex justify-between items-center">
                <ThemeImage srcDark={LogoDark} srcLight={Logo} className="w-24" alt='Maria & Kalil (Logo)' />
                <div className="flex gap-4 items-center">
                    <Dropdown labelImage={[Menu, MenuDark]} width='w-36' textSize="text-sm" options={['Convidados', 'Mensagens', 'Cadastrar']} />
                    <Image src={ProfilePic} alt='Imagem de perfil' className="w-8 h-8 object-cover rounded-full" loading="eager" />
                </div>
            </nav>
        </header>
    )
}