import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { usImgs } from "@/lib/rendering/usImgs";

export default function Us({id}: {id?: string}) {

    const data = ['Nossa', 'história', 'de amor'];

    const container = useRef<HTMLDivElement>(null);

    const isMd = useMediaQuery({query: '(min-width: 768px)'});

    const isXl = useMediaQuery({query: '(min-width: 1280px)'});

    const allSrcs = usImgs;
    const imgRefs = [useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null)];
    const imgs = imgRefs.slice(0, 3);
    const srcs = allSrcs.slice(0, 3);
    const newImgs = imgRefs.slice(3, 9);
    const newImgsMd = imgRefs.slice(3, 15);
    const newImgsXl = imgRefs.slice(3);
    const newSrcs = allSrcs.slice(3, 9);
    const newSrcsMd = allSrcs.slice(3, 15);
    const newSrcsXl = allSrcs.slice(3);

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

        const commonTweens = [gsap.to(container.current, {opacity: 0}), gsap.to(imgs[0].current, {xPercent: -105, yPercent: -50}), gsap.to(imgs[1].current, {xPercent: 105}), gsap.to(imgs[2].current, {xPercent: -105, yPercent: -155}), gsap.to(newImgs[0].current, {xPercent: 105, yPercent: -105}), gsap.to(newImgs[1].current, {xPercent: -105, yPercent: 105}), gsap.to(newImgs[2].current, {xPercent: 105, yPercent: 105}), gsap.to(newImgs[3].current, {yPercent: -105}), gsap.to(newImgs[4].current, {yPercent: 105})];

        gsap.to('.hidingRect', {
            yPercent: 125,
            scrollTrigger: { trigger: container.current, start: 'top center' }
        });

        const tl = gsap.timeline({scrollTrigger: {
            trigger: '#us',
            start: 'top top',
            end: 'bottom+=3000 top',
            scrub: true,
            pin: true,
        }})

        if (isMd) {
            const mdTweens = [gsap.to(newImgsMd[6].current, {xPercent: -210}), gsap.to(newImgsMd[7].current, {xPercent: 210}), gsap.to(newImgsMd[8].current, {xPercent: -210, yPercent: -105}), gsap.to(newImgsMd[9].current, {xPercent: 210, yPercent: -105}), gsap.to(newImgsMd[10].current, {xPercent: -210, yPercent: 105}), gsap.to(newImgsMd[11].current, {xPercent: 210, yPercent: 105})];
            if (isXl) {
                const xlTweens = [gsap.to(newImgsXl[12].current, {xPercent: -315}), gsap.to(newImgsXl[13].current, {xPercent: 315}), gsap.to(newImgsXl[14].current, {xPercent: -315, yPercent: -105}), gsap.to(newImgsXl[15].current, {xPercent: 315, yPercent: -105}), gsap.to(newImgsXl[16].current, {xPercent: -315, yPercent: 105}), gsap.to(newImgsXl[17].current, {xPercent: 315, yPercent: 105})];
                tl.to(imgs[0].current, {bottom: '50%', yPercent: isMd ? 0 : -50}).to(imgs[1].current, {bottom: '50%', yPercent: -50}).to(imgs[2].current, {bottom: '50%', yPercent: -100}).to('.usImgs', {display: 'block', duration: 0}).add([...commonTweens, ...mdTweens, ...xlTweens], "+=0");
                return;
            }
            tl.to(imgs[0].current, {bottom: '50%', yPercent: isMd ? 0 : -50}).to(imgs[1].current, {bottom: '50%', yPercent: -50}).to(imgs[2].current, {bottom: '50%', yPercent: -100}).to('.usImgs', {display: 'block', duration: 0}).add([...commonTweens, ...mdTweens], "+=0");
        } else {
            tl.to(imgs[0].current, {bottom: '50%', yPercent: isMd ? 0 : -50}).to(imgs[1].current, {bottom: '50%', yPercent: -50}).to(imgs[2].current, {bottom: '50%', yPercent: -50}).to('.usImgs', {display: 'block', duration: 0}).add(commonTweens, "+=0");
        }
    }, [isMd, isXl])

    const renderNewImgs = () => {
        if (isMd) {
            if (isXl) {
                return newImgsXl.map((img, i) => <Image loading="eager" key={i} ref={img} src={newSrcsXl[i]} alt="Imagem de Maria e Kalil" style={{transform: 'translateY(50%)', bottom: '50%'}} width={193} height={258} className="md:w-[193px] xl:w-[224px] xl:h-[299.44px] hidden usImg usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />);
            }
            return newImgsMd.map((img, i) => <Image loading="eager" key={i} ref={img} src={newSrcsMd[i]} alt="Imagem de Maria e Kalil" style={{transform: 'translateY(50%)', bottom: '50%'}} width={193} height={258} className="md:w-[193px] hidden usImg usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />);
        } else {
            return newImgs.map((img, i) => <Image loading="eager" width={193} height={258} key={i} ref={img} src={newSrcs[i]} alt="Imagem de Maria e Kalil" style={{transform: 'translateY(50%)', bottom: '50%'}} className="md:w-[193px] usImg hidden usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />);
        }
    }

    return (
        <section id={id ?? ''} className="flex relative m-4 items-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%] text-center justify-center h-screen">
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
            {renderNewImgs()}
            {imgs.map((img, i) => <Image loading="eager" key={i} ref={img} src={srcs[i]} alt="Imagem de Maria e Kalil sentados em um banco" style={{transform: 'translate(0, 100%)', bottom: '0'}} width={224} height={299.44} className="md:w-[193px] xl:w-[224px] xl:h-[299.44px] usImg usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />)}
        </section>
    )
}