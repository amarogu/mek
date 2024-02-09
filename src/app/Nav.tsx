'use client';
import { useState, useEffect } from "react";
import { useSpring, animated, useChain, useSpringRef } from "@react-spring/web";
import GitHub from '../../public/github.svg';
import LinkedIn from '../../public/linkedin.svg';
import Language from '../../public/language.svg';
import Image from "next/image";
import ArrowBack from '../../public/arrow_back.svg';
import GsapMagnetic from "./GsapMagnetic";
import Collapsible from "./Collapsible";
import Languages from '../../public/languages.svg';

interface Config {
    mass: number;
    tension: number;
    friction: number;
}

const config: Config = {
    mass: 1,
    tension: 180,
    friction: 12
}

export default function Nav() {

    const [open, setOpen] = useState(false);
    const [isLangOpen, setLang] = useState<boolean>(false);

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

    const sideBarRef = useSpringRef();
    const sideBarCircleRef = useSpringRef();

    const sideBar = useSpring({
        ref: sideBarRef,
        transform: open ? "translateX(0%)" : "translateX(-100%)",
    });

    const sideBarCircle = useSpring({
        ref: sideBarCircleRef,
        clipPath: open ? "ellipse(100% 100% at 45% 50%)" : "ellipse(50% 100% at 45% 50%)",
    })

    useChain([sideBarRef, sideBarCircleRef], [0, 0.2]);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 84);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const nav = useSpring({
        from: { transform: "translateY(0%)", backgroundColor: "#F5F5DC" },
        to: { transform: isScrolled ? "translateY(100%)" : "translateY(0%)", backgroundColor: isScrolled ? "#EBEBD2" : "#F5F5DC"},
        config: config
    });
 
    const toggleMenu = () => {
        setOpen(!open);
    }

    const toggleLang = () => {
        setLang(!isLangOpen);
    }

 return (
    <animated.nav style={nav} className={`flex items-start flex-wrap py-7 px-8 ${isScrolled ? "fixed top-[-84px] left-0 w-full" : "relative"}`}>
      <div className={`flex items-center justify-between w-full mx-auto ${isScrolled ? "container sm:px-8" : "max-w-[614px]"}`}>
        <div className="flex items-center gap-4">
            <button className="cursor-pointer" onClick={toggleMenu}>
                <div className="flex flex-col relative w-4 h-[6px]" >
                <animated.span style={{...topBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
                <animated.span style={{...bottomBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
                </div>
            </button> 
            <button className="cursor-pointer">
                <p className="text-xl">&#169; Coded by Amaro </p>
            </button>
        </div>
        <div className="flex gap-2">
            <GsapMagnetic>
                <a href="https://github.com/amarogu" target="_blank">
                    <Image src={GitHub} alt="GitHub" width={20} height={20} />
                </a>
            </GsapMagnetic>
            <GsapMagnetic>
                <a href="https://www.linkedin.com/in/amarogu" target="_blank">
                    <Image src={LinkedIn} alt="LinkedIn" width={20} height={20} />
                </a>
            </GsapMagnetic>
            <GsapMagnetic>
                <button onClick={toggleLang}>
                    <Image src={Language} alt="Language" width={20} height={20} />
                </button>
            </GsapMagnetic>
        </div>
      </div>
      <animated.div style={{...sideBar, ...sideBarCircle}} className={`bg-bg-200 w-full -z-10 absolute top-0 left-0 h-screen`}>
        <ul className={`text-3xl px-8 pt-[80px] flex flex-col gap-4 ${isScrolled ? "container" : "max-w-[614px] sm:px-0 sm:mx-auto"}`}>
            <li onClick={toggleMenu}>Home</li>
            <li onClick={toggleMenu}>About</li>
            <li onClick={toggleMenu}>Projects</li>
            <li onClick={toggleMenu}>Contact</li>
        </ul>
      </animated.div>
      <Collapsible icon={<Image src={Languages} alt="Languages" width={48} height={48} className="translate-y-1" />} title="Languages" open={isLangOpen}>
        <>
            <li>English</li>
            <li>Portuguese</li>
            <li>French</li>
            <li>Mandarin</li>
            <li>Italian</li>
            <li>German</li>
            <li>Japanese</li>
            <li>Spanish</li>
            <li>Korean</li>
        </>
      </Collapsible>
    </animated.nav>
 );
}
