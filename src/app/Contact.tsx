import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState, useEffect } from "react" // import useState and useEffect
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GustavoAmaro from '../../public/gustavo_amaro_image.png';
import Image from "next/image";

export default function Contact() {

    const getInTouch = useRef<any>(null);

    // State to store the current time
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // Effect to update the time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 60000); // 60000 milliseconds = 1 minute

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timer);
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
                <h2 ref={getInTouch} className={`text-[12.5rem] text-nowrap leading-none`}>Need to get in touch?</h2>
            </div>
            <div className="grid grid-cols-2 gap-y-12">
                <div className="flex col-span-2 gap-9 items-center">
                    <Image src={GustavoAmaro} alt="Image of Gustavo in a warm colored background" className="rounded-full w-16 h-16" />
                    <p className="text-4xl">Let&apos;s work together!</p>
                </div>
                <div className="flex flex-col col-span-2 text-2xl">
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