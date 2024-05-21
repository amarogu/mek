import { type Gift as GiftT } from "@/lib/Models/Gift";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function Gift({gift}: {gift: GiftT}) {

    const upperContainer = useRef<HTMLDivElement>(null);
    const lowerContainer = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(upperContainer.current, {
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true
            },
            yPercent: 0,
            y: 0
        });

        gsap.to(lowerContainer.current, {
            scrollTrigger: {
                trigger: container.current,
                start: 'bottom bottom',
                end: 'bottom bottom'
            },
            yPercent: 0,
            y: 0
        });

    }, [])

    return (
        <div ref={container} className="w-full relative overflow-y-hidden h-96 bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col">
            <div ref={upperContainer} style={{transform: 'translateY(-16px) translateY(-100%)'}} className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{gift.title}</h3>
                <h4 className="text-xl">{gift.description}</h4>
            </div>
            <div className="grow"></div>
            <div ref={lowerContainer} style={{transform: 'translateY(16px) translateY(100%)'}}>
                <h3 className="text-xl font-semibold">R${gift.value}</h3>
            </div>
        </div>
    )
}