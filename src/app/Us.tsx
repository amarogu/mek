import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Img1 from '../../public/img1_us.png';
import Img2 from '../../public/img2_us.png';
import Img3 from '../../public/img3_us.png';
import Img4 from '../../public/img4_us.png';
import Img5 from '../../public/img5_us.png';
import Img6 from '../../public/img6_us.png';
import Img7 from '../../public/img7_us.png';
import Img8 from '../../public/img8_us.png';
import Img9 from '../../public/img9_us.png';
import { useMediaQuery } from "react-responsive";

export default function Us({id}: {id?: string}) {

    const data = ['Um amor que', 'tinha que', 'acontecer'];

    const container = useRef<HTMLDivElement>(null);

    const isMd = useMediaQuery({query: '(min-width: 768px)'});

    const img1 = useRef<HTMLImageElement>(null);
    const img2 = useRef<HTMLImageElement>(null);
    const img3 = useRef<HTMLImageElement>(null);
    const img4 = useRef<HTMLImageElement>(null);
    const img5 = useRef<HTMLImageElement>(null);
    const img6 = useRef<HTMLImageElement>(null);
    const img7 = useRef<HTMLImageElement>(null);
    const img8 = useRef<HTMLImageElement>(null);
    const img9 = useRef<HTMLImageElement>(null);
    const newImgs = [img4, img5, img6, img7, img8, img9];
    const imgs = [img1, img2, img3]
    const srcs = [Img1, Img2, Img3];
    const newSrcs = [Img4, Img5, Img6, Img7, Img8, Img9];

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
            pin: true,
            markers: true
        }})

        tl.to(img1.current, {bottom: '50%', yPercent: isMd ? 0 : -50}).to(img2.current, {bottom: '50%', yPercent: -50})
        .to(img3.current, {bottom: '50%', yPercent: isMd ? -100 : -50}).to('.usImgs', {opacity: 1, duration: 0}).add([
            gsap.to(container.current, {opacity: 0}),
            gsap.to(img1.current, {xPercent: -105}),
            gsap.to(img2.current, {xPercent: 105}),
            gsap.to(img3.current, {xPercent: -105, yPercent: -155}),
            gsap.to(img4.current, {xPercent: 105, yPercent: -105}),
            gsap.to(img5.current, {xPercent: -105, yPercent: 105}),
            gsap.to(img6.current, {xPercent: 105, yPercent: 105}),
            gsap.to(img7.current, {yPercent: -105}),
            gsap.to(img8.current, {yPercent: 105})
        ], "+=0");

        const observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    ScrollTrigger.refresh();
                }
            }
        });

        if (spacer) observer.observe(spacer, { attributes: true, attributeFilter: ['style'] });

        return () => observer.disconnect();
    }, [])

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
            {newImgs.map((img, i) => <Image key={i} ref={img} src={newSrcs[i]} alt="Imagem de Maria e Kalil sentados em um banco" style={{transform: 'translateY(50%)', bottom: '50%'}} className="md:w-[193px] usImg opacity-0 usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />)}
            {imgs.map((img, i) => <Image key={i} ref={img} src={srcs[i]} alt="Imagem de Maria e Kalil sentados em um banco" style={{transform: 'translate(0, 100%)', bottom: '0'}} className="md:w-[193px] usImg usImgs md:h-[258px] w-[180px] h-[240.53px] absolute" />)}
        </section>
    )
}