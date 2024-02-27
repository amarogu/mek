import Image from 'next/image';
import ArrowDownward from '../../../public/arrow_downward.svg';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type getDictionary } from '@/dictionaries';

export default function ProjectsIntro({ dict } : {dict: Awaited<ReturnType<typeof getDictionary>>["home"]["about"]["projects"]}) {

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
                <h2 className={`text-5xl`}>{dict.title}</h2>
                <div ref={ref} style={{opacity: 0, transform: 'translateY(-25px)'}} className="flex gap-3">
                    <Image src={ArrowDownward} alt="Arrow Downward" />
                    <p className='text-2xl uppercase'>{dict.scroll}</p>
                </div>
                <p className='text-3xl'>{dict.desc}</p>
            </div>
        </section>
    )
}