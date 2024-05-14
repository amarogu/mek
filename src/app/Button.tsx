import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useEffect, useRef, useState } from "react"

export default function Button({text}: {text: string}) {

    const [clicked, setClicked] = useState<string>('');

    const ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const alterTextRef = useRef<HTMLParagraphElement>(null);
    const textContainer = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setClicked('clicked');
    }

    const handleComplete = () => {
        console.log('complete');
        setClicked('over');
    }

    const tl = useRef<GSAPTimeline | null>();

    useGSAP(() => {
        switch (clicked) {
            case 'clicked':
                tl.current = gsap.timeline({onComplete: handleComplete}).to(ref.current, {xPercent: 100, duration: 1, ease: 'elastic.inOut'}).to(textRef.current, {opacity: 0, duration: 0.15}).to(alterTextRef.current, {opacity: 1, duration: 0.15}).to(ref.current, {xPercent: 200, duration: 1, ease: 'elastic.inOut'}, '>0.15');
            case 'over':
                if (ref.current) ref.current.style.transform = 'translateX(-100%)';
                gsap.to(textRef.current, {opacity: 1, duration: 0.15});
                gsap.to(alterTextRef.current, {opacity: 0, duration: 0.15});
            default:
                return;
        }
    }, {dependencies: [clicked], revertOnUpdate: true});

    useEffect(() => {
        if (textContainer.current && textRef.current) textContainer.current.style.height = `${textRef.current.clientHeight}px`;
    }, [])

    return (
        <button onClick={handleClick} className="px-8 overflow-hidden text-2xl relative uppercase font-bold text-center py-4 border border-text-100 dark:border-dark-text-100">
            <div ref={textContainer} className="relative z-10">
                <p ref={textRef} className="inline absolute top-0 left-1/2 -translate-x-1/2">{text}</p>
                <p ref={alterTextRef} className="opacity-0 inline absolute top-0 left-1/2 -translate-x-1/2 text-dark-text-100 dark:text-text-100">{text}</p>
            </div>
            <div ref={ref} className="absolute w-full h-full -translate-x-full top-0 left-0 bg-text-100 dark:bg-dark-text-100"></div>
        </button>
    )
}