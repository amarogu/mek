import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState, useEffect } from "react" // import useState and useEffect
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GustavoAmaro from '../../public/gustavo_amaro_image.png';
import Image from "next/image";

interface ContactFieldProps {
    id: string;
    title: string;
    description: string;
}

export default function Contact() {

    const getInTouch = useRef<any>(null);
    const data = useRef<any>(null);

    // State to store the current time
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }));

    const contactFields: ContactFieldProps[] = [
        {
            id: '01',
            title: 'Please insert your name',
            description: 'Johnny...'
        },
        {
            id: '02',
            title: 'Please type your email address',
            description: 'johnny@...'
        },
        {
            id: '03',
            title: 'Your organization',
            description: 'Johnny Inc.'
        },
        {
            id: '04',
            title: 'What service do you need?',
            description: 'Website, web app, iOS platform...'
        },
        {
            id: '05',
            title: 'Leave your message',
            description: 'Hi Gustavo, so I wanted you to develop a...'
        }
    ]

    // Effect to update the time every minute
    useEffect(() => {

        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }));
        }, 60000); // 60000 milliseconds = 1 minute

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, []);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(getInTouch.current, {
            x: '-100%',
            scrollTrigger: {
                trigger: getInTouch.current,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: true,
            }
        })
    }, [])

    return (
        <section className="px-8 container mx-auto">
            <div className="w-fit">
                <h2 ref={getInTouch} className={`sm:text-[12.5rem] text-9xl text-nowrap leading-none`}>Need to get in touch?</h2>
            </div>
            <div ref={data} className="grid grid-cols-2 pt-24 gap-y-12">
                <div className="flex col-span-2 gap-9 items-center">
                    <Image src={GustavoAmaro} alt="Image of Gustavo in a warm colored background" className="rounded-full w-16 h-16" />
                    <p className="text-4xl">Let&apos;s work together!</p>
                </div>
                <div className="flex flex-col gap-12 col-span-2 text-2xl">
                    <div className="flex flex-col gap-6">
                        <p className="text-xl">Contact details</p>
                        <p>info@gustavoamaro.com</p>
                        <p>+55 (19) 996698631</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <p className="text-xl">Location and time</p>
                        <p>Brazil, SP</p>
                        <p>{time}</p> {/* Display the current time */}
                    </div>
                </div>
            </div>
        </section>
    )
}