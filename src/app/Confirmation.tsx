import { addClasses, removeClasses, splitArrayInHalf } from "@/lib/helpers";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSProperties, useRef } from "react";
import { confirmationImgs } from "@/lib/rendering/confirmationImgs";
import Image, { StaticImageData } from "next/image";

export default function Confirmation() {

    const text = ['Confirmar', 'Presença'];

    const container = useRef(null);

    const textRefs = [useRef(null), useRef(null)];

    const tl = useRef<GSAPTimeline | null>();

    useGSAP(() => {
        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                pin: true,
                pinSpacing: false,
                markers: true,
                onLeave: () => {
                    textRefs.forEach(ref => {
                        if (ref.current) addClasses(ref.current, ['hidden']);
                    });
                    const imgs = document.querySelectorAll('.confirmationImgs');
                    imgs.forEach(img => {
                        if (img instanceof HTMLElement) addClasses(img, ['hidden']);
                    });
                },
                onEnterBack: () => {
                    textRefs.forEach(ref => {
                        if (ref.current) removeClasses(ref.current, ['hidden']);
                    });
                    const imgs = document.querySelectorAll('.confirmationImgs');
                    imgs.forEach(img => {
                        if (img instanceof HTMLElement) removeClasses(img, ['hidden']);
                    });
                }
            }
        }).to(textRefs[0].current, {
            '--progress': 1,
            ease: 'power1.in'
        }).to(textRefs[1].current, {
            '--progress': 1,
            ease: 'power1.in'
        })
    })

    return (
        <section>
            <div ref={container} className="font-extrabold h-[1500vh] leading-[85%]">
                <div className="h-screen relative p-8">
                    {
                        text.map((t, i) => <h2 key={i} style={{'--progress': i === 1 ? '0' : '0.0048'} as CSSProperties} ref={textRefs[i]} className={`absolute text-[104.17vw] md:text-[75vw] xl:text-[1000px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[calc(var(--progress)*25)] origin-[calc(50%+var(--progress)*1%)_center] ${i === 1 ? 'text-dark-text-100 dark:text-text-100' : ''}`}>{t}</h2>)
                    }
                    <div className="absolute px-8 gap-6 -z-10 w-full overflow-y-hidden left-0 top-0 h-full flex">
                        {
                            splitArrayInHalf(confirmationImgs).map((imgs: StaticImageData[], i) => (
                                <div key={i} className={`flex justify-center items-center gap-6 flex-col w-1/2 h-full ${i === 1 ? 'mt-8' : ''}`}>
                                    {
                                        imgs.map((img, j) => <Image key={j} className="object-cover confirmationImgs w-full grayscale-[50%] opacity-50" loading="eager" src={img} alt="Imagem de Maria e Kalil" />)
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="h-[200vh] bg-dark-text-100 dark:bg-text-100">

            </div>
        </section>
    )
}