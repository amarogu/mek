import { CSSProperties, useContext, useEffect, useRef, useState } from "react"
import Context from "./Context"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LeanDocument, calculateConfirmationFormHeight } from "@/lib/helpers";
import instance from "@/lib/axios";
import Check from '../../public/check_circle_neutral.svg';
import CheckDark from '../../public/check_circle_neutral_dark.svg';
import Image from "next/image";
import { MouseEvent } from "react";
import { IUser } from "@/lib/Models/Interfaces";

export default function ConfirmationForm() {

    const { item, isDarkMode } = useContext(Context);

    if (!item || !('users' in item)) {
        return null;
    }

    const sortedItems = item.users.toSorted((a, b) => b.name.length - a.name.length);

    const initialConfirmedUsers = sortedItems.map(u => u.confirmed);

    const [users, setUsers] = useState(sortedItems);

    const fadingFactor = (i: number, max = 0.5, decrement = 0.125) => {
        return Math.max(max, 1 - decrement * i);
    }

    const container = useRef(null);

    const h2Refs = useRef<(HTMLHeadingElement | null)[]>([]);

    const tl = useRef<GSAPTimeline | null>();

    const containerHeight = calculateConfirmationFormHeight(item.users.length);

    const btnRef = useRef<HTMLButtonElement>(null);

    const [activeUser, setActiveUser] = useState<LeanDocument<IUser> | null>(users[0]);

    const observer = new MutationObserver(list => {
        list.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const t = mutation.target as HTMLHeadingElement;
                const opacityStyle = t.computedStyleMap().get('opacity');
                const transform = t.computedStyleMap().get('transform');

                if (transform && opacityStyle) {
                    const opacity = parseFloat(opacityStyle.toString());
                    const isScaled = transform.toString().includes('scale');
                    if (opacity === 1 && !isScaled) {
                        setActiveUser(users[h2Refs.current.indexOf(t)]);
                    } else if (!isScaled) {
                        setActiveUser(null);
                    }
                }
            }
        })
    });

    useEffect(() => {
        h2Refs.current.forEach(h2 => {
            if (h2) {
                observer.observe(h2, {
                    attributes: true,
                    attributeFilter: ['style']
                });
            }
        });

        return () => {
            observer.disconnect();
        }
    });

    const {contextSafe} = useGSAP((_, contextSafe) => {
        if (contextSafe) {
            tl.current = gsap.timeline({
                id: 'tl',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                    pinSpacing: false
                }
            });
    
            for (let i = 0; i < h2Refs.current.length - 1; i++) {
                tl.current.to(h2Refs.current[i], {
                    opacity: 1,
                }).to(h2Refs.current[i], {
                    opacity: 0,
                    scrollTrigger: {
                        scrub: false
                    }
                }).add([
                    gsap.to(h2Refs.current[i + 1], {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)'
                    }),
                    ...( h2Refs.current[i + 2] ? [ gsap.to(h2Refs.current[i + 2], {
                        scale: fadingFactor(1),
                        opacity: fadingFactor(1, 0, 0.4),
                        y: '-55%',
                        filter: `blur(${1.5}px)`,
                        
                    })] : []),
                    ...( h2Refs.current[i + 3] ? [ gsap.to(h2Refs.current[i + 3], {
                        scale: fadingFactor(2),
                        opacity: fadingFactor(2, 0, 0.4),
                        y: '-110%',
                        filter: `blur(${3}px)`,
                    })] : []),
                ]);
            }
        }
    });

    const usersContainer = useRef<HTMLDivElement>(null);

    const renderConfirmationPanel = () => {
        if ('users' in item) {
            return (
                <div ref={usersContainer} className="relative w-full">
                    {
                        users.map((u, i) => {
                            return (
                                <div ref={el => {
                                    if (el !== null) {
                                        h2Refs.current[i] = el;
                                    }
                                }} className={`absolute left-1/2 flex justify-center w-full gap-4 items-center`} style={{transform: i !== 0 ? `translateX(-50%) scale(${fadingFactor(i)}) translateY(${-55 * i}%)` : 'translateX(-50%)', opacity: i !== 0 ? `${fadingFactor(i, 0, 0.4)}` : '', filter: i !== 0 ? `blur(${1.5 * i}px)` : '', zIndex: users.length - i} as CSSProperties} key={i}>
                                    <Image width={38} height={38} alt="Ícone de confirmação" src={isDarkMode ? CheckDark : Check} loading="eager" className={`${initialConfirmedUsers[i] ? 'opacity-1 relative' : 'opacity-0 absolute'}`} />
                                    <h2>{u.name}</h2>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <h2><button>Clique aqui para confirmar</button></h2>
            )
        }
    }

    const handleConfirmation = async (confirmed: boolean, _id: string) => {
        await instance.post('/confirm', {
            confirmed, _id
        });
    }

    const confirmationTl = useRef<GSAPTimeline>();

    const pulseUser = contextSafe((el: HTMLHeadingElement, confirmed: boolean) => {
        const h2 = el.lastChild as HTMLHeadingElement;
        const img = el.firstChild as HTMLImageElement;
        if (confirmationTl.current) {
            confirmationTl.current.kill();
        }
        confirmationTl.current = gsap.timeline().add([
            gsap.to(h2, {opacity: 0}),
            gsap.to(img, {opacity: 0})
        ]).set(img, {position: confirmed ? 'relative' : 'absolute'}).add([
            gsap.to(h2, {opacity: 1}),
            gsap.to(img, {opacity: confirmed ? 1 : 0})
        ]);
    })

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (activeUser) {
            await handleConfirmation(!activeUser.confirmed, activeUser._id);
            setUsers(users.map(u => u._id === activeUser._id ? {...u, confirmed: !u.confirmed} : u));
            setActiveUser(u => u ? {...u, confirmed: !u.confirmed} : null);
            const user = users.find(u => u._id === activeUser._id);
            if (user) {
                const h2 = h2Refs.current[users.indexOf(user)];
                if (h2) {
                    pulseUser(h2, !activeUser.confirmed);
                }
            }
        }
    }

    const confirmText = ['Confirmar', 'Presença'];
    const removeConfirmationText = ['Remover', 'Confirmação'];

    const confirmTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const removeConfirmationTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    const btnTextTl = useRef<GSAPTimeline | null>();

    useGSAP(() => {
        gsap.to(btnRef.current, {
            opacity: activeUser ? 1 : 0.35
        });

        if (activeUser) {
            if (activeUser.confirmed) {
                btnTextTl.current = gsap.timeline().to(confirmTextRefs.current, {
                    opacity: 0
                }).add([
                    gsap.set(removeConfirmationTextRefs.current, {
                        display: 'block'
                    }),
                    gsap.set(confirmTextRefs.current, {
                        display: 'none'
                    })
                ]).to(removeConfirmationTextRefs.current, {
                    opacity: 1
                });
            } else {
                btnTextTl.current = gsap.timeline().to(removeConfirmationTextRefs.current, {
                    opacity: 0
                }).add([
                    gsap.set(confirmTextRefs.current, {
                        display: 'block'
                    }),
                    gsap.set(removeConfirmationTextRefs.current,  {
                        display: 'none'
                    })
                ]).to(confirmTextRefs.current, {
                    opacity: 1
                });
            }
        }
    }, [activeUser]);

    return (
        <div ref={container} style={{height: `${containerHeight}vh`}} className="static z-20 bg-bg-100 dark:bg-dark-bg-100">
            <div className="relative flex items-center justify-center h-screen">
                <form className="relative w-full">
                    <div className="uppercase text-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
                        {
                            renderConfirmationPanel()  
                        }
                    </div>
                    <button disabled={activeUser ? false : true} ref={btnRef} onClick={(e) => {handleClick(e)}} className="uppercase text-xs absolute right-0 -translate-x-1/4 translate-y-[10%] font-bold border border-dark-bg-300/50 rounded-full w-[150px] h-[150px] dark:border-bg-300/50">
                        {
                            confirmText.map((t, i) => {
                                return (
                                    <p ref={el => {
                                        if (el !== null) {
                                            confirmTextRefs.current[i] = el;
                                        }
                                    }} key={i} className={`${users[0].confirmed ? 'hidden opacity-0' : ''}`}>{t}</p>
                                )
                            })
                        }
                        {
                            removeConfirmationText.map((t, i) => {
                                return (
                                    <p ref={el => {
                                        if (el !== null) {
                                            removeConfirmationTextRefs.current[i] = el;
                                        }
                                    }} key={i} className={`${users[0].confirmed ? '' : 'hidden opacity-0'}`}>{t}</p>
                                )
                            })
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}