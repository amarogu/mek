import Image from "next/image";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import Img from '../../public/img4_confirmation.png';
import ConfirmationForm from "./ConfirmationForm";
import Context from "./Context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Confirmation({id}: {id?: string}) {
    const sectionRef = useRef(null);

    const titleRef = useRef<HTMLHeadingElement | null>(null);

    const formRef = useRef<HTMLDivElement | null>(null);

    const { item } = useContext(Context);

    if (!item) {
        return null;
    }

    const isNotGroup = !('users' in item);

    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    const btnRef = useRef<HTMLButtonElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP(() => {
        xTo.current = gsap.quickTo(btnRef.current, 'left', {duration: 0.2});
        yTo.current = gsap.quickTo(btnRef.current, 'top', {duration: 0.2});
    });

    const handleMouseLeave = contextSafe(() => {
        if (btnRef.current) {
            gsap.to(btnRef.current, {
                scale:  0,
                duration:  0.5,  
            })
        }
    });

    const handleMouseMove = contextSafe((e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (btnRef.current && xTo.current && yTo.current && parentRef.current) {
            if (!parentRef.current.contains(e.target as Node)) {
                return;
            }

            const {clientX, clientY} = e;
            const {x, y} = parentRef.current.getBoundingClientRect();
            const targetX = clientX - x;
            const targetY = clientY - y;
            xTo.current(targetX);
            yTo.current(targetY);
            gsap.to(btnRef.current, {
                scale:  1,
                duration:  0.5,  
            });
        }
    });

    useEffect(() => {
        if (titleRef.current && formRef.current) {
            const width = titleRef.current.clientWidth;
            formRef.current.setAttribute('style', `width: ${width}px`);
        }
    });

    return (
        <section id={id} ref={sectionRef} className="p-8 pt-20 pb-28">
            <div ref={parentRef} onMouseMove={isNotGroup ? (e) => { handleMouseMove(e) } : () => {}} onMouseLeave={isNotGroup ? handleMouseLeave : () => {}} className={`text-[12.5vw] relative flex flex-col gap-16 items-center md:text-[9vw] xl:text-[120px] container mx-auto font-extrabold leading-[85%] ${isNotGroup ? 'cursor-pointer' : ''}`}>
                <h2 ref={titleRef} className="flex flex-col">
                    <p className="ml-16">Confirmar</p>
                    <p className="flex gap-4 items-center">
                        <span>presença</span>
                        <Image className="md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px] object-cover object-[center_30%]" loading="eager" src={Img} alt="Imagem de Maria e Kalil" />
                    </p>
                    <p className="ml-6 md:text-right md:ml-0 md:mr-6">no evento</p>
                </h2>
                <div ref={formRef} className="text-3xl w-full">
                    <ConfirmationForm />
                </div>
                <button style={{transform: 'scale(0)'}} ref={btnRef} className="absolute">
                    Click here
                </button>
            </div>
        </section>
    )
}