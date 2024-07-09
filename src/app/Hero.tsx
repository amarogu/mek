import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useContext, useEffect, useRef, useState } from "react";
import Close from '../../public/close.svg';
import CloseDark from '../../public/close_dark.svg';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Parallax } from "./Parallax";
import SlidingText from "./SlidingText";
import LogoAlt from '../../public/meklogo_alt.svg';
import LogoAltDark from '../../public/meklogo_alt_dark.svg';
import { parseHeroContent, parseMdHeroContent } from "@/lib/helpers";
import Context from "./Context";
import { usImgs } from "@/lib/rendering/usImgs";
import ThemeImage from "./ThemeImage";

export default function Hero({className, id}: {className?: string, id?: string}) {

    const isMd = useMediaQuery({query: '(min-width: 768px)'});
    const isXl = useMediaQuery({query: '(min-width: 1280px)'});
    const heroRef = useRef<HTMLElement>(null);
    const slidingText = useRef<HTMLDivElement>(null);

    const imgPopupRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    })

    const {item} = useContext(Context);

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

    const tl = useRef<GSAPTimeline | null>(null);

    const {contextSafe} = useGSAP(() => {
        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: `${isMd ? 'top+=1400' : 'top+=900'} top+=500`,
                scrub: true
            }
        });
    
        if (imgRef.current?.childNodes) {
            tl.current.to(imgRef.current.childNodes, {
                scale: isMd ? (isXl ? 8 : 6) : 6,
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
        });
    });

    const content = parseHeroContent(item);
    const mdContent = parseMdHeroContent(item);

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const overlap = calculateOverlap();
        document.getElementById('spacer')?.style.setProperty('height', `${overlap}px`);
    }, [])

    const actualImg = useRef<HTMLVideoElement>(null);
    const actualImgHelper = useRef<HTMLDivElement>(null);

    const clickTl = useRef<GSAPTimeline | null>(null);

    const img = <video playsInline autoPlay muted loop ref={actualImg} className={`z-10 md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px]`}><source src="../../weddingvideo.mp4" type="video/mp4" /></video>;
    const imgHelper = <div ref={actualImgHelper} style={{transform: isMd ? (isXl ? 'translateY(500px) scale(8) ' : 'translateY(500px) scale(6)') : 'translate(-50%, 400px) scale(5)' }} className={`absolute top-0 md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px]`}></div>;

    const handleImgClick = contextSafe(() => {
        clickTl.current = gsap.timeline().to(imgRef.current, {
            opacity: 0,
            duration: 0.2
        }).set(imgPopupRef.current, {
            display: 'block'
        }).to(imgPopupRef.current, {
            opacity: 1,
        })
    });

    const handleCloseBtnClick = contextSafe(() => {
        if (clickTl.current) {
            clickTl.current.reverse();
        }
    }) 

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
                            <div onClick={handleImgClick} ref={imgRef} className='z-10 relative w-[240px] h-[105px]'>
                                {img}
                                {imgHelper}
                                <div ref={slidingText} style={{opacity: 0}} className="-translate-y-full">
                                    <SlidingText className="text-[30%] text-dark-text-100" text="Venham saber mais" img={<Image src={LogoAlt} alt="Logo alternativa; Maria & Kalil escritos em iniciais, abaixo a palavra love" className="w-[24px]" width={24} />} darkImg={<Image width={24} className="w-[24px]" src={LogoAltDark} alt="Logo alternativa; Maria & Kalil escritos em iniciais, abaixo a palavra love" />} />
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

    const [src, setSrc] = useState(usImgs[0]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = index + 1;
            if (nextIndex < usImgs.length) {
                setIndex(nextIndex);
                setSrc(usImgs[nextIndex]);
            } else {
                setIndex(0);
                setSrc(usImgs[0]);
            }
        }, 2350);
        return () => clearTimeout(timer); // Clean up the timer when the component unmounts or re-renders
    }, [index]);

    return (
        <>
            <section id={id ?? ''} ref={heroRef} className={`${className ?? ''} flex flex-col container mx-auto relative h-[calc(100svh-113px)] justify-center items-center`}>
                <div className="text-[12.5vw] md:text-[9vw] xl:text-[120px] relative font-extrabold leading-[85%]">
                    {renderContent(isMd)}
                    <div style={{opacity: 0}} ref={imgPopupRef} className="absolute hidden w-[125%] z-10 h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image loading="eager" className="object-cover rounded-md w-full h-full object-[center_10%]" src={src} alt="Imagem de Maria & Kalil em um full-screen pop-up" />
                        <button onClick={handleCloseBtnClick} className="p-2 absolute right-0 top-0 m-6 rounded-full backdrop-blur-md">
                            <ThemeImage className="h-4 w-4" srcDark={CloseDark} srcLight={Close} alt="Fechar Pop-up" width={16} height={16} />
                        </button>
                    </div>
                </div>
            </section>
            <div id="spacer"></div>
        </>
    )
}