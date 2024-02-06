import Image from 'next/image';
import GustavoAmaro from '../../public/gustavo_amaro_image.png';
import ArrowUpward from '../../public/arrow_upward.svg';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {

    const image = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top',
                end: '+=300px',
                scrub: true,
            }
        });
        tl.from(image.current, {clipPath: 'inset(15%)'}).to(image.current, {clipPath: 'inset(0%)'});
    }, []);

    return (
        <section className='flex flex-col justify-center gap-8 h-[calc(100vh-84px)] min-h-[824px] px-8'>
            <Image ref={image} src={GustavoAmaro} alt="Gustavo Amaro" />
            <div className='flex flex-col gap-4'>
                <div className='flex text-2xl gap-3'>
                    <p>That's me</p>
                    <Image src={ArrowUpward} alt="Arrow Upward" />
                </div>
                <p className='text-3xl'>
                    I've been developing and designing since 2020, where I <span className='font-bold'>graduated</span>, three years later, as a systems developer. Let's jump right into the projects I have already worked on!
                </p>
            </div>
        </section>
    )
}