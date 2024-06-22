import { TouchEvent, useContext, useRef, useState } from "react"
import Context from "./Context"
import Click from '../../public/left_click.svg';
import ClickDark from '../../public/left_click_dark.svg';
import ThemeImage from "./ThemeImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { calculateConfirmationFormHeight } from "@/lib/helpers";

export default function ConfirmationForm() {

    const { item } = useContext(Context);

    if (!item || !('users' in item)) {
        return null;
    }

    const [users, setUsers] = useState(item.users.toSorted((a, b) => b.name.length - a.name.length));

    const fadingFactor = (i: number, max = 0.5, decrement = 0.125) => {
        return Math.max(max, 1 - decrement * i);
    }

    const container = useRef(null);

    const h2Refs = useRef<(HTMLHeadingElement | null)[]>([]);

    const tl = useRef<GSAPTimeline | null>();

    const containerHeight = calculateConfirmationFormHeight(item.users.length);

    useGSAP(() => {
        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                pin: true,
                pinSpacing: false,
            }
        });

        for (let i = 0; i < h2Refs.current.length - 1; i++) {
            tl.current.to(h2Refs.current[i], {
                opacity: 0,
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

    const renderConfirmationPanel = () => {
        if ('users' in item) {
            return (
                <div className="flex relative flex-col gap-4">
                    {
                        item.users.toSorted((a, b) => b.name.length - a.name.length).map((u, i) => {
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

    const handleDoubleClick = () => {
        if (h2Refs.current) {
            h2Refs.current.forEach(h2 => {
                if (h2?.computedStyleMap().get('scale') === 1) {
                    console.log(h2.textContent)
                }
            })
        }
    }

    let doubleTapped = false;

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        if (!doubleTapped) {
            doubleTapped = true;
            setTimeout(() => {
                doubleTapped = false
            }, 300);
            return false;
        }
        
        if (h2Refs.current) {
            h2Refs.current.forEach(h2 => {
                if (h2) {
                    const transforms = h2.attributeStyleMap.getAll('transform');
                    const opacity = h2.computedStyleMap().get('opacity');
                    if (transforms.length === 0 && (opacity && parseFloat(opacity.toString()))) {
                        console.log(h2.textContent)
                    } else {
                        transforms.forEach(t => {
                            const tString = t.toString();
                            const scaleMatches = tString.match(/scale\(([^)]+)\)/);
                            const scaleValue = scaleMatches ? parseFloat(scaleMatches[1]) : null;
                            if ((opacity && parseFloat(opacity.toString())) && (!t || !tString.includes('scale') || (scaleValue && scaleValue > 0.9))) {
                                console.log(h2.textContent);
                            }
                        });
                    }
                }
            })
        }
    }

    return (
        <div ref={container} style={{height: `${containerHeight}vh`}} className="static z-20 bg-dark-text-100 dark:bg-text-100">
            <div onDoubleClickCapture={handleDoubleClick} onTouchStartCapture={e => {handleTouchStart(e)}} className="relative touch-none flex items-center justify-center h-screen">
                <form className="flex flex-col gap-4">
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