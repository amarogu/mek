import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import BottomTab from "./BottomTab";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Parallax } from "./Parallax";
import SlidingText from "./SlidingText";
import LogoAlt from '../../public/meklogo_alt.svg';
import LogoAltDark from '../../public/meklogo_alt_dark.svg';
import { type User } from "@/lib/Models/User";
import { parseHeroContent, parseMdHeroContent } from "@/lib/helpers";
import { type Group } from "@/lib/Models/Group";

export default function Hero({className, id, item}: {className?: string, id?: string, item?: User | Group}) {

    const isMd = useMediaQuery({query: '(min-width: 768px)'});
    const isXl = useMediaQuery({query: '(min-width: 1280px)'});
    const heroRef = useRef<HTMLElement>(null);
    const slidingText = useRef<HTMLDivElement>(null);

    const calculateOverlap = () => {
        const imgRect = actualImgHelper.current?.getBoundingClientRect();
        const bottomTabRect = document.querySelector('.bottomTab')?.getBoundingClientRect();
    
        if (imgRect && bottomTabRect) {
            const overlap = imgRect.bottom - bottomTabRect.bottom;
            if (overlap > 0) {
                return overlap;
            } else {
                return 0;
            }
        }
    }

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: `${isMd ? 'top+=1400' : 'top+=900'} top+=500`,
                scrub: true
            }
        });
    
        if (imgRef.current?.childNodes) {
            tl.to(imgRef.current.childNodes, {
                scale: isMd ? (isXl ? 8 : 6) : 5,
                y: isMd ? 500 : 400,
                x: isMd ? 0 : '-50%',
                ease: 'slow'
            }).to('.bottomTab', { opacity: 0 }, 0).to(slidingText.current, { opacity: 1 }, 0.3);
        }

        gsap.to('.title p, .title span', {
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.title p',
                start: 'top-=50 top',
                end: 'bottom+=50 top',
                scrub: true
            }
        })
    }, []);

    const content = parseHeroContent(item);
    const mdContent = parseMdHeroContent(item);

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const overlap = calculateOverlap();
        document.getElementById('spacer')?.style.setProperty('height', `${overlap}px`);
    }, [])

    const actualImg = useRef<HTMLVideoElement>(null);
    const actualImgHelper = useRef<HTMLDivElement>(null);

    const img = <video playsInline autoPlay muted loop ref={actualImg} className={`z-10 md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px]`}><source src="weddingvideo.mp4" type="video/mp4" /></video>;
    const imgHelper = <div ref={actualImgHelper} style={{transform: isMd ? (isXl ? 'translateY(500px) scale(8) ' : 'translateY(500px) scale(6)') : 'translate(-50%, 400px) scale(5)' }} className={`absolute top-0 md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px]`}></div>;

    const renderContent = (isMd: boolean) => {
        if (isMd) {
            return (
                <div>
                    <h1 className="flex title flex-col">
                        <Parallax reverse>
                            <p className="ml-16">{mdContent[0]}</p>
                        </Parallax>
                        <div className="flex gap-4 items-center">
                            <Parallax reverse>
                                <span>{mdContent[1]}</span>
                            </Parallax>
                            <div ref={imgRef} className='z-10 relative w-[240px] h-[105px]'>
                                {img}
                                {imgHelper}
                                <div ref={slidingText} style={{opacity: 0}} className="-translate-y-full">
                                    <SlidingText className="text-[30%]" text="Venham saber mais" img={<Image src={LogoAlt} alt="Logo alternativa; Maria & Kalil escritos em iniciais, abaixo a palavra love" className="w-[24px]" width={24} />} darkImg={<Image width={24} className="w-[24px]" src={LogoAltDark} alt="Logo alternativa; Maria & Kalil escritos em iniciais, abaixo a palavra love" />} />
                                </div>
                            </div>
                            <Parallax reverse>
                                <span>{mdContent[2]}</span>
                            </Parallax>
                        </div>
                        <Parallax reverse>
                            <p className="ml-16">{mdContent[3]}</p>
                        </Parallax>
                        <Parallax reverse>
                            <p className="ml-16">{mdContent[4]}</p>
                        </Parallax>
                    </h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="flex gap-1 title flex-col">
                        <Parallax reverse>
                            <p className="ml-8">{content[0]}</p>
                        </Parallax>
                        <div className="flex gap-4 items-center">
                            <Parallax reverse>
                                <span>{content[1]}</span>
                            </Parallax>
                            <div ref={imgRef} className='z-10 relative w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px]'>
                                {img}
                                {imgHelper}
                                <div ref={slidingText} style={{opacity: 0}} className="-translate-y-full">
                                    <SlidingText className="text-[30%] text-dark-text-100" text="Venham saber mais" img={<Image src={LogoAlt} alt="Logo alternativa; Maria & Kalil escritos em iniciais, abaixo a palavra love" className="w-[24px]" width={24} />} darkImg={<Image width={24} className="w-[24px]" src={LogoAltDark} alt="Logo alternativa; Maria & Kalil escritos em iniciais, abaixo a palavra love" />} />
                                </div>
                            </div>
                        </div>
                        <Parallax reverse>
                            <p className="ml-8">{content[2]}</p>
                        </Parallax>
                        <Parallax reverse>
                            <p>{content[3]}</p>
                        </Parallax>
                        <Parallax reverse>
                            <p>{content[4]}</p>
                        </Parallax>
                        <Parallax reverse>
                            <p>{content[5]}</p>
                        </Parallax>
                    </h1>
                </div>
            )
        }
    }

    return (
        <>
            <section id={id ?? ''} ref={heroRef} className={`${className ?? ''} flex flex-col container mx-auto relative h-[calc(100svh-113px)] justify-center items-center`}>
                <div className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
                    {renderContent(isMd)}
                </div>
                <BottomTab />
            </section>
            <div id="spacer"></div>
        </>
    )
}