import { useContext, useRef, useState } from "react"
import Context from "./Context"
import Click from '../../public/left_click.svg';
import ClickDark from '../../public/left_click_dark.svg';
import ThemeImage from "./ThemeImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ConfirmationForm() {

    const { item } = useContext(Context);

    if (!item || !('users' in item)) {
        return null;
    }

    const fadingFactor = (i: number, max = 0.5, decrement = 0.125) => {
        return Math.max(max, 1 - decrement * i);
    }

    const container = useRef(null);

    const h2Refs = useRef<(HTMLHeadingElement | null)[]>([]);

    const tl = useRef<GSAPTimeline | null>();

    useGSAP(() => {
        /*ScrollTrigger.create({
            trigger: container.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: true,
            pin: true,
            pinSpacing: false,
        });*/

        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                markers: true,
                pin: true,
                pinSpacing: false,
            }
        })

        tl.current.to(h2Refs.current[0], {
            opacity: 0,
        }).add([
            gsap.to(h2Refs.current[1], {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: 'blur(0px)'
            }),
            gsap.to(h2Refs.current[2], {
                scale: fadingFactor(1),
                opacity: fadingFactor(1, 0, 0.4),
                y: '-55%',
                filter: `blur(${1.5}px)`,
            }),
            gsap.to(h2Refs.current[3], {
                scale: fadingFactor(2),
                opacity: fadingFactor(2, 0, 0.4),
                y: '-110%',
                filter: `blur(${3}px)`
            })
        ]).to(h2Refs.current[1], {
            opacity: 0,
        }).add([
            gsap.to(h2Refs.current[2], {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: 'blur(0px)'
            }),
            gsap.to(h2Refs.current[3], {
                scale: fadingFactor(1),
                opacity: fadingFactor(1, 0, 0.4),
                y: '-55%',
                filter: `blur(${1.5}px)`,
            }),
            gsap.to(h2Refs.current[4], {
                scale: fadingFactor(2),
                opacity: fadingFactor(2, 0, 0.4),
                y: '-110%',
                filter: `blur(${3}px)`
            })
        ]).to(h2Refs.current[2], {
            opacity: 0
        }).add([
            gsap.to(h2Refs.current[3], {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: 'blur(0px)'
            }),
            gsap.to(h2Refs.current[4], {
                scale: fadingFactor(1),
                opacity: fadingFactor(1, 0, 0.4),
                y: '-55%',
                filter: `blur(${1.5}px)`,
            }),
            gsap.to(h2Refs.current[5], {
                scale: fadingFactor(2),
                opacity: fadingFactor(2, 0, 0.4),
                y: '-110%',
                filter: `blur(${3}px)`
            })
        ]).to(h2Refs.current[3], {
            opacity: 0
        }).add([
            gsap.to(h2Refs.current[4], {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: 'blur(0px)'
            }),
            gsap.to(h2Refs.current[5], {
                scale: fadingFactor(1),
                opacity: fadingFactor(1, 0, 0.4),
                y: '-55%',
                filter: `blur(${1.5}px)`,
            }),
            gsap.to(h2Refs.current[6], {
                scale: fadingFactor(2),
                opacity: fadingFactor(2, 0, 0.4),
                y: '-110%',
                filter: `blur(${3}px)`
            })
        ]).to(h2Refs.current[4], {
            opacity: 0
        }).add([
            gsap.to(h2Refs.current[5], {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: 'blur(0px)'
            }),
            gsap.to(h2Refs.current[6], {
                scale: fadingFactor(1),
                opacity: fadingFactor(1, 0, 0.4),
                y: '-55%',
                filter: `blur(${1.5}px)`,
            }),
        ]).to(h2Refs.current[5], {
            opacity: 0
        }).add(gsap.to(h2Refs.current[6], {
            scale: 1,
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
        }));
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