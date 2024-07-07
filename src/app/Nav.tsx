import Image from "next/image";
import Logo from '../../public/meklogo.svg';
import LogoDark from '../../public/meklogo_dark.svg';
import Context from "./Context";
import { useContext, Dispatch, useState, SetStateAction, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import AnimatedText from "./AnimatedText";
import { useLenis } from "@studio-freight/react-lenis";
import Link from "next/link";
import ThemeImage from "./ThemeImage";

const config = {
    mass: 1,
    tension: 180,
    friction: 12
}

export default function Nav({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {

    const lenis = useLenis(() => {});

    const { isDarkMode, item } = useContext(Context);

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

    const firstUl = ['galeria', 'recados']
    const secondUl = ['presentes', 'confirmar', 'festa']

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const header = document.getElementById('header');
        if (header) {
            setOffset(-header.clientHeight);
        }
    }, []);

    return (
        <nav id="nav" className="grid container grid-cols-3 mx-auto static z-30 items-center md:justify-items-center">
            <ul className="md:flex hidden gap-12 justify-self-start font-bold">
                {
                    firstUl.map((t, i) => 
                        <li key={i}>
                            <AnimatedText disabled={item ? false : i === 1 ? true : false} className={item ? '' : i === 1 ? 'opacity-50' : ''} content={t} offset={offset} />
                        </li>
                    )
                }
            </ul>
            <ThemeImage srcDark={LogoDark} onClick={() => lenis?.scrollTo(0, {duration: 2.5})} srcLight={Logo} containerClassName="col-start-1 md:col-start-2 cursor-pointer" alt="Maria & Kalil, com amor." />
            <ul className="md:flex hidden gap-12 text-nowrap justify-self-end font-bold">
                {
                    secondUl.map((t, i) => 
                        <li key={i}>
                            {
                                i === 0 ? 
                                (
                                    <Link href='https://sites.icasei.com.br/kalilemaria' target="_blank">
                                        <AnimatedText disabled={item ? false : true} className={item ? '' : 'opacity-50'} content={t} offset={offset} />
                                    </Link>
                                ) : (
                                    <AnimatedText disabled={item ? false : true} className={item ? '' : 'opacity-50'} content={t} offset={offset} />
                                )
                            }
                        </li>
                    )
                }
            </ul>
            <button className="cursor-pointer col-start-3 md:hidden flex items-center justify-end justify-self-end w-[24px] h-[14px] " onClick={() => setOpen(!open)}>
                <div className="flex flex-col relative w-4 h-[6px]" >
                    <animated.span style={{...topBar}} className="w-4 h-[1px] absolute inline-block bg-text-200 dark:bg-dark-text-200"></animated.span>
                    <animated.span style={{...bottomBar}} className="w-4 h-[1px] absolute inline-block bg-text-200 dark:bg-dark-text-200"></animated.span>
                </div>
            </button>
        </nav>
    )
}