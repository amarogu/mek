import { type Gift as GiftT } from "@/lib/Models/Gift";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

export default function Gift({gift}: {gift: GiftT}) {

    const upperContainer = useRef<HTMLDivElement>(null);
    const lowerContainer = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState<boolean>(false);

    useGSAP(() => {

        let coarse = window.matchMedia('(pointer: coarse)').matches;

        gsap.registerPlugin(ScrollTrigger);

        if (coarse) {
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
        } else {
            gsap.to(upperContainer.current, {
                yPercent: hovering ? 0 : -100,
                y: hovering ? 0 : -16
            });
            gsap.to(lowerContainer.current, {
                yPercent: hovering ? 0 : 100,
                y: hovering ? 0 : 16
            });
        }

    }, [hovering])

    return (
        <div ref={container} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="w-full cursor-pointer relative overflow-y-hidden h-[464px] bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col">
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