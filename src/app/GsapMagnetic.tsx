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

    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const ref = useRef<any>(null);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(pointer: coarse)');
        let touchDevice = mediaQueryList.matches; // Use a local variable
    
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
    
        const listener = (event: MediaQueryListEvent) => {
            touchDevice = event.matches;
            setIsTouchDevice(touchDevice);
            if (!touchDevice) {
                ref.current.addEventListener('mousemove', mouseMove);
                ref.current.addEventListener('mouseleave', mouseLeave);
            } else {
                ref.current.removeEventListener('mousemove', mouseMove);
                ref.current.removeEventListener('mouseleave', mouseLeave);
            }
        };
    
        // Set initial value
        setIsTouchDevice(touchDevice);
    
        // Listen for changes
        mediaQueryList.addEventListener('change', listener);
    
        if (!touchDevice) {
            ref.current.addEventListener('mousemove', mouseMove);
            ref.current.addEventListener('mouseleave', mouseLeave);
        }
    
        return () => {
            if (!touchDevice) {
                ref.current.removeEventListener('mousemove', mouseMove);
                ref.current.removeEventListener('mouseleave', mouseLeave);
            }
        }
    }, [])

    return (
        React.cloneElement(children, {ref})
    )
}