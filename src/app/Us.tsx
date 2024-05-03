import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usImgs } from "@/lib/helpers";
import { useMediaQuery } from "react-responsive";

export default function Us({id}: {id?: string}) {

    const data = ['Um amor que', 'tinha que', 'acontecer'];

    const container = useRef<HTMLDivElement>(null);

    const isMd = useMediaQuery({query: '(min-width: 768px)'});

    const allSrcs = usImgs;
    const imgRefs = Array(15).fill(0).map(() => useRef<HTMLImageElement>(null));
    const imgs = imgRefs.slice(0, 3);
    const srcs = allSrcs.slice(0, 3);
    const newImgs = imgRefs.slice(3, 9);
    const newImgsMd = imgRefs.slice(3);
    const newSrcs = allSrcs.slice(3, 9);
    const newSrcsMd = allSrcs.slice(3);

    useEffect(() => {
        const usTitle = document.querySelectorAll('.usTitle');
        const hidingRects = document.querySelectorAll('.hidingRect');
        let heights: number[] = [];
        usTitle.forEach(title => {
            heights.push(title.clientHeight);
        })
        heights.forEach((height, i) => {
            hidingRects[i].setAttribute('style', `height: ${height}px`);
        })
    }, []);

    useGSAP(() => {

        const commonTweens = [gsap.to(container.current, {opacity: 0}), gsap.to(imgs[0].current, {xPercent: -105, yPercent: -50}), gsap.to(imgs[1].current, {xPercent: 105}), gsap.to(imgs[2].current, {xPercent: -105, yPercent: -155}), gsap.to(newImgs[0].current, {xPercent: 105, yPercent: -105}), gsap.to(newImgs[1].current, {xPercent: -105, yPercent: 105}), gsap.to(newImgs[2].current, {xPercent: 105, yPercent: 105}), gsap.to(newImgs[3].current, {yPercent: -105}), gsap.to(newImgs[4].current, {yPercent: 105})];
        
        const spacer = document.getElementById('spacer');
        gsap.registerPlugin(ScrollTrigger);
        gsap.to('.hidingRect', {
            yPercent: 125,
            scrollTrigger: { trigger: container.current, start: 'top center' }
        });

        const tl = gsap.timeline({scrollTrigger: {
            trigger: '#us',
            start: 'top top',
            end: 'bottom+=3000 top',
            scrub: true,
            pin: true
        }})

        if (isMd) {
            const mdTweens = [gsap.to(newImgsMd[6].current, {xPercent: -210}), gsap.to(newImgsMd[7].current, {xPercent: 210}), gsap.to(newImgsMd[8].current, {xPercent: -210, yPercent: -105}), gsap.to(newImgsMd[9].current, {xPercent: 210, yPercent: -105}), gsap.to(newImgsMd[10].current, {xPercent: -210, yPercent: 105}), gsap.to(newImgsMd[11].current, {xPercent: 210, yPercent: 105})];
            tl.to(imgs[0].current, {bottom: '50%', yPercent: isMd ? 0 : -50}).to(imgs[1].current, {bottom: '50%', yPercent: -50}).to(imgs[2].current, {bottom: '50%', yPercent: isMd ? -100 : -50}).to('.usImgs', {opacity: 1, duration: 0}).add([...commonTweens, ...mdTweens], "+=0");
        } else {
            tl.to(imgs[0].current, {bottom: '50%', yPercent: isMd ? 0 : -50}).to(imgs[1].current, {bottom: '50%', yPercent: -50}).to(imgs[2].current, {bottom: '50%', yPercent: isMd ? -100 : -50}).to('.usImgs', {opacity: 1, duration: 0}).add(commonTweens, "+=0");
        }

        const observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    ScrollTrigger.refresh();
                }
            }
        });

        if (spacer) observer.observe(spacer, { attributes: true, attributeFilter: ['style'] });

        return () => observer.disconnect();
    }, [isMd])

    return (
        <section id={id ?? ''} className="flex relative m-4 items-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%] text-center justify-center h-screen">
            <div ref={container} className="-z-10">
                {data.map((i, index) => {
                    return (
                        <div key={i} className="relative" style={{zIndex: index === 2 ? 40 : 'initial'}}>
                            <div className="bg-bg-100 absolute hidingRect dark:bg-dark-bg-100 w-full"></div>
                            <h2 className='usTitle'>{i}</h2>
                        </div>
                    )
                })}
            </div>
            {isMd ? newImgsMd.map((img, i) => <Image key={i} ref={img} src={newSrcsMd[i]} alt="Imagem de Maria e Kalil sentados em um banco" style={{transform: 'translateY(50%)', bottom: '50%'}} className="md:w-[193px] usImg opacity-0 usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />) : newImgs.map((img, i) => <Image key={i} ref={img} src={newSrcs[i]} alt="Imagem de Maria e Kalil sentados em um banco" style={{transform: 'translateY(50%)', bottom: '50%'}} className="md:w-[193px] usImg opacity-0 usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />)}
            {imgs.map((img, i) => <Image key={i} ref={img} src={srcs[i]} alt="Imagem de Maria e Kalil sentados em um banco" style={{transform: 'translate(0, 100%)', bottom: '0'}} className="md:w-[193px] usImg usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />)}
        </section>
    )
}