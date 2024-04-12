import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

interface SliderProps {
    open: boolean;
}

export default function Slider({open}: SliderProps) {

    useGSAP(() => {
        const tl = gsap.timeline({});
        tl.to('.i', {

        })
    }, [])

    return (
        <aside className={`fixed bottom-0 flex flex-col justify-end w-full dark:bg-dark-bg-200 bg-bg-200 overflow-hidden`}>
            <ul className="flex text-3xl flex-col p-8 gap-4">
                <li><button className="uppercase i"><span>Casal</span><div className="dark:bg-dark-bg-200 bg-bg-200 w-full block h-full"></div></button></li>
                <li><button className="uppercase i">Festa</button></li>
                <li><button className="uppercase i">Galeria</button></li>
                <li><button className="uppercase i">Recados</button></li>
                <li><button className="uppercase i">Presentes</button></li>
            </ul>
        </aside>
    )
}