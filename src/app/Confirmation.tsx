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
import { useMediaQuery } from "react-responsive";

export default function Confirmation({id}: {id?: string}) {
    const sectionRef = useRef(null);

    const titleRef = useRef<HTMLHeadingElement | null>(null);

    const formRef = useRef<HTMLDivElement | null>(null);

    const { item } = useContext(Context);

    if (!item) {
        return null;
    }

    const isTouchBased = useMediaQuery({query: '(pointer: coarse)'});

    const isNotGroup = !('users' in item);

    const [guest, setGuest] = useState<LeanDocument<IUser> | null>(isNotGroup ? item : null);

    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    const btnRef = useRef<HTMLButtonElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const tl = useRef<GSAPTimeline | null>(null);
    const sliderTl = useRef<GSAPTimeline | null>(null);

    const sliderRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const text = ['Confirmar', 'presença', 'no evento'];
    const confirmedText = ['Presença', 'confirmada', 'no evento'];

    const lastUpdatedRef = useRef<HTMLParagraphElement | null>(null);
    const lastUpdatedTl = useRef<GSAPTimeline | null>(null);

    const rotatingSquareRef = useRef<HTMLSpanElement | null>(null);

    const { contextSafe } = useGSAP(() => {
        xTo.current = gsap.quickTo(btnRef.current, 'left', {duration: 0.2});
        yTo.current = gsap.quickTo(btnRef.current, 'top', {duration: 0.2});
        if (rotatingSquareRef.current) {
            gsap.to(rotatingSquareRef.current, {
                rotate: 360,
                duration: 0.95,
                repeat: -1,
                ease: 'power1.inOut'
            });
        }
    });

    const indicatorRef = useRef<HTMLParagraphElement | null>(null);

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

    const [disabled, setDisabled] = useState(false);

    const handleOnComplete = () => {
        if (sliderTl.current) sliderTl.current.revert();
        setDisabled(false);
    }

    const handleOnStart = () => {
        setDisabled(true);
    }

    const handleClick = contextSafe(async () => {
        if (isNotGroup && guest  && confirmTextRefs.current && removeConfirmationTextRefs.current) {
            const option = !guest.confirmed;
            const _id = item._id;
            const res = await handleConfirmation(option, _id);
            if (res === 'User confirmed successfully') {
                setGuest(g => {
                    if (g) {
                        if (option) {
                            return {
                                ...g,
                                confirmed: option,
                                lastConfirmed: new Date()
                            }
                        } else {
                            return {
                                ...g,
                                confirmed: option,
                                lastRevokedConfirmation: new Date()
                            }
                        }
                    } else {
                        return null;
                    }
                });
                if (option) {
                    sliderTl.current = gsap.timeline({
                        onComplete: handleOnComplete,
                        onStart: handleOnStart
                    }).to(sliderRefs.current, {x: '0%', duration: 0.5, ease: 'power1.in', onComplete: () => {
                        if (textRefs.current) {
                            textRefs.current.forEach((t, i) => {
                                if (t) {
                                    t.textContent = confirmedText[i];
                                }
                            })
                        }
                    }}).to(sliderRefs.current, {x: '100%', duration: 0.4, ease: 'power1.in'}, '+=0.2');
                    pulse(removeConfirmationTextRefs.current, confirmTextRefs.current);
                    lastUpdatedTl.current = gsap.timeline().to(lastUpdatedRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            if (lastUpdatedRef.current) {
                                lastUpdatedRef.current.textContent = `Presença confirmada pela última vez em ${guest.lastConfirmed.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`;
                            }
                        }
                    }).to(lastUpdatedRef.current, {
                        opacity: 1,
                        duration: 0.2
                    });
                } else {
                    sliderTl.current = gsap.timeline({
                        onComplete: handleOnComplete,
                        onStart: handleOnStart
                    }).to(sliderRefs.current, {x: '0%', duration: 0.5, ease: 'power1.in', onComplete: () => {
                        if (textRefs.current) {
                            textRefs.current.forEach((t, i) => {
                                if (t) {
                                    t.textContent = text[i];
                                }
                            })
                        }
                    }}).to(sliderRefs.current, {x: '100%', duration: 0.4, ease: 'power1.in'}, '+=0.2');
                    pulse(confirmTextRefs.current, removeConfirmationTextRefs.current);
                    lastUpdatedTl.current = gsap.timeline().to(lastUpdatedRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            if (lastUpdatedRef.current) {
                                lastUpdatedRef.current.textContent = `Confirmação removida pela última vez em ${guest.lastRevokedConfirmation.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`;
                            }
                        }
                    }).to(lastUpdatedRef.current, {
                        opacity: 1,
                        duration: 0.2
                    });
                }
            }
        }
    });

    const pulsingTl = useRef<GSAPTimeline | null>(null);

    const handleTouchBasedClick = contextSafe(async () => {
        if (isNotGroup && isTouchBased && !disabled && guest && confirmTextRefs.current && removeConfirmationTextRefs.current) {
            const option = !guest.confirmed;
            const _id = item._id;
            const res = await handleConfirmation(option, _id);
            if (res === 'User confirmed successfully') {
                setGuest(g => {
                    if (g) {
                        if (option) {
                            return {
                                ...g,
                                confirmed: option,
                                lastConfirmed: new Date()
                            }
                        } else {
                            return {
                                ...g,
                                confirmed: option,
                                lastRevokedConfirmation: new Date()
                            }
                        }
                    } else {
                        return null;
                    }
                });
                if (option) {
                    sliderTl.current = gsap.timeline({
                        onComplete: handleOnComplete,
                        onStart: handleOnStart
                    }).to(sliderRefs.current, {x: '0%', duration: 0.5, ease: 'power1.in', onComplete: () => {
                        if (textRefs.current) {
                            textRefs.current.forEach((t, i) => {
                                if (t) {
                                    t.textContent = confirmedText[i];
                                }
                            })
                        }
                    }}).to(sliderRefs.current, {x: '100%', duration: 0.4, ease: 'power1.in'}, '+=0.2');
                    pulsingTl.current = gsap.timeline().to(indicatorRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            if (indicatorRef.current) {
                                const lastChild = indicatorRef.current.lastElementChild;
                                if (lastChild) {
                                    lastChild.textContent = 'Clique para remover confirmação';
                                }
                            }
                        }
                    }).to(indicatorRef.current, {
                        opacity: 1,
                        duration: 0.2
                    });
                    lastUpdatedTl.current = gsap.timeline().to(lastUpdatedRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            if (lastUpdatedRef.current) {
                                lastUpdatedRef.current.textContent = `Presença confirmada pela última vez em ${guest.lastConfirmed.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`;
                            }
                        }
                    }).to(lastUpdatedRef.current, {
                        opacity: 1,
                        duration: 0.2
                    });
                } else {
                    sliderTl.current = gsap.timeline({
                        onComplete: handleOnComplete,
                        onStart: handleOnStart
                    }).to(sliderRefs.current, {x: '0%', duration: 0.5, ease: 'power1.in', onComplete: () => {
                        if (textRefs.current) {
                            textRefs.current.forEach((t, i) => {
                                if (t) {
                                    t.textContent = text[i];
                                }
                            })
                        }
                    }}).to(sliderRefs.current, {x: '100%', duration: 0.4, ease: 'power1.in'}, '+=0.2');
                    pulsingTl.current = gsap.timeline().to(indicatorRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            if (indicatorRef.current) {
                                const lastChild = indicatorRef.current.lastElementChild;
                                if (lastChild) {
                                    lastChild.textContent = 'Clique para confirmar';
                                }
                            }
                        }
                    }).to(indicatorRef.current, {
                        opacity: 1,
                        duration: 0.2
                    });
                    lastUpdatedTl.current = gsap.timeline().to(lastUpdatedRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            if (lastUpdatedRef.current) {
                                lastUpdatedRef.current.textContent = `Confirmação removida pela última vez em ${guest.lastRevokedConfirmation.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`;
                            }
                        }
                    }).to(lastUpdatedRef.current, {
                        opacity: 1,
                        duration: 0.2
                    });
                }
            }
        }
    })

    return (
        <section id={id} ref={sectionRef} className="p-8 pt-20 pb-28">
            <div onClick={handleTouchBasedClick} ref={parentRef} onMouseMove={isNotGroup ? (e) => { handleMouseMove(e) } : () => {}} onMouseLeave={isNotGroup ? handleMouseLeave : () => {}} className={`text-[12.5vw] relative flex flex-col items-center md:text-[9vw] xl:text-[120px] container mx-auto font-extrabold leading-[85%] ${isNotGroup ? 'cursor-pointer gap-0' : 'gap-16'}`}>
                {
                    isNotGroup ? isTouchBased ? <p ref={indicatorRef} className="uppercase text-xs font-normal mb-6 animate-pulse items-center flex gap-4">
                        <span ref={rotatingSquareRef} className="w-[6px] h-[6px] bg-text-100 dark:bg-dark-text-100"></span>
                        <span>
                            {
                                item.confirmed ? 'Clique para remover confirmação' : 'Clique para confirmar'
                            }
                        </span>
                    </p> : null : null
                }
                <h2 ref={titleRef} className="flex flex-col items-end">
                    <p className="ml-16 relative overflow-hidden self-start">
                        <span ref={el => {
                            if (el) return textRefs.current[0] = el;
                        }}>
                            {
                                isNotGroup ? (item ? (item.confirmed ? confirmedText[0] : text[0]) : null) : text[0]
                            }
                        </span>
                        {
                            isNotGroup ? <span ref={el => {
                                if (el) return sliderRefs.current[0] = el;
                            }} style={{transform: 'translateX(-100%)'}} className="absolute top-0 left-0 h-full inline-block w-full z-10 bg-bg-100 dark:bg-dark-bg-100"></span> : null
                        }
                    </p>
                    <p className="flex gap-4 relative items-center">
                        <span ref={el => {
                            if (el) return textRefs.current[1] = el;
                        }}>
                            {
                                isNotGroup ? (item ? (item.confirmed ? confirmedText[1] : text[1]) : null) : text[1]
                            }
                        </span>
                        <Image className="md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px] object-cover object-[center_30%]" loading="eager" src={Img} alt="Imagem de Maria e Kalil" />
                        {
                            isNotGroup ? <span ref={el => {
                                if (el) return sliderRefs.current[1] = el;
                            }} style={{transform: 'translateX(-100%)'}} className="absolute left-0 top-0 h-[calc(100%+16px)] xl:h-[calc(100%+32px)] inline-block w-full z-10 bg-bg-100 dark:bg-dark-bg-100"></span> : null
                        }
                    </p>
                    <p className="ml-6 overflow-hidden relative md:ml-0 md:mr-6">
                        <span ref={el => {
                            if (el) return textRefs.current[2] = el;
                        }}>
                            {
                                isNotGroup ? (item ? (item.confirmed ? confirmedText[2] : text[2]) : null) : text[2]
                            }
                        </span>
                        {
                            isNotGroup ? <span ref={el => {
                                if (el) return sliderRefs.current[2] = el;
                            }} style={{transform: 'translateX(-100%)'}} className="absolute left-0 top-0 inline-block h-full w-full z-10 bg-bg-100 dark:bg-dark-bg-100"></span> : null
                        }
                    </p>
                </h2>
                <div ref={formRef} className="text-3xl w-full">
                    <ConfirmationForm handleConfirmation={handleConfirmation} />
                </div>
                {
                    isNotGroup ? <p ref={lastUpdatedRef} className="text-xs font-normal mt-16">
                        {
                            item.confirmed ? (item.lastConfirmed ? `Presença confirmada pela última vez em ${item.lastConfirmed.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}` : null) : (item.lastRevokedConfirmation ? `Confirmação removida pela última vez em ${item.lastRevokedConfirmation.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}` : null)
                        }
                    </p> : null
                }
                <button disabled={disabled} onClick={isNotGroup ? handleClick : () => {}} style={{transform: 'translate(-50%, -60%) scale(0)'}} ref={btnRef} className={`absolute uppercase z-10 text-xs font-bold border backdrop-blur-md border-dark-bg-300/50 rounded-full w-[150px] h-[150px] dark:border-bg-300/50 ${isTouchBased ? 'hidden' : ''}`}>
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