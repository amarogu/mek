import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {

    const ref = useRef<any>(null);

    return (
        <section className="px-8">
            <div ref={ref} className="h-[200vh] w-fit">
                <h2 className="text-[12.5rem] text-nowrap leading-none">Need to get in touch?</h2>
            </div>
        </section>
    )
}