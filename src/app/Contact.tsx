import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {

    const ref = useRef<any>(null);
    const getInTouch = useRef<any>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(getInTouch.current, {
            x: '-1972.12px',
            scrollTrigger: {
                trigger: getInTouch.current,
                start: 'top bottom-=200px',
                end: 'bottom top',
                markers: true,
                scrub: true,
            }
        })
    }, [])

    return (
        <section className="px-8 container mx-auto">
            <div ref={ref} className="h-[200vh] w-fit">
                <h2 ref={getInTouch} className={`text-[12.5rem] text-nowrap leading-none`}>Need to get in touch?</h2>
            </div>
        </section>
    )
}