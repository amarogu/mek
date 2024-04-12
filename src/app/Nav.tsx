import Image from "next/image";
import Logo from '../../public/meklogo.svg';
import LogoDark from '../../public/meklogo_dark.svg';
import Context from "./Context";
import { useContext } from "react";

export default function Nav() {

    const { isDarkMode } = useContext(Context);

    return (
        <nav className="flex justify-between container mx-auto">
            <Image src={isDarkMode ? LogoDark : Logo} alt="Maria & Kalil, com amor," />
        </nav>
    )
}