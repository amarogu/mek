'use client';
import { useRef, useEffect, useState } from 'react';
import ArrowForward from '../../public/arrow_forward.svg';
import GustavoAmaro from '../../public/gustavo_amaro.svg';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from 'react-responsive';
import GustavoAmaroDesktop from '../../public/gustavo_amaro_desktop.svg';
import { useLenis } from '@studio-freight/react-lenis';

export default function Hero() {

    const lenis = useLenis(({scroll}) => {});

    const [isHighEnoughState, setIsHighEnough] = useState(false);
    const [isMediumScreenState, setIsMediumScreen] = useState(false);
    const isHighEnough = useMediaQuery({query: '(min-height: 700px)'});
    const isMediumScreen = useMediaQuery({query: '(min-width: 768px)'});

    useEffect(() => {
        setIsHighEnough(isHighEnough);
        setIsMediumScreen(isMediumScreen);
    }, [isHighEnough, isMediumScreen]);

    const sub = useRef<HTMLDivElement>(null);
    const amaro = useRef<HTMLImageElement>(null);
    const subButton = useRef<HTMLButtonElement>(null);
    const subButtonUnder = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({});
        tl.to('.key', {
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
        }).to(sub.current, {
            x: "0px",
            opacity: 1,
        }, '<75%').to(amaro.current, {
            x: '100%',
        }, '<75%');
    }, [])

    const handleMouseEnter = () => {
        gsap.to(subButton.current, {
            y: '-100%',
            opacity: 0,
        });
        gsap.to(subButtonUnder.current, {
            y: '0%',
            opacity: 1,
        });
    }

    const handleMouseLeave = () => {
        gsap.to(subButton.current, {
            y: '0%',
            opacity: 1,
        });
        gsap.to(subButtonUnder.current, {
            y: '100%',
            opacity: 0,
        });
    }

    return (
        <section id="hero" className="flex min-h-[600px] flex-col gap-24 h-[calc(100svh-84px)] items-start justify-center px-8">
            <div className='flex flex-col gap-4 mx-auto'>
                <h1 className={`${isHighEnoughState ? "text-5xl" : "text-3xl"} sm:max-w-[614px]`}>
                    {
                    [
                        "H", "i", " ", "e", "v", "e", "r", "y", "o", "n", "e", "!", " ",
                        "I", " ", "a", "m", " ", "a", " ", "s", "o", "f", "t", "w", "a", "r", "e",
                        " ", "e", "n", "g", "i", "n", "e", "e", "r", ",", " ",
                        "d", "e", "s", "i", "g", "n", "e", "r", ",", " ",
                        "a", "n", "d", "...", " ",
                        "h", "m", "m", ",", " ",
                        "a", " ", "c", "o", "o", "l", "-", "s", "t", "u", "f", "f", " ",
                        "m", "a", "k", "e", "r", "."
                    ].map((word, index) => (
                        <span style={{opacity: 0}} className='key' key={index}>{word}</span>
                    ))}
                </h1>
                <div ref={sub} style={{transform: 'translateX(-100px)', opacity: 0}} className='w-fit cursor-pointer h-[32px] overflow-y-hidden' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button ref={subButton} className='flex gap-4 items-center' onClick={() => {lenis?.scrollTo('#projects', {duration: 2})}} >
                        <Image src={ArrowForward} alt="Arrow Forward" />
                        <p className={`underline underline-offset-4 ${isHighEnoughState ? "text-2xl" : "text-xl"}`}>Check my projects</p>
                    </button>
                    <button ref={subButtonUnder} style={{transform: 'translateY(100%)', opacity: 0}} className='flex absolute top-0 gap-4 items-center' onClick={() => {lenis?.scrollTo('#projects', {duration: 2})}} >
                        <Image src={ArrowForward} alt="Arrow Forward" />
                        <p className={`underline underline-offset-4 ${isHighEnoughState ? "text-2xl" : "text-xl"}`}>Check my projects</p>
                    </button>
                </div>
            </div>
            <div className='relative sm:max-w-[614px] sm:mx-auto'>
                <div ref={amaro} style={{transform: 'translateX(0%)'}} className='h-full w-full absolute top-0 left-0 bg-bg-100'></div>
                {isMediumScreenState ? <Image src={GustavoAmaroDesktop} alt="Gustavo Amaro" /> : <Image src={GustavoAmaro} alt="Gustavo Amaro" />}
            </div>
        </section>
    )
}