import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface Project {
    title: string;
    type: string;
    image: React.ReactElement;
    link: string;
}

interface FloatingWindowProps {
    children: React.ReactElement;
    projects: Project[];
    hoveredProjectId?: string | null;
}

export default function FloatingWindow({ children, hoveredProjectId, projects }: FloatingWindowProps) {
    const ref = useRef<any>(null);
    const parentRef = useRef<any>(null);
    const scrollable = useRef<any>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const circleRef = useRef<any>(null);
    const textRef = useRef<any>(null);
    const viewRef = useRef<any>(null);

    useEffect(() => {
        const xTo = gsap.quickTo(ref.current, 'left', {duration:  0.2});
        const yTo = gsap.quickTo(ref.current, 'top', {duration:  0.2});
        
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
            });
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

        const scrollToPreview = (projectId: string) => {
            const target = document.getElementById(projectId);
            if (target && scrollable.current) {
                gsap.to(scrollable.current, {
                    duration: 0.4,
                    y: -target.offsetTop
                });
            }
        };

        let intervalId: NodeJS.Timeout;
        if (hoveredProjectId) {
            intervalId = setInterval(() => {
                if (document.querySelector(`#${hoveredProjectId}:hover`)) {
                    scrollToPreview(`${hoveredProjectId}-preview`);
                }
            },  100); // Check every  100ms
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [hoveredProjectId, projects]);

    return (
        <div className="relative" ref={parentRef}>
            {children}
            <div ref={ref} style={{transform: 'translate(-50%, -50%) scale(0)'}} className="w-[25vw] top-0 left-0 pointer-events-none absolute h-[25vw] overflow-y-scroll">
                <div ref={scrollable} className="w-full h-full">
                    {projects.map((project, index) => (
                        <div id={`project-${index}-preview`} key={index} className="w-full h-full pointer-events-none bg-bg-200">
                            {project.image}
                        </div>
                    ))}
                </div>
                <div ref={viewRef} className="absolute top-0 w-full h-full flex items-center justify-center">
                    <div className="relative">
                        <p ref={textRef} className="relative z-30">View</p>
                        <div ref={circleRef} className="bg-bg-100 absolute left-1/2 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
