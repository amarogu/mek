import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        gsap.to('.hidingRect', {
            yPercent: 125,
            scrollTrigger: {
                trigger: container.current,
                start: 'top center'
            }
        });

        const observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    // If the style attribute has changed, refresh the ScrollTrigger
                    ScrollTrigger.refresh();
                    console.log('Refreshed');
                }
            }
        });

        // Start observing the 'us' element for changes in the style attribute
        if (el) observer.observe(el, { attributes: true, attributeFilter: ['style'] });

        // Clean up the observer when the component is unmounted
        return () => observer.disconnect();
    }, [])

    return (
        <section id="us" className="flex items-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%] text-center justify-center h-screen">
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
        </section>
    )
}