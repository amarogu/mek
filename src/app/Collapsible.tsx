import { useSpring, animated, useSpringRef, useChain } from "@react-spring/web";
import React from "react";
import { useEffect, useState } from "react";

interface CollapsibleProps {
    children: React.ReactElement;
    open: boolean;
    title: string;
    icon?: React.ReactElement;
}

export default function Collapsible({children, open, title, icon}: CollapsibleProps) {
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

    return (
        <animated.div style={{...sideBar, ...sideBarCircle}} className={`bg-bg-200 w-full -z-10 absolute top-0 left-0 h-screen`}>
            <ul className={`text-3xl px-8 pt-[80px] flex flex-col gap-4 ${isScrolled ? "container" : "max-w-[614px] sm:px-0 sm:mx-auto"}`}>
                <li className="text-5xl flex gap-4 font-semibold">
                    <span>
                        {title}
                    </span> 
                    <span>
                        {icon}
                    </span>
                </li>
                {children}
            </ul>
        </animated.div>
    )
}