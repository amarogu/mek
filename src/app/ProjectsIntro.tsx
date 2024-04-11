import Image from 'next/image';
import ArrowDownward from '../../public/arrow_downward.svg';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({weight: '400', subsets: ['latin']})

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
        <section className="pt-16 flex flex-col justify-center">
            <div className='border-t-2 border-text-200 pt-5 flex flex-col gap-6'>
                <h2 className={`text-5xl ${cormorant.className}`}>Galeria</h2>
                <div ref={ref} style={{opacity: 0, transform: 'translateY(-25px)'}} className="flex gap-3">
                    <Image src={ArrowDownward} alt="Arrow Downward" />
                    <p className='text-2xl uppercase'>continue</p>
                </div>
                <p className='text-3xl'>Veja um pouquinho mais sobre a gente e sobre a nossa história. Texto muito legal por favor.</p>
            </div>
        </section>
    )
}