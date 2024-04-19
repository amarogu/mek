import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TextProps {
    on: 'hover' | 'mount' | 'click';
    animation: 'upper-staggering';
    el: React.ReactNode;
    content: string;
}

export default function AnimatedText({on, el, content, animation}: TextProps) {

    const ref = useRef<HTMLElement>(null);
    const upperRef = useRef<HTMLDivElement>(null);
    const lowerRef = useRef<HTMLDivElement>(null);
    let tl: gsap.core.Timeline = gsap.timeline({paused: true});

    useGSAP(() => {
        switch (animation) {
            case 'upper-staggering':
                    const chars = upperRef.current as HTMLDivElement;
                    const lowerChars = lowerRef.current as HTMLDivElement;
                    tl.to(chars.children, {y: -15, stagger: 0.025, duration: 0.3, ease: 'power2.inOut'});
                    tl.to(lowerChars.children, {y: '-100%', stagger: 0.05, duration: 0.3}, '-=0.3');
            break;
            default:
                return;
        }
    }, [])

    useEffect(() => {
        switch (on) {
            case 'hover':
                const chars = ref.current as HTMLElement;
                chars.addEventListener('mouseenter', () => tl.play());
                chars.addEventListener('mouseleave', () => tl.reverse());
                return () => {
                    chars.removeEventListener('mouseenter', () => tl.play());
                    chars.removeEventListener('mouseleave', () => tl.reverse());
                }
            case 'mount':
                tl.play();
                break;
            case 'click':
                const charsClick = ref.current as HTMLElement;
                charsClick.addEventListener('click', () => tl.play());
                return () => {
                    charsClick.removeEventListener('click', () => tl.play());
                }
        }
    }, [])

    const characters = content.split('').map((char, index) => <span className="inline-block" key={index}>{char}</span>);
    const children = <div className="flex flex-col"><div ref={upperRef}>{characters}</div><div ref={lowerRef}>{characters}</div></div>
    return React.cloneElement(el as React.ReactElement, {ref}, children);
}