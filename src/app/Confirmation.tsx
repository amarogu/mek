import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Confirmation() {

    const text = ['Confirmar', 'Presença'];

    const container = useRef(null);

    const textRefs = [useRef(null), useRef(null)];

    const tl = useRef<GSAPTimeline | null>();

    useGSAP(() => {
        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom+=500% top',
                scrub: true,
                pin: true,
                markers: true
            }
        }).to(textRefs[0].current, {
            scale: 25,
            ease: 'power1.in'
        }).to(textRefs[1].current, {
            scale: 25,
            ease: 'power1.in'
        });
    })

    return (
        <section ref={container} className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
            <div className="h-screen relative p-8">
                {
                    text.map((t, i) => <h2 key={i} ref={textRefs[i]} className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${i === 1 ? 'text-dark-text-100 dark:text-text-100' : ''}`}>{t}</h2>)
                }
            </div>
        </section>
    )
}