import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface FloatingWindowProps {
    children: React.ReactElement;
}

interface E {
    clientX: number;
    clientY: number;
}

export default function FloatingWindow({children}: FloatingWindowProps) {
    const ref = useRef<any>(null);
    const parentRef = useRef<any>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const xTo = gsap.quickTo(ref.current, 'left', {duration: 1, ease: 'elastic.out(1, 0.3)'});
        const yTo = gsap.quickTo(ref.current, 'top', {duration: 1, ease: 'elastic.out(1, 0.3)'});
        const mediaQueryList = window.matchMedia('(pointer: coarse)');
        const listener = (event: MediaQueryListEvent) => {
            setIsTouchDevice(event.matches);
            if (!event.matches) {
                parentRef.current.addEventListener('mousemove', handleMouseMove);
            } else {
                parentRef.current.removeEventListener('mousemove', handleMouseMove);
            }
        }
        mediaQueryList.addEventListener('change', listener);
        setIsTouchDevice(mediaQueryList.matches);
        const handleMouseMove = (e: E) => {
            const {clientX, clientY} = e;
            const {x, y} = parentRef.current.getBoundingClientRect();
            const targetX = clientX - x;
            const targetY = clientY - y;
            const parentHeight = parentRef.current.clientHeight;
            const parentWidth = parentRef.current.clientWidth;
            if (targetX < 0 || targetY < 0 || targetX > parentWidth || targetY > parentHeight) {
                gsap.to(ref.current, {
                    scale: 0,
                    duration: 0.5, 
                });
                return;
            };
            xTo(targetX);
            yTo(targetY);
            gsap.to(ref.current, {
                scale: 1,
                duration: 0.5, 
            })
        };

        if (!isTouchDevice) {
            parentRef.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (!isTouchDevice) {
                parentRef.current.removeEventListener('mousemove', handleMouseMove);
            }
        };

    }, []);

    return (
        <div className="relative" ref={parentRef}>
            {children}
            <div ref={ref} style={{transform: 'translate(-50%, -50%) scale(0)'}} className="w-[25vw] top-0 left-0 absolute h-[25vw] overflow-y-scroll">
                <div className="w-full h-full bg-bg-300"></div>
                <div className="w-full h-full bg-bg-100"></div>
            </div>
        </div>
    );
}