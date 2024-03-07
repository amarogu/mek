import React from "react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { eventCleanUp, eventHandler } from "../eventHandler";

interface GsapMagneticProps {
    children: React.ReactElement;
}

interface E {
    clientX: number;
    clientY: number;
}

export default function GsapMagnetic({children}: GsapMagneticProps) {

    const ref = useRef<any>(null);

    useEffect(() => {
        const xTo = gsap.quickTo(ref.current, 'x', {duration: 1, ease: 'elastic.out(1, 0.3)'});
        const YTo = gsap.quickTo(ref.current, 'y', {duration: 1, ease: 'elastic.out(1, 0.3)'});
    
        const mouseMove = (e: E) => {
            const {clientX, clientY} = e;
            const {left, top, width, height} = ref.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x);
            YTo(y);
        }
    
        const mouseLeave = (e: E) => {
            xTo(0);
            YTo(0);
        }

        eventHandler(ref, ['mousemove', 'mouseleave'], [mouseMove, mouseLeave]);
    
        return () => {
            eventCleanUp(ref, ['mousemove', 'mouseleave'], [mouseMove, mouseLeave]);
        }
    }, [])

    return (
        React.cloneElement(children, {ref})
    )
}