import { useContext, useRef, useState } from "react"
import Context from "./Context"
import Click from '../../public/left_click.svg';
import ClickDark from '../../public/left_click_dark.svg';
import ThemeImage from "./ThemeImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ConfirmationForm() {

    const { item } = useContext(Context);

    if (!item) {
        return null;
    }

    const fadingFactor = (i: number, max = 0.5, decrement = 0.125) => {
        return Math.max(max, 1 - decrement * i);
    }

    const container = useRef(null);

    const h2Refs = useRef<(HTMLHeadingElement | null)[]>([]);

    const tl = useRef<GSAPTimeline | null>();

    useGSAP(() => {
        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                markers: true,
                pin: true,
                pinSpacing: false
            }
        });

        let localIndex = 0;

        h2Refs.current.forEach((h2, i, arr) => {
            if (h2 && tl.current) {
                for (let j = i; j < arr.length && !(j < 0); j--) {
                    console.log(j);
                    if (j === 0) {
                        tl.current.add(gsap.to(h2, {
                            opacity: 0,
                            ease: 'power1.inOut',
                        }));
                    } else {
                        tl.current.add(gsap.to(h2, {
                            y: -55 * (j - 1),
                            scale: j === 0 ? 1 : fadingFactor(j - 1),
                            opacity: j === 0 ? 1 : fadingFactor(j - 1, 0, 0.4),
                            filter: `blur(${1.5 * (j - 1)}px)`,
                            ease: 'power1.inOut',
                        }));
                    }
                }
                
            }
        });
        console.log(tl.current.getChildren());
    })

    const renderConfirmationPanel = () => {
        if ('users' in item) {
            return (
                <div className="flex relative flex-col gap-4">
                    {
                        item.users.sort((a, b) => b.name.length - a.name.length).map((u, i) => {
                            return (
                                <h2 ref={el => {
                                    if (el !== null) {
                                        h2Refs.current[i] = el;
                                    }
                                }} className={`${i === 0 ? '' : 'absolute left-1/2'}`} style={{transform: i !== 0 ? `translateX(-50%) scale(${fadingFactor(i)}) translateY(${-55 * i}%)` : '', opacity: i !== 0 ? `${fadingFactor(i, 0, 0.4)}` : '', filter: i !== 0 ? `blur(${1.5 * i}px)` : ''}} key={i}>{u.name}</h2>
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

    return (
        <div ref={container} className="h-[1500vh] static z-20 bg-dark-text-100 dark:bg-text-100">
            <div className="relative flex items-center justify-center h-screen">
                <form className="flex flex-col gap-4">
                    <div className="uppercase text-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
                        {
                        renderConfirmationPanel()  
                        }
                    </div>
                    <div className="flex gap-4 font-semibold items-center">
                        <ThemeImage loading="eager" srcDark={ClickDark} srcLight={Click} alt="Duplo-clique para confirmar" />
                        <p>Duplo-clique para confirmar</p>
                    </div>
                </form>
            </div>
        </div>
    )
}