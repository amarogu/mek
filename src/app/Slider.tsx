import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

interface SliderProps {
    open: boolean;
}

export default function Slider({open}: SliderProps) {

    const aside = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({});
        if (open) {
            tl.to(aside.current, {
                height: '100%',
                duration: 0.3,
            }).to('.i', {
                y: '-100%',
                stagger: 0.1,
            })
        } else {
            tl.to('.i', {
                y: '0%',
                stagger: 0.1,
            }).to(aside.current, {
                height: '0%',
                duration: 0.3,
            })
        }
    }, [open])

    const data = ['casal', 'festa', 'galeria', 'recados', 'presentes']

    return (
        <aside ref={aside} style={{height: '0%'}} className={`fixed bottom-0 flex flex-col justify-end w-full dark:bg-dark-bg-200 bg-bg-200 overflow-hidden`}>
            <ul className="flex text-3xl flex-col p-8 gap-4">
                {data.map(((item, i) => {
                    return (
                        <li key={i}><button className="uppercase overflow-hidden relative"><span>{item}</span><div className="dark:bg-dark-bg-200 i top-0 left-0 h-9 bg-bg-200 w-full absolute"></div></button></li>
                    )
                }))}
            </ul>
        </aside>
    )
}