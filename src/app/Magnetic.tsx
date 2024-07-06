import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cloneElement, MouseEvent, ReactElement, useRef } from "react";

export default function Magnetic({children}: {children: ReactElement}) {

    const ref = useRef<HTMLElement>(null);
    const container = useRef<HTMLDivElement>(null);
    let xTo: gsap.QuickToFunc | null = null;
    let yTo: gsap.QuickToFunc | null = null;
    
    const {contextSafe} = useGSAP(() => {
        if (ref.current) {
            xTo = gsap.quickTo(ref.current, 'x', {duration: 0.3, ease: 'power2.out'});
            yTo = gsap.quickTo(ref.current, 'y', {duration: 0.3, ease: 'power2.out'});
        }
    })

    const handleMouseEnter = contextSafe(() => {
        if (container.current) {
            const h = container.current.clientHeight;
            const w = container.current.clientWidth;

            gsap.to(container.current, {
                duration: 0.3,
                height: h + 50,
                width: w + 50
            });

            gsap.to(ref.current, {
                duration: 0.3,
                scale: 1.3
            });
        }
    });

    const handleMouseLeave = contextSafe(() => {
        if (container.current) {
            const h = container.current.clientHeight;
            const w = container.current.clientWidth;

            gsap.to(container.current, {
                duration: 0.3,
                height: h - 50,
                width: w - 50
            });

            gsap.to(ref.current, {
                duration: 0.3,
                scale: 1
            });
        }
    })

    const magnetic = contextSafe((e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (container.current && ref.current && xTo && yTo) {
            const relX = e.pageX - container.current.offsetLeft;
            const relY = e.pageY - container.current.offsetTop;
            xTo((relX - container.current.clientWidth / 2) / container.current.clientWidth * 100);
            yTo((relY - container.current.clientHeight / 2) / container.current.clientHeight * 100);
        }
    });

    return (
        <div ref={container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={(e) => magnetic(e)}>
            {
                cloneElement(children, {ref})
            }
        </div>
    )
}