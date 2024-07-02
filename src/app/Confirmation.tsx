import Image from "next/image";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import Img from '../../public/img4_confirmation.png';
import ConfirmationForm from "./ConfirmationForm";
import Context from "./Context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import instance from "@/lib/axios";
import { LeanDocument } from "@/lib/helpers";
import { IUser } from "@/lib/Models/Interfaces";

export default function Confirmation({id}: {id?: string}) {
    const sectionRef = useRef(null);

    const titleRef = useRef<HTMLHeadingElement | null>(null);

    const formRef = useRef<HTMLDivElement | null>(null);

    const { item } = useContext(Context);

    if (!item) {
        return null;
    }

    const isNotGroup = !('users' in item);

    const [guest, setGuest] = useState<LeanDocument<IUser> | null>(isNotGroup ? item : null);

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

    const handleConfirmation = async (option: boolean, _id: string) => {
        const res = await instance.post('/confirm', {
            confirmed: option, _id
        });
        if (res.data.message === 'User confirmed successfully') {
            return res.data.message;
        } else {
            return '';
        }
    }

    const tl = useRef<GSAPTimeline | null>(null);

    const confirmText = ['Confirmar', 'Presença'];
    const removeConfirmationText = ['Remover', 'Confirmação'];

    const confirmTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const removeConfirmationTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    const pulse = (elFadeIn: (HTMLParagraphElement | null)[], elFadeOut: (HTMLParagraphElement | null)[]) => {
        tl.current = gsap.timeline().to(elFadeOut, {
            opacity: 0,
            duration: 0.2
        }).set(elFadeOut, {
            display: 'none'
        }).set(elFadeIn, {
            display: 'block'
        }).to(elFadeIn, {
            opacity: 1,
            duration: 0.2
        });
    }

    const handleClick = async () => {
        if (isNotGroup && guest  && confirmTextRefs.current && removeConfirmationTextRefs.current) {
            const option = !guest.confirmed;
            const _id = item._id;
            const res = await handleConfirmation(option, _id);
            if (res === 'User confirmed successfully') {
                setGuest(g => {
                    if (g) {
                        return {
                            ...g,
                            confirmed: option
                        }
                    } else {
                        return null;
                    }
                });
                if (option) {
                    pulse(removeConfirmationTextRefs.current, confirmTextRefs.current);
                } else {
                    pulse(confirmTextRefs.current, removeConfirmationTextRefs.current);
                }
            }
        }
    }

    return (
        <section id={id} ref={sectionRef} className="p-8 pt-20 pb-28">
            <div ref={parentRef} onMouseMove={isNotGroup ? (e) => { handleMouseMove(e) } : () => {}} onMouseLeave={isNotGroup ? handleMouseLeave : () => {}} className={`text-[12.5vw] relative flex flex-col gap-16 items-center md:text-[9vw] xl:text-[120px] container mx-auto font-extrabold leading-[85%] ${isNotGroup ? 'cursor-pointer' : ''}`}>
                <h2 ref={titleRef} className="flex flex-col">
                    <p className="ml-16 relative">
                        <span>
                            Confirmar
                        </span>
                        {
                            isNotGroup ?
                                <div className="absolute">

                                </div> :
                                null
                        }
                    </p>
                    <p className="flex gap-4 items-center">
                        <span>presença</span>
                        <Image className="md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px] object-cover object-[center_30%]" loading="eager" src={Img} alt="Imagem de Maria e Kalil" />
                    </p>
                    <p className="ml-6 md:text-right md:ml-0 md:mr-6">no evento</p>
                </h2>
                <div ref={formRef} className="text-3xl w-full">
                    <ConfirmationForm handleConfirmation={handleConfirmation} />
                </div>
                <button onClick={isNotGroup ? handleClick : () => {}} style={{transform: 'translate(-50%, -60%) scale(0)'}} ref={btnRef} className="absolute uppercase z-10 text-xs font-bold border backdrop-blur-md border-dark-bg-300/50 rounded-full w-[150px] h-[150px] dark:border-bg-300/50">
                    {
                        isNotGroup ?
                            confirmText.map((t, i) => {
                                return (
                                    <p ref={el => {
                                        if (el !== null) {
                                            confirmTextRefs.current[i] = el;
                                        }
                                    }} key={i} className={`${item.confirmed ? 'hidden opacity-0' : ''}`}>{t}</p>
                                )
                            }) :
                            null
                    }
                    {
                        isNotGroup ?
                            removeConfirmationText.map((t, i) => {
                                return (
                                    <p ref={el => {
                                        if (el !== null) {
                                            removeConfirmationTextRefs.current[i] = el;
                                        }
                                    }} key={i} className={`${item.confirmed ? '' : 'hidden opacity-0'}`}>{t}</p>
                                )
                            }) :
                            null
                    }
                </button>
            </div>
        </section>
    )
}