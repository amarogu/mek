import { useState, useEffect } from "react";
import { useSpring, animated, useChain, useSpringRef } from "@react-spring/web";
import Msg from '../../public/msg.svg';
import Confirm from '../../public/check_circle_mek.svg';
import Gift from '../../public/gift_mek.svg';
import Image from "next/image";
import GsapMagnetic from "./GsapMagnetic";
import { useLenis } from '@studio-freight/react-lenis';
import { gsap } from "gsap";

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

    const lenis = useLenis(({scroll}) => {});

    const buttonNames = ['Home', 'About', 'Projects', 'Contact'];

    const [open, setOpen] = useState(false);
    const [isLangOpen, setLang] = useState<boolean>(false);
    const [isDisclaimerOpen, setDisclaimer] = useState<boolean>(false);

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

    const handleMouseEnter = (name: string) => {
        gsap.to(`#button-${name.toLowerCase().replace(/\s/g, "-")}`, {scale: 1, duration: 0.5});
    }

    const handleMouseLeave = (name: string) => {
        gsap.to(`#button-${name.toLowerCase().replace(/\s/g, "-")}`, {scale: 0, duration: 0.5});
    }

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
    <animated.nav id="nav" style={nav} className={`flex items-start flex-wrap py-7 px-8 ${isScrolled ? "fixed top-[-84px] left-0 w-full" : "relative"}`}>
      <div className={`flex items-center justify-between w-full mx-auto ${isScrolled ? "container sm:px-8" : "max-w-[614px]"}`}>
        <div className="flex items-center gap-4">
            <button className="cursor-pointer" onClick={toggleMenu}>
                <div className="flex flex-col relative w-4 h-[6px]" >
                <animated.span style={{...topBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
                <animated.span style={{...bottomBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
                </div>
            </button> 
            <button className="cursor-pointer" onClick={() => {lenis?.scrollTo(0, {duration: 2})}}>
                <p className="text-xl">Maria&Kalil</p>
            </button>
        </div>
        <div className="flex items-center gap-2">
            <GsapMagnetic>
                <a>
                    <Image src={Msg} alt="Msg" className="h-5 mt-[2px]" width={20} />
                </a>
            </GsapMagnetic>
            <GsapMagnetic>
                <a>
                    <Image src={Confirm} className="h-5 mt-[2px]" alt="Confirm" width={20} />
                </a>
            </GsapMagnetic>
            <GsapMagnetic>
                <a>
                    <Image src={Gift} className="h-5" alt="Gift" width={20} />
                </a>
            </GsapMagnetic>
        </div>
      </div>
      <animated.div style={{...sideBar, ...sideBarCircle}} className={`bg-bg-200 w-full -z-10 absolute top-0 sm:px-8 left-0 h-screen`}>
        <ul className={`text-3xl px-8 pt-[80px] flex flex-col gap-4 ${isScrolled ? "container mx-auto" : "max-w-[614px] sm:px-0 sm:mx-auto"}`}>  
            {buttonNames.map((name, i) => (
                <li onClick={toggleMenu} key={name}>
                    <GsapMagnetic>
                        <button onClick={() => {
                            if (i === 0) {
                                setTimeout(() => {
                                    lenis?.scrollTo(0, {duration: 2});
                                }, 300);
                            } else {
                                setTimeout(() => {
                                    lenis?.scrollTo(`#${name.toLowerCase().replace(/\s/g, "-")}`, {duration: 2, offset: -104});
                                }, 300);
                            }
                        }} onMouseEnter={() => handleMouseEnter(name)} onMouseLeave={() => handleMouseLeave(name)} className="inline-flex items-center gap-4">
                            <a className="capitalize">{name}</a>
                            <div id={`button-${name.toLowerCase().replace(/\s/g, "-")}`} style={{transform: 'scale(0)'}} className="w-2 h-2 rounded-full bg-text-200"></div>
                        </button>
                    </GsapMagnetic>
                </li>
            ))}
        </ul>
      </animated.div>
    </animated.nav>
 );
}
