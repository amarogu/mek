import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { parseNavItem } from "@/lib/helpers";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

interface SliderProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Slider({open, setOpen}: SliderProps) {

    const lenis = useLenis(() => {});

    const aside = useRef<HTMLElement>(null);

    const [clickedItem, setClickedItem] = useState<string | null>(null);

    const tl = useRef<GSAPTimeline | null>();

    useGSAP(() => {
        if (open) {
            tl.current = gsap.timeline().to(aside.current, {
                height: '100%',
                duration: 0.3,
            }).to('.i', {
                y: '-100%',
                stagger: 0.1,
            })
        } else {
            tl.current = gsap.timeline().to('.i', {
                y: '0%',
                stagger: 0.1,
            }).to(aside.current, {
                height: '0%',
                duration: 0.3,
            })
        }
    }, [open]);

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (clickedItem) {
            lenis?.scrollTo(parseNavItem(clickedItem), {immediate: true, offset: offset});
        }
    }, [lenis, clickedItem, offset]);

    useEffect(() => {
        const header = document.getElementById('header');
        if (header) {
            setOffset(-header.clientHeight);
        }
    }, [])

    const data = ['galeria', 'recados', 'presentes', 'confirmar', 'festa']

    const igs = [['maria', 'https://www.instagram.com/mariaisabel_amaro/'], ['kalil', 'https://www.instagram.com/kalilalvess/']]

    return (
        <aside ref={aside} style={{height: '0%'}} className={`fixed z-20 bottom-0 left-0 flex flex-col justify-end w-full dark:bg-dark-bg-200 bg-bg-200 overflow-hidden`}>
            <ul className="flex flex-col p-8 gap-4">
                {data.map(((item, i) => {
                    if (i === 2) {
                        return (
                            <li key={i}>
                                <Link href='https://sites.icasei.com.br/kalilemaria' target="_blank">
                                    <button 
                                        onClick={() => {
                                            setOpen(false); 
                                            setClickedItem(item);
                                            const header = document.getElementById('header');
                                            if (header) {
                                                setOffset(-header.clientHeight);
                                            }
                                        }} 
                                        className="uppercase text-3xl overflow-hidden relative"
                                    >
                                        <span className="font-extrabold">{item}</span>
                                        <div className="dark:bg-dark-bg-200 i top-0 left-0 h-9 bg-bg-200 w-full absolute"></div>
                                    </button>
                                </Link>
                            </li>
                        )
                    } else {
                        return (
                            <li key={i}>
                                <button 
                                    onClick={() => {
                                        setOpen(false); 
                                        setClickedItem(item);
                                        if (i === 4) {
                                            setOffset(0);
                                        } else {
                                            const header = document.getElementById('header');
                                            if (header) {
                                                setOffset(-header.clientHeight);
                                            }
                                        }
                                    }} 
                                    className="uppercase text-3xl overflow-hidden relative"
                                >
                                    <span className="font-extrabold">{item}</span>
                                    <div className="dark:bg-dark-bg-200 i top-0 left-0 h-9 bg-bg-200 w-full absolute"></div>
                                </button>
                            </li>
                        )
                    }
                }))}
                <div className="flex items-center gap-4">
                    <li><a target="_blank" className="inline-block relative overflow-hidden" href={igs[0][1]}><span className="font-extrabold text-[0.625rem] uppercase">@{igs[0][0]}</span><div className="dark:bg-dark-bg-200 i top-0 left-0 h-6 bg-bg-200 w-full absolute"></div></a></li>
                    <div className="relative flex items-center w-5">
                        <span className="w-5 inline-block bg-text-100 dark:bg-dark-text-100 h-[1px]"></span>
                        <div className="dark:bg-dark-bg-200 i top-0 left-0 h-[1px] bg-bg-200 w-full absolute"></div>
                    </div>
                    <li><a target="_blank" className="inline-block relative overflow-hidden" href={igs[1][1]}><span className="font-extrabold text-[0.625rem] uppercase">@{igs[1][0]}</span><div className="dark:bg-dark-bg-200 i top-0 left-0 h-6 bg-bg-200 w-full absolute"></div></a></li>
                </div>
            </ul>
        </aside>
    )
}