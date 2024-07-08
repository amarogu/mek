import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useContext, useEffect, useRef } from "react";
import Context from "./Context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import PinGlyph from '../../public/icon_marker.svg';
import PinGlyphDark from '../../public/icon_marker_dark.svg';
import BottomTab from "./BottomTab";
import fitty from 'fitty';
import ThemeImage from "./ThemeImage";
import Link from "next/link";

export default function PartyInfo({id}: {id: string}) {
    const {item, isDarkMode} = useContext(Context);

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

    const styling = [
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.natural.landcover",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "stylers": [
            {
              "color": "#f2f2f2"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e6e6e6"
            },
            {
              "weight": 1
            }
          ]
        },
        {
          "featureType": "transit.line",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.station.airport",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]

    const stylingDark = [
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.natural.landcover",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "stylers": [
            {
              "color": '#010101'
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": '#1f1f1f'
            },
            {
              "weight": 1
            }
          ]
        },
        {
          "featureType": "transit.line",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.station.airport",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]

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

    if (!item) return null;

    return (
        <section id={id} style={{opacity: 0}} ref={sectionRef} className="relative pt-8 -z-10">
            <div className='absolute flex flex-col gap-6 z-20 bottom-0 w-full px-8'>
                <h2 className="font-extrabold leading-none container mx-auto">
                    <p ref={fittyTitleRef}>Saint</p>
                    <p ref={fittySubRef} className="uppercase">Germain Eventos</p>
                </h2>
                <BottomTab lastChild={lastChild} omitMiddleChild firstChild={firstChild} noScrollTrigger className="!pb-10" containerClassName="!relative !px-0" /> 
            </div>
            <ThemeImage containerClassName="w-10 xl:w-14 xl:h-14 absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 brightness-150" srcLight={PinGlyph} srcDark={PinGlyphDark} ref={glyphRef} alt="Pin de localização" />
            {
                isDarkMode ? (
                    <Map
                        defaultZoom={16}
                        center={location}
                        className="w-full h-screen"
                        styles={stylingDark}
                        onTilesLoaded={handleLoad}
                        disableDefaultUI={true}
                        gestureHandling={'none'}
                        keyboardShortcuts={false}
                    >
                    </Map>
                ) : (
                    <Map
                        defaultZoom={16}
                        center={location}
                        className="w-full h-screen"
                        styles={styling}
                        onTilesLoaded={handleLoad}
                        disableDefaultUI={true}
                        gestureHandling={'none'}
                        keyboardShortcuts={false}
                    >
                    </Map>
                )
            }
        </section>
    )    
}