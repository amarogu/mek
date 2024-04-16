import Image from "next/image";
import Logo from '../../public/meklogo.svg';
import LogoDark from '../../public/meklogo_dark.svg';
import Context from "./Context";
import { useContext, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useSpring, animated } from "@react-spring/web";
import AnimatedText from "./AnimatedText";
import { addClasses, removeClasses } from "@/lib/helpers";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const config = {
    mass: 1,
    tension: 180,
    friction: 12
}

export default function Nav({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {

    const { isDarkMode } = useContext(Context);

    const isMd = useMediaQuery({query: '(min-width: 768px)'});

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

    const nav = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (nav.current) {
                if (window.scrollY > 81) {
                    addClasses(nav.current, ['fixed', 'left-0', '-top-[104.54px]', 'bg-bg-200', 'dark:bg-dark-bg-200', 'p-8', 'z-20']);
                    removeClasses(nav.current, ['bg-transparent']);
                    gsap.to(nav.current, {y: '100%', ease: 'slow'});
                    document.body.style.paddingTop = '81px';
                } else {
                    removeClasses(nav.current, ['fixed', 'left-0', '-top-[104.54px]', 'bg-bg-200', 'dark:bg-dark-bg-200', 'p-8', 'z-20']);
                    addClasses(nav.current, ['bg-transparent']);
                    gsap.to(nav.current, {y: '0%', ease: 'slow'});
                    document.body.style.paddingTop = '0';
                }
            }
        }

        if (!isMd) {
            window.addEventListener('scroll', handleScroll)
        }

        return () => {if (!isMd) window.removeEventListener('scroll', handleScroll)};
    }, [isMd]);

    return (
        <nav ref={nav} className="grid static z-30 container grid-cols-3 mx-auto items-center justify-items-center">
            <ul className="md:flex hidden gap-12 justify-self-start font-bold">
                {firstUl.map(i => <li key={i}><AnimatedText animation="upper-staggering" on="hover" el={<button className="uppercase overflow-hidden h-[15px] text-[10px]"></button>} content={i}  /></li>)}
            </ul>
            <Image src={isDarkMode ? LogoDark : Logo} className="col-start-1 md:col-start-2" alt="Maria & Kalil, com amor," />
            <ul className="md:flex hidden gap-12 text-nowrap justify-self-end font-bold">
                {secondUl.map(i => <li key={i}><AnimatedText el={<button className="uppercase overflow-hidden h-[15px] text-[10px]">{i}</button>} animation="upper-staggering" on="hover" content={i} /></li>)}
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