import { ErrorResponse, SuccessResponse, parseResponse, emptyMsg } from "@/lib/helpers";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useEffect, useRef } from "react"

export default function Button({text, res, onClick}: {text: string, res?: SuccessResponse | ErrorResponse, onClick?: () => void}) {

    const ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const statusRef = useRef<HTMLParagraphElement>(null);
    const textContainer = useRef<HTMLDivElement>(null);

    const tl = useRef<GSAPTimeline | null>();


    useGSAP(() => {
        if (res === emptyMsg) {
            tl.current = gsap.timeline().to(ref.current, {xPercent: 100, duration: 1, ease: 'elastic.inOut'}).to(textRef.current, {opacity: 0, duration: 0.15}).to(statusRef.current, {opacity: 1, duration: 0.15}).to(ref.current, {xPercent: 200, duration: 1, ease: 'elastic.inOut'}, '>0.15').to(textRef.current, {opacity: 1, duration: 0.15}).to(statusRef.current, {opacity: 0, duration: 0.15});
        }
    }, {dependencies: [res], revertOnUpdate: true});

    useEffect(() => {
        if (textContainer.current && textRef.current) textContainer.current.style.height = `${textRef.current.clientHeight}px`;
    }, [])

    return (
        <button onClick={(e) => {e.preventDefault(); if (onClick) onClick()}} className={`px-8 overflow-hidden text-2xl relative uppercase font-bold text-center py-4 border transition-colors ${res?.message === 'An error occurred' ? 'border-red-400' : 'border-text-100 dark:border-dark-text-100'}`}>
            <div ref={textContainer} className="relative z-10">
                <p ref={textRef} className="inline absolute z-10 top-0 left-1/2 -translate-x-1/2">{text}</p>
                {res ? <p ref={statusRef} className="opacity-0 inline absolute top-0 left-1/2 -translate-x-1/2 text-bg-100 dark:text-dark-bg-100">{parseResponse(res).for('btn')}</p> : null}
            </div>
            <div ref={ref} className={`absolute w-full h-full -translate-x-full top-0 left-0 ${res?.message === 'An error occurred' ? 'bg-red-400' : 'bg-text-100 dark:bg-dark-text-100'}`}></div>
        </button>
    )
}