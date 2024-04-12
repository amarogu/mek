import Image from "next/image";
import Logo from '../../public/meklogo.svg';
import LogoDark from '../../public/meklogo_dark.svg';
import Context from "./Context";
import { useContext } from "react";

export default function Nav() {

    const { isDarkMode } = useContext(Context);

    return (
        <nav className="grid container grid-cols-3 mx-auto">
            <Image src={isDarkMode ? LogoDark : Logo} className="justify-self-center col-start-2" alt="Maria & Kalil, com amor," />
        </nav>
    )
}