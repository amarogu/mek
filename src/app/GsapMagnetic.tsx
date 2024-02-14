import React from "react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface GsapMagneticProps {
    children: React.ReactElement;
}

interface E {
    clientX: number;
    clientY: number;
}

export default function GsapMagnetic({children}: GsapMagneticProps) {

    const [isTouchDevcie, setIsTouchDevice] = useState(false);

    const ref = useRef<any>(null);

    useEffect(() => {

        const mediaQueryList = window.matchMedia('(pointer: coarse)');
        const listener = (event: MediaQueryListEvent) => {
            setIsTouchDevice(event.matches);
            if (!event.matches) {
                ref.current.addEventListener('mousemove', mouseMove);
                ref.current.addEventListener('mouseleave', mouseLeave);
            } else {
                ref.current.removeEventListener('mousemove', mouseMove);
                ref.current.removeEventListener('mouseleave', mouseLeave);
            }
        };

        // Set initial value
        setIsTouchDevice(mediaQueryList.matches);

        // Listen for changes
        mediaQueryList.addEventListener('change', listener);

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

        if (!isTouchDevcie) {
            ref.current.addEventListener('mousemove', mouseMove);
            ref.current.addEventListener('mouseleave', mouseLeave);
        }

        return () => {
            if (!isTouchDevcie) {
                ref.current.removeEventListener('mousemove', mouseMove);
                ref.current.removeEventListener('mouseleave', mouseLeave);
            }
        }
    }, [])

    return (
        React.cloneElement(children, {ref})
    )
}