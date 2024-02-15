import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface FloatingWindowProps {
    children: React.ReactElement;
    hoveredProjectId?: string | null;
}

export default function FloatingWindow({ children, hoveredProjectId }: FloatingWindowProps) {
    const ref = useRef<any>(null);
    const parentRef = useRef<any>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const xTo = gsap.quickTo(ref.current, 'left', {duration:  1, ease: 'elastic.out(1,  0.3)'});
        const yTo = gsap.quickTo(ref.current, 'top', {duration:  1, ease: 'elastic.out(1,  0.3)'});
        
        const mediaQueryList = window.matchMedia('(pointer: coarse)');
        const listener = (event: MediaQueryListEvent) => {
            setIsTouchDevice(event.matches);
            if (!event.matches) {
                document.addEventListener('mousemove', handleMouseMove);
            } else {
                document.removeEventListener('mousemove', handleMouseMove);
            }
        }
        mediaQueryList.addEventListener('change', listener);
        setIsTouchDevice(mediaQueryList.matches);

        const handleMouseMove = (e: MouseEvent) => {
            // Only proceed if the event target is within the parentRef
            if (!parentRef.current.contains(e.target as Node)) {
                return;
            }

            const {clientX, clientY} = e;
            const {x, y} = parentRef.current.getBoundingClientRect();
            const targetX = clientX - x;
            const targetY = clientY - y;
            xTo(targetX);
            yTo(targetY);
            gsap.to(ref.current, {
                scale:  1,
                duration:  0.5,  
            })
        };

        const handleMouseLeave = () => {
            gsap.to(ref.current, {
                scale:  0,
                duration:  0.5,  
            })
        };

        if (!isTouchDevice) {
            document.addEventListener('mousemove', handleMouseMove);
            parentRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (!isTouchDevice) {
                document.removeEventListener('mousemove', handleMouseMove);
                parentRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (hoveredProjectId) {
            intervalId = setInterval(() => {
                if (document.querySelector(`#${hoveredProjectId}:hover`)) {
                    console.log(`Currently hovered project ID: ${hoveredProjectId}`);
                }
            },  100); // Check every  100ms
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [hoveredProjectId]);

    return (
        <div className="relative" ref={parentRef}>
            {children}
            <div ref={ref} style={{transform: 'translate(-50%, -50%) scale(0)'}} className="w-[25vw] top-0 left-0 pointer-events-none absolute h-[25vw] overflow-y-scroll">
                <div className="w-full h-full pointer-events-none bg-bg-300"></div>
                <div className="w-full h-full pointer-events-none bg-bg-100"></div>
            </div>
        </div>
    );
}
