import Image from 'next/image';
import ArrowDownward from '../../public/arrow_downward.svg';
import { Cormorant_Garamond } from 'next/font/google';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const cormorantGaramond = Cormorant_Garamond({weight: '400', subsets: ['latin']});

export default function ProjectsIntro() {

    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(ref.current, {
            y: '0px',
            opacity: 1,
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 90%',
                end: 'bottom 80%',
                scrub: true
            },
        })
    }, [])

    return (
        <section className="pt-16 pb-24 flex flex-col justify-center">
            <div className='border-t-2 border-text-200 pt-5 flex flex-col gap-6'>
                <h2 className={`text-6xl ${cormorantGaramond.className}`}>Projects</h2>
                <div ref={ref} style={{opacity: 0, transform: 'translateY(-25px)'}} className="flex gap-3">
                    <Image src={ArrowDownward} alt="Arrow Downward" />
                    <p className='text-2xl uppercase'>Scroll down</p>
                </div>
                <p className='text-3xl'>Below, you will see some projects of mine, that range from websites to iOS applications</p>
            </div>
        </section>
    )
}