import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LeanDocument } from "@/lib/helpers";
import { IGift } from "@/lib/Models/Interfaces";
import Image from "next/image";
import Context from "./Context";

export default function Gift({gift}: {gift: LeanDocument<IGift>}) {
    const upperContainer = useRef<HTMLDivElement>(null);
    const lowerContainer = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState<boolean>(false);

    const {item} = useContext(Context);

    useGSAP(() => {
        let coarse = window.matchMedia('(pointer: coarse)').matches;

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
    }, [hovering]);

    useEffect(() => {
        if (gift.soldOut) setHovering(true);
    }, [gift.soldOut])

    return (
        <Link aria-disabled={gift.soldOut} className={`${gift.soldOut ? 'pointer-events-none relative' : ''}`} href={`/${item?._id}/${gift._id}`}>
            <div className={`${gift.soldOut ? 'absolute z-20 flex items-center justify-center w-full h-full' : 'hidden'}`}>
                <p className="uppercase text-2xl font-bold p-4 bg-primary-200 dark:bg-dark-primary-100 border border-primary-300 dark:border-dark-primary-300">Esgotado</p>
            </div>
            <div ref={container} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className={`w-full cursor-pointer relative overflow-y-hidden bg-bg-200 dark:bg-dark-bg-200 p-4 flex gap-12 flex-col ${gift.soldOut ? 'opacity-25 dark:opacity-50' : ''}`}>
                <div ref={upperContainer} style={{transform: 'translateY(-16px) translateY(-100%)'}} className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{gift.title}</h3>
                    <h4 className="text-xl">{gift.description}</h4>
                </div>
                <div className="grow">
                    <Image className="object-contain object-center h-full w-full" loading="eager" alt={gift.title} width={500} height={500} src={gift.img} />
                </div>
                <div ref={lowerContainer} style={{transform: 'translateY(16px) translateY(100%)'}}>
                    <h3 className="text-xl font-semibold">R${gift.value.toFixed(2)}</h3>
                </div>
            </div>
        </Link>
    )
}