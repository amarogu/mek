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

    const igs = [['maria', 'https://www.instagram.com/mariaisabel_amaro/'], ['kalil', 'https://www.instagram.com/kalilalvess/']]

    return (
        <aside ref={aside} style={{height: '0%'}} className={`fixed bottom-0 flex flex-col justify-end w-full dark:bg-dark-bg-200 bg-bg-200 overflow-hidden`}>
            <ul className="flex flex-col p-8 gap-4">
                {data.map(((item, i) => {
                    return (<li key={i}><button className="uppercase text-3xl overflow-hidden relative"><span className="font-extrabold">{item}</span><div className="dark:bg-dark-bg-200 i top-0 left-0 h-9 bg-bg-200 w-full absolute"></div></button></li>)
                }))}
                <div className="flex items-center gap-4">
                    <li><a target="_blank" className="inline-block relative overflow-hidden" href={igs[0][1]}><span className="font-extrabold text-[0.625rem] uppercase">Instagram de {igs[0][0]}</span><div className="dark:bg-dark-bg-200 i top-0 left-0 h-6 bg-bg-200 w-full absolute"></div></a></li>
                    <div className="relative flex items-center w-5">
                        <span className="w-5 inline-block bg-text-100 dark:bg-dark-text-100 h-[1px]"></span>
                        <div className="dark:bg-dark-bg-200 i top-0 left-0 h-[1px] bg-bg-200 w-full absolute"></div>
                    </div>
                    <li><a target="_blank" className="inline-block relative overflow-hidden" href={igs[1][1]}><span className="font-extrabold text-[0.625rem] uppercase">Instagram de {igs[1][0]}</span><div className="dark:bg-dark-bg-200 i top-0 left-0 h-6 bg-bg-200 w-full absolute"></div></a></li>
                </div>
            </ul>
        </aside>
    )
}