import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { usImgs } from "@/lib/rendering/usImgs";
import { createImgProps } from "@/lib/helpers";

export default function Us({id}: {id?: string}) {

    const data = ['Nossa', 'história', 'de amor'];

    const container = useRef<HTMLDivElement>(null);

    const isMd = useMediaQuery({query: '(min-width: 768px)'});

    const isXl = useMediaQuery({query: '(min-width: 1280px)'});

    const allSrcs = usImgs;
    const imgs = useRef<HTMLImageElement[]>([]);
    const newImgs = useRef<HTMLImageElement[]>([]);
    const newImgsMd = useRef<HTMLImageElement[]>([]);
    const newImgsXl = useRef<HTMLImageElement[]>([]);
    const srcs = allSrcs.slice(0, 3);
    const newSrcs = allSrcs.slice(3, 9);
    const newSrcsMd = allSrcs.slice(9, 15);
    const newSrcsXl = allSrcs.slice(15);

    const section = useRef<HTMLElement>(null);

    const tl = useRef<GSAPTimeline | null>(null);

    useEffect(() => {
        const usTitle = document.querySelectorAll('.usTitle');
        const hidingRects = document.querySelectorAll('.hidingRect');
        let heights: number[] = [];
        usTitle.forEach(title => {
            heights.push(title.clientHeight);
        })
        heights.forEach((height, i) => {
            hidingRects[i].setAttribute('style', `height: ${i === 1 ? height + 4 : height}px`);
        })
    }, []);

    useGSAP(() => {
        if (tl.current) {
            tl.current.kill();
            tl.current = null;
        }

        gsap.to('.hidingRect', {
            yPercent: 125,
            scrollTrigger: { trigger: container.current, start: 'top center' }
        });

        tl.current = gsap.timeline({scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: 'bottom+=3000 top',
            scrub: true,
            pin: true,
        }});

        if (isMd) {
            if (isXl) {
                tl.current
                .to(imgs.current[0], {bottom: '50%'})
                .to(imgs.current[1], {bottom: '50%', yPercent: -50})
                .to(imgs.current[2], {bottom: '50%', yPercent: -100})
                .set([newImgs.current, newImgsMd.current, newImgsXl.current], {display: 'block'})
                .add([
                    gsap.to(container.current, {opacity: 0}),
                    gsap.to(imgs.current[0], {xPercent: -105, yPercent: -50}),
                    gsap.to(imgs.current[1], {xPercent: 105}),
                    gsap.to(imgs.current[2], {xPercent: -105, yPercent: -155}),
                    gsap.to(newImgs.current[0], {xPercent: 105, yPercent: -105}),
                    gsap.to(newImgs.current[1], {xPercent: -105, yPercent: 105}),
                    gsap.to(newImgs.current[2], {xPercent: 105, yPercent: 105}),
                    gsap.to(newImgs.current[3], {yPercent: -105}),
                    gsap.to(newImgs.current[4], {yPercent: 105}),
                    gsap.to(newImgsMd.current[0], {xPercent: -210, yPercent: -105}),
                    gsap.to(newImgsMd.current[1], {xPercent: 210, yPercent: -105}),
                    gsap.to(newImgsMd.current[2], {xPercent: -210, yPercent: 105}),
                    gsap.to(newImgsMd.current[3], {xPercent: 210, yPercent: 105}),
                    gsap.to(newImgsMd.current[4], {xPercent: -210}),
                    gsap.to(newImgsMd.current[5], {xPercent: 210}),
                    gsap.to(newImgsXl.current[0], {xPercent: -315, yPercent: -105}),
                    gsap.to(newImgsXl.current[1], {xPercent: 315, yPercent: -105}),
                    gsap.to(newImgsXl.current[2], {xPercent: -315, yPercent: 105}),
                    gsap.to(newImgsXl.current[3], {xPercent: 315, yPercent: 105}),
                    gsap.to(newImgsXl.current[4], {xPercent: -315}),
                    gsap.to(newImgsXl.current[5], {xPercent: 315})
                ], '+=0');
            } else {
                tl.current
                .to(imgs.current[0], {bottom: '50%'})
                .to(imgs.current[1], {bottom: '50%', yPercent: -50})
                .to(imgs.current[2], {bottom: '50%', yPercent: -100})
                .set([newImgs.current, newImgsMd.current], {display: 'block'})
                .add([
                    gsap.to(container.current, {opacity: 0}),
                    gsap.to(imgs.current[0], {xPercent: -105, yPercent: -50}),
                    gsap.to(imgs.current[1], {xPercent: 105}),
                    gsap.to(imgs.current[2], {xPercent: -105, yPercent: -155}),
                    gsap.to(newImgs.current[0], {xPercent: 105, yPercent: -105}),
                    gsap.to(newImgs.current[1], {xPercent: -105, yPercent: 105}),
                    gsap.to(newImgs.current[2], {xPercent: 105, yPercent: 105}),
                    gsap.to(newImgs.current[3], {yPercent: -105}),
                    gsap.to(newImgs.current[4], {yPercent: 105}),
                    gsap.to(newImgsMd.current[0], {xPercent: -210, yPercent: -105}),
                    gsap.to(newImgsMd.current[1], {xPercent: 210, yPercent: -105}),
                    gsap.to(newImgsMd.current[2], {xPercent: -210, yPercent: 105}),
                    gsap.to(newImgsMd.current[3], {xPercent: 210, yPercent: 105}),
                    gsap.to(newImgsMd.current[4], {xPercent: -210}),
                    gsap.to(newImgsMd.current[5], {xPercent: 210}),
                ], '+=0');
            }
        } else {
            tl.current
            .to(imgs.current[0], {bottom: '50%', yPercent: -50})
            .to(imgs.current[1], {bottom: '50%', yPercent: -50})
            .to(imgs.current[2], {bottom: '50%', yPercent: -50})
            .set(newImgs.current, {display: 'block'})
            .add([
                gsap.to(container.current, {opacity: 0}),
                gsap.to(imgs.current[0], {xPercent: -105, yPercent: -50}),
                gsap.to(imgs.current[1], {xPercent: 105}),
                gsap.to(imgs.current[2], {xPercent: -105, yPercent: -155}),
                gsap.to(newImgs.current[0], {xPercent: 105, yPercent: -105}),
                gsap.to(newImgs.current[1], {xPercent: -105, yPercent: 105}),
                gsap.to(newImgs.current[2], {xPercent: 105, yPercent: 105}),
                gsap.to(newImgs.current[3], {yPercent: -105}),
                gsap.to(newImgs.current[4], {yPercent: 105})
            ], '+=0');
        }
        
    }, [isMd, isXl]);

    const zI = -10;
    const styles = {
        transform: 'translateY(50%)',
        display: 'none',
        bottom: '50%'
    }

    return (
        <section id={id ?? ''} ref={section} className="flex relative m-4 items-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%] text-center justify-center h-screen">
            <div ref={container} className="-z-10">
                {data.map((i, index) => {
                    return (
                        <div key={i} className="relative" style={{zIndex: index === 2 ? 40 : 'initial'}}>
                            <div className={`bg-bg-100 absolute hidingRect ${index === 1 ? '-top-1' : 'top-0'} dark:bg-dark-bg-100 w-full`}></div>
                            <h2 className='usTitle'>{i}</h2>
                        </div>
                    )
                })}
            </div>
            {
                srcs.map((src, i) => (
                    <Image key={i} {...createImgProps(src, i, imgs, 'translate(0, 100%)', '0', 'block')} />
                ))
            }
            {
                newSrcs.map((src, i) => (
                    <Image key={i} {...createImgProps(src, i, newImgs, styles.transform, styles.bottom, styles.display, zI)} />
                ))
            }
            {
                isMd ? (
                    newSrcsMd.map((src, i) => (
                        <Image key={i} {...createImgProps(src, i, newImgsMd, styles.transform, styles.bottom, styles.display, zI)} />
                    ))
                ) : null
            }
            {
                isXl ? (
                    newSrcsXl.map((src, i) => (
                        <Image key={i} {...createImgProps(src, i, newImgsXl, styles.transform, styles.bottom, styles.display, zI)} />
                    ))
                ) : null
            }
        </section>
    )
}