import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

interface SliderProps {
    content: string;
    container: React.RefObject<HTMLDivElement>;
    markers?: boolean;
    isReady?: boolean;
}

export default function Slider({content, container, markers, isReady}: SliderProps) {

    const slider = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (isReady ?? true) {
            gsap.to(slider.current, {
                x: '-50%',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top-=104 top',
                    end: 'center top',
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                    markers: markers
                }
            });
        }
    }, [isReady]);

    return (
        <div ref={slider} className={`flex w-fit text-nowrap uppercase font-semibold`}>
            <h2 className={`text-[12.5rem] shrink-0 leading-none`}>{content}</h2>
            <h2 className={`text-[12.5rem] shrink-0 leading-none`}> - {content}</h2>
        </div>
    )
}