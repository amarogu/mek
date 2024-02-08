import { useRef } from 'react';
import ArrowForward from '../../public/arrow_forward.svg';
import GustavoAmaro from '../../public/gustavo_amaro.svg';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from 'react-responsive';

export default function Hero() {

    const isHighEnough = useMediaQuery({minHeight: 600});

    const sub = useRef<HTMLDivElement>(null);
    const amaro = useRef<HTMLImageElement>(null);

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

    return (
        <section id="hero" className="flex min-h-[600px] flex-col gap-24 h-[calc(100svh-84px)] items-center sm:items-start justify-center px-8">
            <div className='flex flex-col gap-4'>
                <h1 className={`${isHighEnough ? "text-5xl" : "text-3xl"}`}>
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
                <div ref={sub} style={{transform: 'translateX(-100px)', opacity: 0}} className='flex gap-4'>
                    <Image src={ArrowForward} alt="Arrow Forward" />
                    <p className={`underline ${isHighEnough ? "text-2xl" : "text-xl"}`}>Check my projects</p>
                </div>
            </div>
            <div className='relative'>
                <div ref={amaro} style={{transform: 'translateX(0%)'}} className='h-full w-full absolute top-0 left-0 bg-bg-100'></div>
                <Image src={GustavoAmaro} alt="Gustavo Amaro" />
            </div>
        </section>
    )
}