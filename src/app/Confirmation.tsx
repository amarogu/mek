import Image from "next/image";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import Img from '../../public/img4_confirmation.png';
import ConfirmationForm from "./ConfirmationForm";
import Context from "./Context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import instance from "@/lib/axios";
import { MutableRefObject } from "react";
import { useMediaQuery } from "react-responsive";

export default function Confirmation({id}: {id?: string}) {
    const { item } = useContext(Context);

    const isTouchBased = useMediaQuery({query: '(pointer: coarse)'});

    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const formRef = useRef<HTMLDivElement | null>(null);

    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    const parentRef = useRef<HTMLDivElement>(null);

    const titleText = ['Confirmar', 'presença', 'no evento'];
    const titleConfirmedText = ['Presença', 'confirmada', 'no evento'];
    const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const sliderRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const sliderTl = useRef<GSAPTimeline | null>(null);

    const lastUpdatedRef = useRef<HTMLParagraphElement | null>(null);
    const lastUpdatedTl = useRef<GSAPTimeline | null>(null);

    const indicatorTl = useRef<GSAPTimeline | null>(null);
    const indicatorRef = useRef<(HTMLParagraphElement | HTMLSpanElement | null)[]>([]);

    const btnConfirmText = ['Confirmar', 'Presença'];
    const btnRevokeText = ['Remover', 'Confirmação'];
    const btnRef = useRef<HTMLButtonElement>(null);
    const btnTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const btnTextTl = useRef<GSAPTimeline | null>(null);

    const { contextSafe } = useGSAP(() => {
        xTo.current = gsap.quickTo(btnRef.current, 'left', {duration: 0.2});
        yTo.current = gsap.quickTo(btnRef.current, 'top', {duration: 0.2});
        if (indicatorRef.current[0]) {
            gsap.to(indicatorRef.current[0], {
                rotate: 360,
                duration: 0.95,
                repeat: -1,
                ease: 'power1.inOut'
            });
        }
    });

    useEffect(() => {
        if (titleRef.current && formRef.current) {
            const width = titleRef.current.clientWidth;
            formRef.current.setAttribute('style', `width: ${width}px`);
        }
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

    const pulse = contextSafe((tl: MutableRefObject<GSAPTimeline | null>, target: MutableRefObject<HTMLParagraphElement | null> | MutableRefObject<(HTMLParagraphElement | HTMLSpanElement | null)[]>, replacementContent: string | string[]) => {
        tl.current = gsap.timeline().to(target.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                if (target.current instanceof Array) {
                    target.current.forEach((t, i) => {
                        if (t && t.textContent && replacementContent instanceof Array) {
                            t.textContent = replacementContent[i];
                        }
                        if (t && t.textContent && !(replacementContent instanceof Array)) {
                            t.textContent = replacementContent;
                        }
                    });
                } else {
                    if (target.current && !(replacementContent instanceof Array)) target.current.textContent = replacementContent;
                }
            }
        }).to(target.current, {
            opacity: 1,
            duration: 0.2
        })
    });

    const sliderAnimation = contextSafe((replacementText: string[]) => {
        const handleOnComplete = () => {
            if (sliderTl.current) sliderTl.current.revert();
            setDisabled(false);
        }
    
        const handleOnStart = () => {
            setDisabled(true);
        }

        sliderTl.current = gsap.timeline({
            onComplete: handleOnComplete,
            onStart: handleOnStart
        }).to(sliderRefs.current, {x: '0%', duration: 0.5, ease: 'power1.in', onComplete: () => {
                if (textRefs.current) {
                    textRefs.current.forEach((t, i) => {
                        if (t) {
                            t.textContent = replacementText[i];
                        }
                    })
                }
            }}).to(sliderRefs.current, {x: '100%', duration: 0.4, ease: 'power1.in'}, '+=0.2');
    });

    const [disabled, setDisabled] = useState(false);

    if (!item) return null;

    const isNotGroup = !('users' in item);

    const handleClick = contextSafe(async () => {
        if (isNotGroup && textRefs.current[0]) {
            const option = textRefs.current[0].textContent === titleText[0] ? true : false;
            const _id = item._id;
            const res = await handleConfirmation(option, _id);
            if (res === 'User confirmed successfully') {
                if (option) {
                    sliderAnimation(titleConfirmedText);
                    pulse(btnTextTl, btnTextRefs, btnRevokeText);
                    pulse(lastUpdatedTl, lastUpdatedRef, `Presença confirmada pela última vez em ${new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`);
                } else {
                    sliderAnimation(titleText);
                    pulse(btnTextTl, btnTextRefs, btnConfirmText);
                    pulse(lastUpdatedTl, lastUpdatedRef, `Confirmação removida pela última vez em ${new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`);
                }
            }
        }
    });

    const handleTouchBasedClick = contextSafe(async () => {
        if (isNotGroup && textRefs.current[0] && isTouchBased && !disabled) {
            const option = textRefs.current[0].textContent === titleText[0] ? true : false;
            const _id = item._id;
            const res = await handleConfirmation(option, _id);
            if (res === 'User confirmed successfully') {
                if (option) {
                    sliderAnimation(titleConfirmedText);
                    pulse(indicatorTl, indicatorRef, 'Clique para remover confirmação');
                    pulse(lastUpdatedTl, lastUpdatedRef, `Presença confirmada pela última vez em ${new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`);
                } else {
                    sliderAnimation(titleText);
                    pulse(indicatorTl, indicatorRef, 'Clique para confirmar');
                    pulse(lastUpdatedTl, lastUpdatedRef, `Confirmação removida pela última vez em ${new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`);
                }
            }
        }
    })

    return (
        <section id={id} ref={sectionRef} className="p-8 pt-20 pb-28">
            <div onClick={handleTouchBasedClick} ref={parentRef} onMouseMove={isNotGroup ? (e) => { handleMouseMove(e) } : () => {}} onMouseLeave={isNotGroup ? handleMouseLeave : () => {}} className={`text-[12.5vw] relative flex flex-col items-center md:text-[9vw] xl:text-[120px] container mx-auto font-extrabold leading-[85%] ${isNotGroup ? 'cursor-pointer gap-0' : 'gap-16 lg:flex-row lg:items-start'}`}>
                {
                    isNotGroup ? isTouchBased ? <p className="uppercase text-xs font-normal mb-6 animate-pulse items-center flex gap-4">
                        <span ref={el => {
                            if (el) indicatorRef.current[0] = el;
                        }} className="w-[6px] h-[6px] bg-text-100 dark:bg-dark-text-100"></span>
                        <span ref={el => {
                        if (el) indicatorRef.current[1] = el;
                        }}>
                            {
                                item.confirmed ? 'Clique para remover confirmação' : 'Clique para confirmar'
                            }    
                        </span> 
                    </p> : null : null
                }
                <h2 ref={titleRef} className="flex flex-col items-end">
                    <p className="ml-16 relative overflow-hidden self-start">
                        <span ref={el => {
                            if (el) textRefs.current[0] = el;
                        }}>
                            {
                                isNotGroup ? (item ? (item.confirmed ? titleConfirmedText[0] : titleText[0]) : null) : titleText[0]
                            }
                        </span>
                        {
                            isNotGroup ? <span ref={el => {
                                if (el) sliderRefs.current[0] = el;
                            }} style={{transform: 'translateX(-100%)'}} className="absolute top-0 left-0 h-full inline-block w-full z-10 bg-bg-100 dark:bg-dark-bg-100"></span> : null
                        }
                    </p>
                    <p className="flex gap-4 relative items-center">
                        <span ref={el => {
                            if (el) textRefs.current[1] = el;
                        }}>
                            {
                                isNotGroup ? (item ? (item.confirmed ? titleConfirmedText[1] : titleText[1]) : null) : titleText[1]
                            }
                        </span>
                        <Image className="md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px] object-cover object-[center_30%]" loading="eager" src={Img} alt="Imagem de Maria e Kalil" />
                        {
                            isNotGroup ? <span ref={el => {
                                if (el) sliderRefs.current[1] = el;
                            }} style={{transform: 'translateX(-100%)'}} className="absolute left-0 top-0 h-[calc(100%+16px)] xl:h-[calc(100%+32px)] inline-block w-full z-10 bg-bg-100 dark:bg-dark-bg-100"></span> : null
                        }
                    </p>
                    <p className="ml-6 overflow-hidden relative md:ml-0 md:mr-6">
                        <span ref={el => {
                            if (el) textRefs.current[2] = el;
                        }}>
                            {
                                isNotGroup ? (item ? (item.confirmed ? titleConfirmedText[2] : titleText[2]) : null) : titleText[2]
                            }
                        </span>
                        {
                            isNotGroup ? <span ref={el => {
                                if (el) sliderRefs.current[2] = el;
                            }} style={{transform: 'translateX(-100%)'}} className="absolute left-0 top-0 inline-block h-full w-full z-10 bg-bg-100 dark:bg-dark-bg-100"></span> : null
                        }
                    </p>
                </h2>
                <div ref={formRef} className="text-3xl flex flex-col justify-between w-full">
                    <ConfirmationForm handleConfirmation={handleConfirmation} />
                    <div className="text-[10px]">

                    </div>
                </div>
                {
                    isNotGroup ? <p ref={lastUpdatedRef} className="text-xs font-normal mt-6">
                        {
                            item.confirmed ? (item.lastConfirmed ? `Presença confirmada pela última vez em ${item.lastConfirmed.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}` : null) : (item.lastRevokedConfirmation ? `Confirmação removida pela última vez em ${item.lastRevokedConfirmation.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}` : null)
                        }
                    </p> : null
                }
                <button disabled={disabled} onClick={isNotGroup ? handleClick : () => {}} style={{transform: 'translate(-50%, -60%) scale(0)'}} ref={btnRef} className={`absolute uppercase z-10 text-xs font-bold border backdrop-blur-md border-dark-bg-300/50 rounded-full w-[150px] h-[150px] dark:border-bg-300/50 ${isTouchBased ? 'hidden' : ''}`}>
                    {
                        isNotGroup ?
                            item.confirmed ? btnRevokeText.map((t, i) => {
                                return (
                                    <p ref={el => {
                                        if (el !== null) {
                                            btnTextRefs.current[i] = el;
                                        }
                                    }} key={i}>{t}</p>
                                )
                            }) : btnConfirmText.map((t, i) => {
                                return (
                                    <p ref={el => {
                                        if (el !== null) {
                                            btnTextRefs.current[i] = el;
                                        }
                                    }} key={i}>{t}</p>
                                )
                            }) :
                            null
                    }
                </button>
            </div>
        </section>
    )
}