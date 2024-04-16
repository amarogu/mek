import Image, { StaticImageData } from "next/image";
import Img2 from "../../public/img2.png";
import Img3 from "../../public/img3.png";
import Img4 from "../../public/img4.png";
import Img5 from "../../public/img5.png";
import Img6 from "../../public/img6.png";
import Img7 from "../../public/img7.png";
import Img8 from "../../public/img8.png";
import Img9 from "../../public/img9.png";
import Img10 from "../../public/img10.png";
import Img11 from "../../public/img11.png";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import BottomTab from "./BottomTab";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Parallax } from "./Parallax";

export default function Hero({className}: {className?: string}) {

    const isMd = useMediaQuery({query: '(min-width: 768px)'});
    const heroRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: `${isMd ? 'top+=700' : 'top+=600'} top+=500`,
                scrub: true,
            }
        });
    
        tl.to(imgRef.current, {
            scale: isMd ? 6 : 5,
            y: isMd ? 150 : 400,
            x: isMd ? 0 : '-50%',
            ease: 'slow'
        })
        .to('.bottomTab', { // assuming 'bottomTab' is the class of the BottomTab component
            opacity: 0,
        }, 0);
    }, []);

    const content = ['Vamos nos', 'casar!', 'Sejam bem', 'vindos ao', 'nosso web', 'site.'];
    const mdContent = ['Vamos nos', 'casar!', 'Sejam', 'bem vindos ao', 'nosso web site.'];

    const imgs = [Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11];
    const [currImg, setCurrImg] = useState<StaticImageData>(Img2);
    const [imgIndex, setImgIndex] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setImgIndex((prevIndex) => (prevIndex + 1) % imgs.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [imgs]);

    useEffect(() => {
        setCurrImg(imgs[imgIndex]);
    }, [imgIndex, imgs]);

    const img = <Image ref={imgRef} src={currImg} className={`z-10 ${isMd ? 'w-[240px] h-[105px]' : 'w-[113px] h-[49px]'}`} alt="Imagens de Maria e kalil" />

    const renderContent = (isMd: boolean) => {
        if (isMd) {
            return (
                <div>
                    <h1 className="flex flex-col">
                        <Parallax reverse>
                        <p className="ml-16">{mdContent[0]}</p>
                        </Parallax>
                        <p className="flex gap-4 items-center">
                            <Parallax reverse>
                            <span>{mdContent[1]}</span>
                            </Parallax>
                            {img}
                            <Parallax reverse>
                            <span>{mdContent[2]}</span>
                            </Parallax>
                        </p>
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
                    <h1 className="flex gap-1 flex-col">
                        <Parallax reverse>
                            <p className="ml-8">{content[0]}</p>
                        </Parallax>
                        <p className="flex gap-4 items-center">
                            <Parallax reverse>
                                <span>{content[1]}</span>
                            </Parallax>
                            {img}
                        </p>
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
        <section ref={heroRef} id="hero" className={`${className ?? ''} flex flex-col container mx-auto relative h-[calc(100vh-113px)] justify-center items-center`}>
            <div className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
                {renderContent(isMd)}
            </div>
            <BottomTab />
        </section>
    )
}