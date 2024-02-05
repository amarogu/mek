'use client';
import { useState } from "react";
import { useSpring, animated, useChain, useSpringRef } from "@react-spring/web";
import GitHub from '../../public/github.svg';
import LinkedIn from '../../public/linkedin.svg';
import Language from '../../public/language.svg';
import Image from "next/image";

export default function Nav() {

    const [open, setOpen] = useState(false);

    const topBar = useSpring({
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        top: open ? "3px" : "0px",
        config: {
            mass: 1,
            tension: 180,
            friction: 12
        }
    })

    const bottomBar = useSpring({
        transform: open ? "rotate(-45deg)" : "rotate(0deg)",
        top: open ? "3px" : "5px",
        config: {
            mass: 1,
            tension: 180,
            friction: 12
        }
    })
 
    const toggleMenu = () => {
        setOpen(!open);
    }

 return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex flex-col relative w-4 h-[6px] cursor-pointer" onClick={toggleMenu}>
          <animated.span style={{...topBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
          <animated.span style={{...bottomBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
        </div>
        <p>Gustavo Amaro</p>
      </div>
      <div className="flex gap-2">
        <Image src={GitHub} alt="GitHub" />
        <Image src={LinkedIn} alt="LinkedIn" />
        <Image src={Language} alt="Language" />
      </div>
    </nav>
 );
}
