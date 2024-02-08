'use client';
import Image from 'next/image';
import GustavoAmaro from '../../public/gustavo_amaro_image.png';
import ArrowUpward from '../../public/arrow_upward.svg';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectsIntro from './ProjectsIntro';
import { useMediaQuery } from 'react-responsive';

export default function About() {

    const isLgScreen = useMediaQuery({minWidth: 768});

    const ref = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(ref.current, {
            clipPath: 'inset(0%)',
            scrollTrigger: {
                trigger: ref.current,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
            }
        })
    }, [])

    return (
        <section className='flex flex-col container mx-auto md:flex-row justify-between gap-8 pb-24 px-8'>
            <Image ref={ref} src={GustavoAmaro} className={`md:object-cover md:object-[25%]`} style={{clipPath: 'inset(30%)'}} alt="Gustavo Amaro" />
            <div className='lg:w-1/2'>
                <div className='flex flex-col gap-4'>
                    <div className='flex text-2xl gap-3'>
                        <p>That&apos;s me</p>
                        <Image src={ArrowUpward} alt="Arrow Upward" />
                    </div>
                    <p className='text-3xl'>
                        I&apos;ve been developing and designing since 2020, where I <span className='font-bold'>graduated</span>, three years later, as a systems developer. Let&apos;s jump right into the projects I have already worked on!
                    </p>
                </div>
                <ProjectsIntro />
            </div>
        </section>
    )
}