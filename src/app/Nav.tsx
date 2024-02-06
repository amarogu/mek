'use client';
import { useState, useEffect } from "react";
import { useSpring, animated, useChain, useSpringRef } from "@react-spring/web";
import GitHub from '../../public/github.svg';
import LinkedIn from '../../public/linkedin.svg';
import Language from '../../public/language.svg';
import Image from "next/image";
import ArrowBack from '../../public/arrow_back.svg';

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
        to: { transform: isScrolled ? "translateY(100%)" : "translateY(0%)", backgroundColor: isScrolled ? "#EBEBD2" : "#F5F5DC"}
    });
 
    const toggleMenu = () => {
        setOpen(!open);
    }

 return (
    <animated.nav style={nav} className={`flex items-start flex-wrap py-7 px-8 ${isScrolled ? "fixed top-0 left-0 w-full" : "relative"}`}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
            <div className="flex flex-col relative w-4 h-[6px] cursor-pointer" onClick={toggleMenu}>
            <animated.span style={{...topBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
            <animated.span style={{...bottomBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
            </div>
            <p className="text-xl">Gustavo Amaro</p>
        </div>
        <div className="flex gap-2">
            <Image src={GitHub} alt="GitHub" width={20} height={20} />
            <Image src={LinkedIn} alt="LinkedIn" width={20} height={20} />
            <Image src={Language} alt="Language" width={20} height={20} />
        </div>
      </div>
      <animated.div style={{...sideBar, ...sideBarCircle}} className={`bg-bg-200 w-full -z-10 absolute top-0 left-0 h-screen`}>
        <ul className="text-3xl px-8 pt-[80px] flex flex-col gap-4">
            <li onClick={toggleMenu}>Home</li>
            <li onClick={toggleMenu}>About</li>
            <li onClick={toggleMenu}>Projects</li>
            <li onClick={toggleMenu}>Contact</li>
        </ul>
      </animated.div>
    </animated.nav>
 );
}
