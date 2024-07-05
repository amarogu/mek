import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useContext, useEffect, useRef } from "react";
import Context from "./Context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import PinGlyph from '../../public/icon_marker.svg';
import BottomTab from "./BottomTab";
import fitty from 'fitty';

export default function PartyInfo({id}: {id: string}) {
    const {item} = useContext(Context);

    if (!item) return null;

    const {contextSafe} = useGSAP();

    const sectionRef = useRef<HTMLElement>(null);
    const glyphRef = useRef<HTMLImageElement>(null);

    const handleLoad = contextSafe(() => {
        if (sectionRef.current) {
            gsap.to(sectionRef.current, {
                opacity: 1,
                duration: 0.2
            });
        }
    });

    const location = {lat: -22.984946169512966, lng: -47.14577928970697};

    const fittyTitleRef = useRef<HTMLParagraphElement>(null);
    const fittySubRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (fittyTitleRef.current && fittySubRef.current) {
            fitty(fittyTitleRef.current ,{maxSize: 216});
            fitty(fittySubRef.current);
        }
    })

    const firstChild = (
        <div className="flex flex-col gap-1">
            <p>R. Idalino Gomes de Melo - 13056-273</p>
            <p>Jd. São Cristóvão</p>
            <p className="uppercase">Campinas - SP</p>
        </div>
    )

    const lastChild = (
        <div className="flex flex-col gap-1 items-end justify-self-end">
            <p>09 NOV 2024</p>
            <p>Às 16:30</p>
        </div>
    )

    return (
        <section id={id} style={{opacity: 0}} ref={sectionRef} className="relative -z-10">
            <div className='absolute flex flex-col gap-6 z-20 bottom-0 w-full px-8'>
                <h2 className="font-extrabold leading-none container mx-auto">
                    <p ref={fittyTitleRef}>Saint</p>
                    <p ref={fittySubRef} className="uppercase">Germain Eventos</p>
                </h2>
                <BottomTab lastChild={lastChild} omitMiddleChild firstChild={firstChild} noScrollTrigger className="!pb-10" containerClassName="!relative" /> 
            </div>
            <Image loading="eager" className="w-14 absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-14" src={PinGlyph} ref={glyphRef} alt="Saint German Eventos" />
            <Map
                defaultZoom={16}
                center={location}
                className="w-full h-screen brightness-75"
                mapId='5f106ba5b2d1ba7a'
                onTilesLoaded={handleLoad}
                disableDefaultUI={true}
                gestureHandling={'none'}
                keyboardShortcuts={false}
            >
            </Map>
        </section>
    )    
}