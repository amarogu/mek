import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState, useEffect } from "react" // import useState and useEffect
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GustavoAmaro from '../../public/gustavo_amaro_image.png';
import Image from "next/image";
import ContactField from "./ContactField";
import ArrowFoward from "../../public/arrow_forward.svg";
import { useSpring, animated, useChain, useSpringRef } from "@react-spring/web";

interface ContactFieldProps {
    id: string;
    title: string;
    description: string;
}

export default function Contact() {

    const getInTouch = useRef<any>(null);
    const data = useRef<any>(null);
    const container = useRef<any>(null);
    const send = useRef<any>(null);
    const arrowSecond = useSpringRef();
    const arrowThird = useSpringRef();

    const [isHovering, setIsHovering] = useState(false);

    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setContainerHeight(entry.contentRect.height);
            }
        });
    
        if (container.current) {
            resizeObserver.observe(container.current);
        }
    
        // Cleanup function to disconnect the observer when the component unmounts
        return () => {
            resizeObserver.disconnect();
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount
    

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
            description: 'Hi Gustavo, so I needed your help with...'
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
                end: 'bottom top',
                scrub: true,
                pin: true,
                pinSpacing: false
            }
        });

        const handleMouseEnter = () => {
            setIsHovering(true);
        }

        const handleMouseLeave = () => {
            setIsHovering(false);
        }

        send.current.addEventListener('mouseenter', handleMouseEnter);
        send.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            send.current.removeEventListener('mouseenter', handleMouseEnter);
            send.current.removeEventListener('mouseleave', handleMouseLeave);
        }
    }, [])

    const arrowSecondSpring = useSpring({
        ref: arrowSecond,
        transform: isHovering ? "translateX(-100%)" : "translateX(0%)",
        opacity: isHovering ? 0 : 0.75,
        config: {
            mass: 1,
            tension: 180,
            friction: 12
        }
    });

    const arrowThirdSpring = useSpring({
        ref: arrowThird,
        transform: isHovering ? "translateX(-200%)" : "translateX(0%)",
        opacity: isHovering ? 0 : 0.5,
        config: {
            mass: 1,
            tension: 180,
            friction: 12
        }
    });

    useChain([arrowSecond, arrowThird], [0, 0.2]);

    return (
        <section id="contact" className="px-8 relative container mx-auto" style={{ height: `${containerHeight * 2 + 200}px` }}>
            <div ref={container}>
                <div ref={getInTouch} className="w-fit flex">
                    <h2 className={`text-[12.5rem] text-nowrap leading-none`}>Need to get in touch?</h2>
                    <h2 className={`text-[12.5rem] text-nowrap leading-none`}> - Need to get in touch?</h2>
                </div>
                <div ref={data} className="grid grid-cols-1 lg:gap-x-12 lg:grid-cols-2 pt-24 gap-y-12">
                    <div className="flex-col">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex gap-9 items-center">
                                <Image src={GustavoAmaro} alt="Image of Gustavo in a warm colored background" className="rounded-full w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24" />
                                <div className="flex flex-col gap-4">
                                    <p className="text-4xl xl:text-5xl">Let&apos;s work together!</p>
                                    <p className="text-2xl hidden lg:block">What do you have in mind for your next project?</p>
                                </div>
                            </div>
                            <p className="text-2xl lg:hidden">What do you have in mind for your next project?</p>
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
                            <div key={i} className={`border-text-200 ${i === 0 ? 'border-y py-12' : 'border-b pb-12'} lg:col-span-2`}>
                                <ContactField id={field.id} title={field.title} description={field.description} className={``} isTextBox={i === contactFields.length - 1 ? true : false} />
                            </div>
                        )
                    })}
                    <button ref={send} className="lg:col-span-2 w-fit">
                        <div className="flex text-7xl lg:text-[155px] gap-4 w-fit items-center">
                            <p className="uppercase text-left">Send</p>
                            <div className="flex gap-1 items-center">
                                <Image src={ArrowFoward} className="w-16 h-16 lg:w-24 lg:h-24" alt="Arrow pointing to the right" />
                                <animated.div style={{...arrowSecondSpring}}>
                                    <Image src={ArrowFoward} className="w-14 h-14 lg:w-20 lg:h-20 opacity-75" alt="Arrow pointing to the right" />
                                </animated.div>
                                <animated.div style={{...arrowThirdSpring}}>
                                    <Image src={ArrowFoward} className="w-12 h-12 lg:w-16 lg:h-16 opacity-50" alt="Arrow pointing to the right" />
                                </animated.div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}