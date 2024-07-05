import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useContext, useRef } from "react";
import Context from "./Context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import PinGlyph from '../../public/icon_marker.svg';
import BottomTab from "./BottomTab";

export default function PartyInfo() {
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

    const firstChild = (
        <div className="flex flex-col gap-1">
            <p>R. Idalino Gomes de Melo - 13056-273</p>
            <p>Jd. São Cristóvão</p>
            <p className="uppercase">Campinas - SP</p>
        </div>
    )

    return (
        <section style={{opacity: 0}} ref={sectionRef} className="relative -z-10">
            <div className="absolute top-0 w-full z-10 h-8 bg-gradient-to-b dark:from-dark-bg-100 dark:to-dark-bg-100/0"></div>
            <div className='absolute flex flex-col gap-6 z-20 bottom-0 w-full'>
                <div className="px-8 text-[14.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
                    
                </div>
                <BottomTab omitMiddleChild firstChild={firstChild} noScrollTrigger className="!pb-12" containerClassName="!relative" /> 
            </div>
            <Map
                defaultZoom={16}
                center={location}
                className="w-full h-screen opacity-75"
                mapId='5f106ba5b2d1ba7a'
                onTilesLoaded={handleLoad}
                disableDefaultUI={true}
                gestureHandling={'none'}
                keyboardShortcuts={false}
            >
                <AdvancedMarker key='Saint Germain Eventos' position={location}>
                    <Image loading="eager" className="w-16 h-16" src={PinGlyph} ref={glyphRef} alt="Saint German Eventos" />
                </AdvancedMarker>
            </Map>
        </section>
    )    
}