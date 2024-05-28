import { ErrorResponse, SuccessResponse, parseResponse, emptyMsg } from "@/lib/helpers";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useEffect, useRef, useState } from "react"

export default function Button({text, res, onClick, clicked, cleanup, onComplete}: {text: string, res?: SuccessResponse | ErrorResponse, onClick?: () => void, clicked: boolean, cleanup?: () => void, onComplete?: () => void}) {

    const ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const statusRef = useRef<HTMLParagraphElement>(null);
    const resultRef = useRef<HTMLParagraphElement>(null);
    const textContainer = useRef<HTMLDivElement>(null);
    const [completed, setCompleted] = useState<boolean[]>([false, false]);

    const tl = useRef<GSAPTimeline | null>();


    useGSAP(() => {
        if (res === emptyMsg) {
            tl.current = gsap.timeline({onComplete: cleanup}).to(ref.current, {xPercent: 100, duration: 1, ease: 'elastic.inOut'}).to(textRef.current, {opacity: 0, duration: 0.15}).to(resultRef.current, {opacity: 1, duration: 0.15}).to(resultRef.current, {opacity: 0, duration: 0.15}, '>0.25').to(ref.current, {xPercent: 200, duration: 1, ease: 'elastic.inOut'}, '>0.15').to(textRef.current, {opacity: 1, duration: 0.15});
        }
    }, {dependencies: [res], revertOnUpdate: true});

    useGSAP(() => {
        if (!res && clicked && !completed[0]) {
            return tl.current = gsap.timeline({onComplete: () => setCompleted([true, false])}).to(ref.current, {xPercent: 100, duration: 1, ease: 'elastic.inOut'}).to(textRef.current, {opacity: 0, duration: 0.15}).to(statusRef.current, {opacity: 1, duration: 0.15});
        }
        if (res && res !== emptyMsg && clicked && completed[0]) {
            return tl.current = gsap.timeline({onComplete: () => {setCompleted([false, true])}}).to(statusRef.current, {opacity: 0, duration: 0.15}).to(resultRef.current, {opacity: 1, duration: 0.15}, '>0.25').to(resultRef.current, {opacity: 0, duration: 0.15}, '>0.25').to(ref.current, {xPercent: 200, duration: 1, ease: 'elastic.inOut'}).to(textRef.current, {opacity: 1, duration: 0.15});
        }
        if (completed[1]) {
            return tl.current = gsap.timeline({onComplete: () => {if (cleanup) cleanup(); setCompleted([false, false]); if (onComplete) onComplete()}}).to(ref.current, {xPercent: 0, duration: 0}).to(statusRef.current, {opacity: 0, duration: 0}).to(resultRef.current, {opacity: 0, duration: 0}).to(textRef.current, {opacity: 1, duration: 0});
        }
    }, [res, clicked, completed]);

    useEffect(() => {
        if (textContainer.current && textRef.current) textContainer.current.style.height = `${textRef.current.clientHeight}px`;
    }, [])

    return (
        <button disabled={clicked ? true : false} onClick={(e) => {e.preventDefault(); if (onClick) onClick()}} className={`px-8 overflow-hidden text-2xl relative uppercase font-bold text-center py-4 border transition-colors ${res?.message === 'An error occurred' ? 'border-red-400' : 'border-text-100 dark:border-dark-text-100'}`}>
            <div ref={textContainer} className="relative z-10">
                <p ref={textRef} className="inline absolute z-10 top-0 left-1/2 -translate-x-1/2">{text}</p>
                <p ref={statusRef} className="opacity-0 inline absolute top-0 left-1/2 -translate-x-1/2 text-bg-100 dark:text-dark-bg-100">Enviando</p>
                <p ref={resultRef} className="opacity-0 inline absolute top-0 left-1/2 -translate-x-1/2 text-bg-100 dark:text-dark-bg-100">{parseResponse(res).for('btn')}</p>
            </div>
            <div ref={ref} className={`absolute w-full h-full -translate-x-full top-0 left-0 ${res?.message === 'An error occurred' ? 'bg-red-400' : 'bg-text-100 dark:bg-dark-text-100'}`}></div>
        </button>
    )
}