import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Img1 from '../../public/img1_us.png';
import Img2 from '../../public/img2_us.png';
import Img3 from '../../public/img3_us.png';

export default function Us() {

    const data = ['Um amor que', 'tinha que', 'acontecer'];

    const container = useRef<HTMLDivElement>(null);

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
        const el = document.getElementById('us');
        gsap.registerPlugin(ScrollTrigger);
        const imgs = gsap.utils.toArray('.usImgs') as HTMLElement[];
        imgs.forEach(img => {
            gsap.to(img, {
                bottom: '50%',
                scrollTrigger: {
                    trigger: el,
                    start: 'top top',
                    end: 'center top',
                    scrub: true,
                    markers: true,
                    pin: true
                }
            })
        });
        gsap.to('.hidingRect', {
            yPercent: 125,
            scrollTrigger: { trigger: container.current, start: 'top center' }
        });

        const observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    ScrollTrigger.refresh();
                }
            }
        });

        if (el) observer.observe(el, { attributes: true, attributeFilter: ['style'] });

        return () => observer.disconnect();
    }, [])

    return (
        <section id="us" className="flex relative items-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%] text-center justify-center h-screen">
            <div ref={container}>
                {data.map(i => {
                    return (
                        <div key={i} className="relative">
                            <div className="bg-bg-100 absolute hidingRect dark:bg-dark-bg-100 w-full"></div>
                            <h2 className="usTitle">{i}</h2>
                        </div>
                    )
                })}
            </div>
            <Image src={Img1} alt="Imagem de Maria e Kalil sentados em um banco" style={{transform: 'translateY(100%)'}} className="md:w-[193px] usImgs md:h-[258px] w-[113px] h-[151px] absolute bottom-0" />
        </section>
    )
}