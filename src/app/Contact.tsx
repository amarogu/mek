import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState, useEffect } from "react" // import useState and useEffect
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GustavoAmaro from '../../public/gustavo_amaro_image.png';
import Image from "next/image";
import ContactField from "./ContactField";

interface ContactFieldProps {
    id: string;
    title: string;
    description: string;
}

export default function Contact() {

    const getInTouch = useRef<any>(null);
    const data = useRef<any>(null);
    const container = useRef<any>(null);

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
            description: 'Website, web app...'
        },
        {
            id: '05',
            title: 'Leave your message',
            description: 'Hi Gustavo, so I...'
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
            x: '-1972.13px',
            scrollTrigger: {
                trigger: container.current,
                start: 'top-=104 top',
                end: 'bottom+=200 top',
                scrub: true,
                pin: true,
                pinSpacing: false,
            }
        });
    }, [])

    return (
        <section className="px-8 h-[1000vh] relative container mx-auto">
            <div ref={container}>
                <div ref={getInTouch} className="w-fit flex">
                    <h2 className={`text-[12.5rem] text-nowrap leading-none`}>Need to get in touch?</h2>
                    <h2 className={`text-[12.5rem] text-nowrap leading-none`}> - Need to get in touch?</h2>
                </div>
                <div ref={data} className="grid grid-cols-1 lg:gap-x-12 lg:grid-cols-2 pt-24 gap-y-12">
                    <div className="flex-col">
                        <div className="flex flex-col gap-4 w-2/3 sm:w-1/2 md:w-full">
                            <div className="flex gap-9 items-center">
                                <Image src={GustavoAmaro} alt="Image of Gustavo in a warm colored background" className="rounded-full w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24" />
                                <p className="text-4xl xl:text-5xl">Let&apos;s work together!</p>
                            </div>
                            <p className="text-2xl">What do you have in mind for your next project?</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex flex-col gap-6 text-2xl lg:text-xl md:col-span-1">
                            <p className="text-xl lg:text-lg">Contact details</p>
                            <p>info@gustavoamaro.com</p>
                            <p>+55 (19) 996698631</p>
                        </div>
                        <div className="flex flex-col gap-6 text-2xl lg:text-xl md:col-span-1">
                            <p className="text-xl lg:text-lg">Location and time</p>
                            <p>Brazil, SP</p>
                            <p>{time}</p> {/* Display the current time */}
                        </div>
                    </div>
                    {contactFields.map((field, i) => {
                        return (
                            <div key={i} className={`border-text-200 ${i === 0 ? 'border-y py-12' : 'border-b pb-12'} ${i === contactFields.length - 1 ? 'lg:row-start-2 lg:row-span-3 lg:col-start-2 lg:border-t lg:pt-12' : ''}`}>
                                <ContactField id={field.id} title={field.title} description={field.description} className={``} isTextBox={i === contactFields.length - 1 ? true : false} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}