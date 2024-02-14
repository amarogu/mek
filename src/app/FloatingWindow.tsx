import { useEffect, useRef } from "react"

export default function FloatingWindow() {

    const ref = useRef<any>(null);

    useEffect(() => {
        const xTo = gsap.quickTo(ref.current, 'x', {duration: 1, ease: 'elastic.out(1, 0.3)'});
        const YTo = gsap.quickTo(ref.current, 'y', {duration: 1, ease: 'elastic.out(1, 0.3)'});
    }, [])

    return (
        <div className="w-[500px] h-[500px] overflow-y-scroll">
            <div className="w-full h-full bg-bg-300"></div>
            <div className="w-full h-full bg-bg-300"></div>
        </div>
    )
}