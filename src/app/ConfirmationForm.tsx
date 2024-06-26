import { CSSProperties, TouchEvent, useContext, useEffect, useRef, useState } from "react"
import Context from "./Context"
import Click from '../../public/left_click.svg';
import ClickDark from '../../public/left_click_dark.svg';
import ThemeImage from "./ThemeImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LeanDocument, calculateConfirmationFormHeight } from "@/lib/helpers";
import instance from "@/lib/axios";
import Check from '../../public/check_circle_neutral.svg';
import CheckDark from '../../public/check_circle_neutral_dark.svg';
import Image from "next/image";
import { IUser } from "@/lib/Models/Interfaces";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    const {contextSafe} = useGSAP(() => {

        tl.current = gsap.timeline({
            id: 'tl',
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                pin: true,
                pinSpacing: false,
                markers: true
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
                    filter: 'blur(0px)',
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
    });

    const usersContainer = useRef<HTMLDivElement>(null);

    const renderConfirmationPanel = () => {
        if ('users' in item) {
            return (
                <div ref={usersContainer} className="flex relative flex-col gap-4">
                    {
                        users.map((u, i) => {
                            return (
                                <div ref={el => {
                                    if (el !== null) {
                                        h2Refs.current[i] = el;
                                    }
                                }} className={`${i === 0 ? 'relative' : 'absolute left-1/2'} flex gap-4 justify-center items-center`} style={{transform: i !== 0 ? `translateX(-50%) scale(${fadingFactor(i)}) translateY(${-55 * i}%)` : '', opacity: i !== 0 ? `${fadingFactor(i, 0, 0.4)}` : '', filter: i !== 0 ? `blur(${1.5 * i}px)` : '', zIndex: users.length - i} as CSSProperties} key={i}>
                                    <Image width={38} height={38} alt="Ícone de confirmação" src={isDarkMode ? CheckDark : Check} loading="eager" style={{display: initialConfirmedUsers[i] ? 'block' : 'none'}} />
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

    let doubleTapped = false;

    const handleConfirmation = async (confirmed: boolean, _id: string) => {
        await instance.post('/confirm', {
            confirmed, _id
        });
    }

    const confirmationTl = useRef<GSAPTimeline>();

    const pulse = contextSafe((el: HTMLHeadingElement, confirmed: boolean, i: number) => {
        const img = el.firstChild as HTMLImageElement;
        if (confirmationTl.current) {
            confirmationTl.current.kill();
        }
        if (usersContainer.current && tl.current) {
                tl.current.pause();
            
           
                confirmationTl.current = gsap.timeline({onComplete: () => {tl.current?.resume()}}).to(el, {opacity: 0}).add([
                    gsap.to(el, {opacity: 1}),
                    gsap.set(img, {display: confirmed ? 'block' : 'none'})
                ]);
            
        }
    })

    const handleDoubleClickCapture = () => {
        if (h2Refs.current) {
            users.forEach(async (u, i) => {
                const h2 = h2Refs.current[i];
                if (h2) {
                    const transform = h2.computedStyleMap().get('transform');
                    const opacityStyle = h2.computedStyleMap().get('opacity');
                    if (transform && opacityStyle) {
                        const opacity = parseFloat(opacityStyle.toString());
                        const isScaled = transform.toString().includes('scale');
                        if (opacity === 1 && !isScaled) {
                            pulse(h2, !u.confirmed, i);
                        }
                    } else if (opacityStyle) {
                        const opacity = parseFloat(opacityStyle.toString());
                        if (opacity === 1) {
                            pulse(h2, !u.confirmed, i);
                        }
                    }
                    
                }
            })
        }
    }

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        if (!doubleTapped) {
            doubleTapped = true;
            setTimeout(() => {
                doubleTapped = false
            }, 300);
            return false;
        }

        if (h2Refs.current) {
            users.forEach(async (u, i) => {
                const h2 = h2Refs.current[i];
                if (h2) {
                    const transform = h2.computedStyleMap().get('transform');
                    const opacityStyle = h2.computedStyleMap().get('opacity');
                    if (transform && opacityStyle) {
                        const opacity = parseFloat(opacityStyle.toString());
                        const isScaled = transform.toString().includes('scale');
                        if (opacity === 1 && !isScaled) {
                            pulse(h2, !u.confirmed, i);
                        }
                    } else if (opacityStyle) {
                        const opacity = parseFloat(opacityStyle.toString());
                        if (opacity === 1) {
                            pulse(h2, !u.confirmed, i);
                        }
                    }
                    
                }
            })
        }
        
        /*if (h2Refs.current) {
            users.forEach(async (u, i) => {
                const h2 = h2Refs.current[i];
                if (h2) {
                    const transforms = h2.attributeStyleMap.getAll('transform');
                    const opacity = h2.computedStyleMap().get('opacity');
                    if (transforms.length === 0 && (opacity && (parseFloat(opacity.toString()) === 1))) {
                        await handleConfirmation(!u.confirmed, u._id);
                        pulse(h2, !u.confirmed, i);
                        setUsers(users.map((user, index) => index === i ? {...user, confirmed: !user.confirmed} : user));
                        
                        console.log(h2.textContent);
                    } else {
                        transforms.forEach(async (t) => {
                            const tString = t.toString();
                            const scaleMatches = tString.match(/scale\(([^)]+)\)/);
                            const scaleValue = scaleMatches ? parseFloat(scaleMatches[1]) : null;
                            if ((opacity && (parseFloat(opacity.toString()) === 1)) && (!t || !tString.includes('scale') || (scaleValue && scaleValue > 0.9))) {
                                await handleConfirmation(!u.confirmed, u._id);
                                pulse(h2, !u.confirmed, i);
                                setUsers(users.map((user, index) => index === i ? {...user, confirmed: !user.confirmed} : user));
                                
                                console.log(h2.textContent);
                            }
                        });
                    }
                }
            })
        }*/
    }

    return (
        <div ref={container} style={{height: `${containerHeight}vh`}} className="static z-20 bg-dark-text-100 dark:bg-text-100">
            <div onDoubleClickCapture={handleDoubleClickCapture} onTouchStartCapture={e => {handleTouchStart(e)}} className="relative flex items-center justify-center h-screen">
                <form className="flex flex-col items-center gap-4">
                    <div className="uppercase text-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
                        {
                            renderConfirmationPanel()  
                        }
                    </div>
                    <div className="flex gap-4 font-semibold justify-center items-center">
                        <ThemeImage loading="eager" srcDark={ClickDark} srcLight={Click} alt="Duplo-clique para confirmar" />
                        <p>Duplo-clique para confirmar</p>
                    </div>
                </form>
            </div>
        </div>
    )
}