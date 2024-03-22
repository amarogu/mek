import React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface GsapMagneticProps {
    children: React.ReactElement;
}

interface E {
    clientX: number;
    clientY: number;
}

export default function GsapMagnetic({children}: GsapMagneticProps) {

    const ref = useRef<any>(null);
    let xTo: gsap.QuickToFunc | null = null;
    let YTo: gsap.QuickToFunc | null = null;

    useEffect(() => {
        if (ref.current) {
            xTo = gsap.quickTo(ref.current, 'x', {duration: 1, ease: 'elastic.out(1, 0.3)'});
            YTo = gsap.quickTo(ref.current, 'y', {duration: 1, ease: 'elastic.out(1, 0.3)'});
            ref.current.addEventListener('mousemove', mouseMove);
            ref.current.addEventListener('mouseleave', mouseLeave);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousemove', mouseMove);
                ref.current.removeEventListener('mouseleave', mouseLeave);
            }
        }
    }, []);

    const mouseMove = (e: E) => {
        if (ref.current && xTo && YTo) {
            const {clientX, clientY} = e;
            const {left, top, width, height} = ref.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x);
            YTo(y);
        }
    }

    const mouseLeave = (e: E) => {
        if (xTo && YTo) {
            xTo(0);
            YTo(0);
        }
    }

    return (
        React.cloneElement(children, {ref})
    )
}