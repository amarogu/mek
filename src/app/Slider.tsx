import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

interface SliderProps {
    content: string;
    container: React.RefObject<HTMLDivElement>;
}

export default function Slider({content, container}: SliderProps) {

    const slider = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(slider.current, {
            x: '-50%',
            scrollTrigger: {
                trigger: container.current,
                start: 'top-=104 top',
                end: 'center top',
                scrub: true,
                pin: true,
                pinSpacing: false,
                markers: true,
            }
        });
    }, [])

    return (
        <div ref={slider} className="flex text-nowrap uppercase font-semibold">
            <h2 className={`text-[12.5rem] shrink-0 leading-none`}>{content}</h2>
            <h2 className={`text-[12.5rem] shrink-0 leading-none`}> - {content}</h2>
        </div>
    )
}