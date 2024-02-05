'use client';
import { useState } from "react";
import { useSpring, animated, useChain, useSpringRef } from "@react-spring/web";

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
    <nav>
      <div className="flex items-center gap-4">
        <div className="flex flex-col relative w-4 h-[6px] cursor-pointer" onClick={toggleMenu}>
          <animated.span style={{...topBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
          <animated.span style={{...bottomBar}} className="w-4 h-[1px] absolute inline-block bg-text-200"></animated.span>
        </div>
        <p>Gustavo Amaro</p>
      </div>
    </nav>
 );
}
