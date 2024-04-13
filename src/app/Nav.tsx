import Image from "next/image";
import Logo from '../../public/meklogo.svg';
import LogoDark from '../../public/meklogo_dark.svg';
import Context from "./Context";
import { useContext, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Slider from "./Slider";

const config = {
    mass: 1,
    tension: 180,
    friction: 12
}

export default function Nav() {

    const { isDarkMode } = useContext(Context);
    const [open, setOpen] = useState<boolean>(false);

    const topBar = useSpring({
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        top: open ? "3px" : "0px",
        config: config
    })

    const bottomBar = useSpring({
        transform: open ? "rotate(-45deg)" : "rotate(0deg)",
        top: open ? "3px" : "5px",
        config: config
    })

    const firstUl = ['casal', 'festa']
    const secondUl = ['galeria', 'recados', 'presentes']

    return (
        <nav className="grid container grid-cols-3 mx-auto items-center justify-items-center">
            <ul className="md:flex hidden gap-12 justify-self-start font-bold">
                {firstUl.map(i => <li><button className="uppercase text-[10px]">{i}</button></li>)}
            </ul>
            <Image src={isDarkMode ? LogoDark : Logo} className="col-start-2 static z-10" alt="Maria & Kalil, com amor," />
            <ul className="md:flex hidden gap-12 justify-self-end font-bold">
                {secondUl.map(i => <li><button className="uppercase text-[10px]">{i}</button></li>)}
            </ul>
            <button className="cursor-pointer md:hidden flex items-center justify-center justify-self-end w-[24px] z-10 static h-[14px] " onClick={() => setOpen(!open)}>
                <div className="flex flex-col relative w-4 h-[6px]" >
                    <animated.span style={{...topBar}} className="w-4 h-[1px] absolute inline-block bg-text-200 dark:bg-dark-text-200"></animated.span>
                    <animated.span style={{...bottomBar}} className="w-4 h-[1px] absolute inline-block bg-text-200 dark:bg-dark-text-200"></animated.span>
                </div>
            </button>
            <Slider open={open} />
        </nav>
    )
}