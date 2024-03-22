import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState, useEffect } from "react" // import useState and useEffect
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GustavoAmaro from '../../../public/gustavo_amaro_image.png';
import Image from "next/image";
import ContactField from "./ContactField";
import ArrowFoward from "../../../public/arrow_forward.svg";
import { useSpring, animated, useChain, useSpringRef } from "@react-spring/web";
import Collapsible from "./Collapsible";
import { createPortal } from "react-dom";
import Error from "../../../public/error.svg";
import Success from "../../../public/check_circle.svg";
import axios from "axios";

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

    const [openInvalid, setOpenInvalid] = useState(false);
    const [titleInvalid, setTitleInvalid] = useState('');
    const [iconInvalid, setIconInvalid] = useState<React.ReactElement>();

    const [openValid, setOpenValid] = useState(false);
    const [titleValid, setTitleValid] = useState('');
    const [iconValid, setIconValid] = useState<React.ReactElement>();

    const [openError, setOpenError] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [iconError, setIconError] = useState<React.ReactElement>();

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
            title: 'any',
            description: 'any'
        },
        {
            id: '02',
            title: 'any',
            description: 'any'
        },
        {
            id: '03',
            title: 'any',
            description: 'any'
        },
        {
            id: '04',
            title: 'any',
            description: 'any'
        },
        {
            id: '05',
            title: 'any',
            description: 'any'
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
        ScrollTrigger.config({
            ignoreMobileResize: true,
        });
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(getInTouch.current, {
            x: '-50%',
            scrollTrigger: {
                trigger: container.current,
                start: 'top-=104 top',
                end: 'bottom top',
                scrub: true,
                pin: true,
                pinSpacing: false,
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

    const [inputValues, setInputValues] = useState({
        '01': '',
        '02': '',
        '03': '',
        '04': '',
        '05': ''
    });

    const handleInputChange = (id: string, newValue: string) => {
        setInputValues({...inputValues, [id]: newValue});
    }

    const validate = () => {
        const isValid = Object.values(inputValues).every(value => value.length > 0);
        const invalidFields = Object.entries(inputValues)
            .filter(([id, value]) => value.length === 0)
            .map(([id]) => id);
        return {
            isValid,
            invalidFields
        };
    }

    const handleInvalid = (invalidFields: string[]) => {
        setTimeout(() => {
            setOpenInvalid(true);
        }, 300);
        setTimeout(() => {
            setOpenInvalid(false);
        }, 3300);
        setTitleInvalid('Inválido');
        setIconInvalid(<Image src={Error} alt={'Símbolo que representa invalidez'} />);
        invalidFields.forEach(id => {
            const tl = gsap.timeline();
            tl.to(`#field-${id}`, {x: 10, duration: 0.1}).to(`#field-${id}`, {x: -10, duration: 0.1}).to(`#field-${id}`, {x: 0, duration: 0.1});
        });
    }

    const handleValid = () => {
        axios({
            method: 'post',
            url: '/api',
            data: {
                name: inputValues['01'],
                from: inputValues['02'],
                org: inputValues['03'],
                service: inputValues['04'],
                msg: inputValues['05']
            }
        }).then(res => {
            if (res.data.msg === 'Queued. Thank you.') {
                setTimeout(() => {
                    setOpenValid(true);
                }, 300);
                setTimeout(() => {
                    setOpenValid(false);
                }, 3300);
                setTitleValid('Sucesso');
                setIconValid(<Image src={Success} alt={'Símbolo que representa sucesso'} />);
            } else {
                setTimeout(() => {
                    setOpenError(true);
                }, 300);
                setTimeout(() => {
                    setOpenError(false);
                }, 3300);
                setTitleError('Erro');
                setIconError(<Image src={Error} alt={'Símbolo que representa erro'} />);
            }
        });
    }

    return (
        <section className="px-8 relative container mx-auto" style={{ height: `${containerHeight * 2 + 200}px` }}>
            <div ref={container}>
                <div ref={getInTouch} className="w-max flex">
                    <h2 className={`text-[12.5rem] text-nowrap shrink-0 leading-none`}>Mande uma mensagem</h2>
                    <h2 className={`text-[12.5rem] text-nowrap shrink-0 leading-none`}> - Mande uma mensagem</h2>
                </div>
                <form ref={data} className="grid grid-cols-1 lg:gap-x-12 lg:grid-cols-2 pt-24 gap-y-12">
                    <div className="flex-col">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex gap-9 items-center">
                                <Image src={GustavoAmaro} alt="Image of Gustavo in a warm colored background" className="rounded-full w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24" />
                                <div className="flex flex-col gap-4">
                                    <p className="text-4xl xl:text-5xl">any</p>
                                    <p className="text-2xl hidden lg:block">any</p>
                                </div>
                            </div>
                            <p className="text-2xl lg:hidden">any</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex flex-col gap-6 text-2xl lg:text-xl md:col-span-1">
                            <p className="text-xl lg:text-lg">any</p>
                            <p>any</p>
                            <p>any</p>
                        </div>
                        <div className="flex flex-col gap-6 text-2xl lg:text-xl md:col-span-1">
                            <p className="text-xl lg:text-lg">any</p>
                            <p>any</p>
                            <p>{time}</p> {/* Display the current time */}
                        </div>
                    </div>
                    {contactFields.map((field, i) => {
                        return (
                            <div key={i} className={`border-text-200 ${i === 0 ? 'border-y py-12' : 'border-b pb-12'} lg:col-span-2`}>
                                <ContactField onChange={(e) => handleInputChange(field.id, e.target.value)} id={field.id} title={field.title} description={field.description} className={``} isTextBox={i === contactFields.length - 1 ? true : false} />
                            </div>
                        )
                    })}
                    <button ref={send} className="lg:col-span-2 w-fit" onClick={(e) => {
                        e.preventDefault();
                        const { isValid, invalidFields } = validate();
                        if (!isValid) {
                            handleInvalid(invalidFields);
                        } else {
                            handleValid();
                        }
                    }}>
                        <div className={`flex text-5xl lg:text-[155px] gap-4 w-fit items-center`}>
                            <p className="uppercase text-left">ENVIAR</p>
                            <div className={`gap-1 items-center hidden sm:flex`}>
                                <Image src={ArrowFoward} className={`w-14 h-14 lg:w-20 lg:h-20`} alt="Arrow pointing to the right" />
                                <animated.div style={{...arrowSecondSpring}}>
                                    <Image src={ArrowFoward} className={`w-12 h-12 lg:w-16 lg:h-16 opacity-75`} alt="Arrow pointing to the right" />
                                </animated.div>
                                <animated.div style={{...arrowThirdSpring}}>
                                    <Image src={ArrowFoward} className={`w-10 h-10 lg:w-12 lg:h-12 opacity-50`} alt="Arrow pointing to the right" />
                                </animated.div>
                            </div>
                        </div>
                    </button>
                </form>
            </div>
            {
                createPortal(
                    <Collapsible open={openInvalid} title={titleInvalid} titleClassName="text-accent-100" icon={iconInvalid}>
                        <p className="w-1/2">any</p>
                    </Collapsible>,
                    document.getElementById('nav') ?? document.body
                )
            }
            {
                createPortal(
                    <Collapsible open={openError} title={titleError} titleClassName="text-accent-100" icon={iconError}>
                        <p className="w-1/2">any</p>
                    </Collapsible>,
                    document.getElementById('nav') ?? document.body
                )
            }
            {
                createPortal(
                    <Collapsible open={openValid} title={titleValid} titleClassName="text-[#53A653]" icon={iconValid}>
                        <p className="w-1/2">any</p>
                    </Collapsible>,
                    document.getElementById('nav') ?? document.body
                )
            }
        </section>
    )
}