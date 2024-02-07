import { useRef } from 'react';
import ArrowForward from '../../public/arrow_forward.svg';
import GustavoAmaro from '../../public/gustavo_amaro.svg';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {

    const sub = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({});
        tl.to('.key', {
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
        }).to(sub.current, {
            y: "0px",
            opacity: 1,
        }, '<=2');
    }, [])

    return (
        <section className="flex min-h-[723px] flex-col gap-24 h-[calc(100vh-84px)] items-center sm:items-start justify-center px-8">
            <div className='flex flex-col gap-4'>
                <h1 className="text-5xl">
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
                <div ref={sub} style={{transform: 'translateY(-100px)', opacity: 0}} className='flex gap-4'>
                    <Image src={ArrowForward} alt="Arrow Forward" />
                    <p className='underline text-2xl'>Check my projects</p>
                </div>
            </div>
            <Image src={GustavoAmaro} alt="Gustavo Amaro" />
        </section>
    )
}