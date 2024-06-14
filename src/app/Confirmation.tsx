import { addClasses, removeClasses, splitArray } from "@/lib/helpers";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSProperties, useRef } from "react";
import {confirmationImgs, confirmationImgsLg, confirmationImgsMd} from "@/lib/rendering/confirmationImgs";
import Image, { StaticImageData } from "next/image";
import { useWindowSize } from "@studio-freight/hamo";
import { useMediaQuery } from "react-responsive";
import ConfirmationForm from "./ConfirmationForm";

export default function Confirmation({id}: {id?: string}) {

    const text = ['Confirmar', 'Presença'];

    const container = useRef(null);

    const sectionRef = useRef(null);

    const textRefs = [useRef(null), useRef(null)];

    const tl = useRef<GSAPTimeline | null>();

    const isMd = useMediaQuery({query: '(min-width: 768px)'});

    const isLg = useMediaQuery({query: '(min-width: 1024px)'});

    const imgsContainer = useRef(null);

    const getImgsArray = (isMd: boolean, isLg: boolean) => {
        if (isMd) {
            if (isLg) {
                return splitArray(confirmationImgsLg, 4);
            }
            return splitArray(confirmationImgsMd, 3);
        }
        return splitArray(confirmationImgs, 2);
    }

    const { width: windowWidth } = useWindowSize() as { width: number };

    useGSAP((_, contextSafe) => {
            if (contextSafe) {
                const onUpdate = (progress: number) => {
                    getImgsArray(isMd, isLg).forEach((imgs, i) => {
                        imgs.forEach((_, j) => {
                            contextSafe(() => {
                                const setY = gsap.quickSetter(`#confirmationImg${i}${j}`, 'y', 'px');
                                const y = progress * -(imgs.length * 4 - j * 4) * 0.4 * windowWidth;
                                setY(y);
                            })();
                        });
                    });
                };
                tl.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                        markers: true,
                        onUpdate: (e) => {
                            const progress = e.progress;
                            onUpdate(progress);
                        },
                        onLeave: () => {
                            /*textRefs.forEach(ref => {
                                if (ref.current) addClasses(ref.current, ['hidden']);
                            });
                            if (imgsContainer.current) addClasses(imgsContainer.current, ['hidden']);
                            if (sectionRef.current) addClasses(sectionRef.current, ['bg-dark-text-100', 'dark:bg-text-100']);*/
                        },
                        onEnterBack: () => {
                            /*textRefs.forEach(ref => {
                                if (ref.current) removeClasses(ref.current, ['hidden']);
                            });
                            if (imgsContainer.current) removeClasses(imgsContainer.current, ['hidden']);
                            if (sectionRef.current) removeClasses(sectionRef.current, ['bg-dark-text-100', 'dark:bg-text-100']);*/
                        }
                    }
                }).to(textRefs[0].current, {
                    '--progress': 1,
                    ease: 'power1.in'
                }).to(textRefs[1].current, {
                    '--progress': 1,
                    ease: 'power1.in'
                });
            }
    }, [windowWidth])

    return (
        <section id={id} ref={sectionRef} className="p-8">
            <div ref={container} className="font-extrabold container mx-auto h-[1500vh] leading-[85%]">
                <div className="h-screen relative">
                    {
                        text.map((t, i) => <h2 key={i} style={{'--progress': i === 1 ? '0' : '0.0048'} as CSSProperties} ref={textRefs[i]} className={`absolute text-[104.17vw] md:text-[75vw] xl:text-[1000px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[calc(var(--progress)*25)] origin-[calc(50%+var(--progress)*1%)_center] ${i === 1 ? 'text-dark-text-100 dark:text-text-100' : ''}`}>{t}</h2>)
                    }
                    <div ref={imgsContainer} className="absolute gap-6 -z-10 w-full overflow-y-hidden left-0 top-0 h-full flex">
                        {
                            getImgsArray(isMd, isLg).map((imgs: StaticImageData[], i) => (
                                <div key={i} className={`flex justify-center items-center gap-6 flex-col w-1/2 h-full ${i % 2 === 0 ? 'mt-24' : ''}`}>
                                    {
                                        imgs.map((img, j) => <Image key={j} id={`confirmationImg${i}${j}`} className={`object-cover confirmationImgs w-full grayscale-[50%] opacity-50 confirmationImgsColumn${i}`} loading="eager" src={img} alt="Imagem de Maria e Kalil" />)
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="h-screen relative z-20 flex items-center justify-center">
                <ConfirmationForm />
            </div>
        </section>
    )
}