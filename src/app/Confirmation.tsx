import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Confirmation() {

    const text = ['Confirmar', 'Presença'];

    const container = useRef(null);

    const textRefs = [useRef(null), useRef(null)];

    useGSAP((_, contextSafe) => {
        gsap.to(textRefs[0].current, {
            scale: 200,
            ease: 'power1.in',
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'center top',
                scrub: true,
                pin: true
            },
            onComplete: () => {
                if (contextSafe) {
                    console.log('contextSafe');
                    contextSafe(() => {
                        gsap.to(textRefs[0].current, {
                            opacity: 0
                        });
                    });
                }
            }
        })
    })

    return (
        <section ref={container} className="h-[1600vh] text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
            <div className="h-screen relative p-8">
                {
                    text.map((t, i) => <h2 key={i} ref={textRefs[i]} className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${i === 1 ? 'scale-0' : ''}`}>{t}</h2>)
                }
            </div>
        </section>
    )
}