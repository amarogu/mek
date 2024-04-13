import React, { useRef } from "react";
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

    switch (on) {
        case 'hover':
            switch (animation) {
                case 'upper-staggering':
                    useGSAP(() => {
                        const chars = ref.current as HTMLElement;
                        const tl = gsap.timeline({paused: true});
                        tl.to(chars.children, {y: -20, stagger: 0.1});
                        chars.addEventListener('mouseenter', () => tl.play());
                        chars.addEventListener('mouseleave', () => tl.reverse());
                        return () => {
                            chars.removeEventListener('mouseenter', () => tl.play());
                            chars.removeEventListener('mouseleave', () => tl.reverse());
                        }
                    }, []);
            }
            break;
        case 'mount':
            switch (animation) {
                case 'upper-staggering':
                    useGSAP(() => {
                        const chars = ref.current as HTMLElement;
                        gsap.from(chars.children, {y: -20, stagger: 0.1});
                    }, []);
            }
            break;
        case 'click':
            switch (animation) {
                case 'upper-staggering':
                    useGSAP(() => {
                        const chars = ref.current as HTMLElement;
                        const tl = gsap.timeline({paused: true});
                        tl.from(chars.children, {y: -20, stagger: 0.1});
                        chars.addEventListener('click', () => tl.play());
                        return () => {
                            chars.removeEventListener('click', () => tl.play());
                        }
                    }, []);
            }
            break;
    }

    const characters = content.split('').map((char, index) => <span className="inline-block" key={index}>{char}</span>);
    return React.cloneElement(el as React.ReactElement, {ref}, characters);
}