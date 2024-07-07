import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cloneElement, ReactElement, RefObject, useEffect, useRef } from "react";

export default function Magnetic({children, container, mov = 100, scaleEffect = 1.75}: {children: ReactElement, container: RefObject<HTMLElement>, mov?: number, scaleEffect?: number}) {

    const ref = useRef<HTMLElement>(null);
    let xTo: gsap.QuickToFunc | null = null;
    let yTo: gsap.QuickToFunc | null = null;
    
    const { contextSafe } = useGSAP(() => {
        if (ref.current) {
            xTo = gsap.quickTo(ref.current, 'x', {duration: 0.3, ease: 'power2.out'});
            yTo = gsap.quickTo(ref.current, 'y', {duration: 0.3, ease: 'power2.out'});
        }
    });

    const handleMouseEnter = contextSafe(() => {
        if (!(ScrollTrigger.isScrolling()) && xTo && yTo) {
            gsap.to(ref.current, {
                duration: 0.3,
                scale: scaleEffect
            });
            xTo(0);
            yTo(0);
        }
    });

    const handleMouseLeave = contextSafe(() => {
        if (!(ScrollTrigger.isScrolling()) && xTo && yTo) {
            gsap.to(ref.current, {
                duration: 0.3,
                scale: 1
            });
            xTo(0);
            yTo(0);
        }
    })

    const magnetic = contextSafe((e: MouseEvent) => {
        if (container.current && ref.current && xTo && yTo && !(ScrollTrigger.isScrolling())) {
            const relX = e.pageX - container.current.offsetLeft;
            const relY = e.pageY - container.current.offsetTop;
            xTo((relX - container.current.clientWidth / 2) / container.current.clientWidth * mov);
            yTo((relY - container.current.clientHeight / 2) / container.current.clientHeight * mov);
        }
    });

    useEffect(() => {
        if (container.current) {
            container.current.addEventListener('mouseenter', handleMouseEnter);
            container.current.addEventListener('mouseleave', handleMouseLeave);
            container.current.addEventListener('mousemove', magnetic);
        }

        return () => {
            if (container.current) {
                container.current.removeEventListener('mouseenter', handleMouseEnter);
                container.current.removeEventListener('mouseleave', handleMouseLeave);
                container.current.removeEventListener('mousemove', magnetic);
            }
        }
    }, [])

    return (
        cloneElement(children, {ref})
    )
}