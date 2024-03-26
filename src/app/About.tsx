'use client';
import Image from 'next/image';
import MeK from '../../public/mek_about.png';
import ArrowUpward from '../../public/arrow_upward.svg';
import ArrowBackward from '../../public/arrow_back.svg';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectsIntro from './ProjectsIntro';
import { useMediaQuery } from 'react-responsive';
//

export default function About() {

    const isLgScreen = useMediaQuery({minWidth: 768});
    const [isLgScreenState, setIsLgScreen] = useState(false);

    useEffect(() => {
        setIsLgScreen(isLgScreen);
    }, [isLgScreen]);

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
        gsap.to('.about-me', {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: '.about-me-container',
                start: 'top bottom',
                end: 'bottom 70%',
                scrub: true,
            }
        });
    }, [])

    return (
        <section className='flex flex-col container mx-auto md:flex-row justify-between gap-8 py-24 px-8'>
            <Image ref={ref} src={MeK} className={`md:object-cover md:object-[25%]`} style={{clipPath: 'inset(30%)'}} alt="Gustavo Amaro" />
            <div className='lg:w-1/2'>
                <div className='flex flex-col gap-6'>
                    <div className='flex text-2xl gap-3'>
                        <p>Nós</p>
                        {isLgScreenState ? <Image src={ArrowBackward} className='-order-1' alt="Arrow Backward" /> : <Image src={ArrowUpward} alt="Arrow Backward" />}
                    </div>
                    <p className='text-3xl about-me-container'>
                        {Array.from('Nos conhecemos em 2020, nos apaixonamos de primeira. O pedido rolou um dia depois do primeiro olhar, dá para acreditar?! Quem quiser saber mais, dá um toque tá bom, corram. É isso gente.').map((char, index) => (
                            <span className='about-me' style={{opacity: 0}} key={index}>{char}</span>
                        ))}
                    </p>
                </div>
                <ProjectsIntro />
            </div>
        </section>
    )
}