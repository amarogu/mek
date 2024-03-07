"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useWindowSize } from "@studio-freight/hamo";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxProps {
    className?: string;
    children: React.ReactNode;
    speed?: number;
    id?: string;
}

export function Parallax({ className, children, speed = 1, id = 'parallax'}: ParallaxProps) {
    const trigger = useRef<HTMLDivElement>(null);
    const target = useRef<HTMLDivElement>(null);  
    const timeline = useRef<GSAPTimeline>(); 
    const { width: windowWidth } = useWindowSize() as { width: number };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    
        const y = windowWidth * speed * 0.1;
        const setY = gsap.quickSetter(target.current, "y", "px");
    
        timeline.current = gsap.timeline({
          scrollTrigger: {
            id: id,
            trigger: trigger.current,
            scrub: true, 
            start: "top center",  
            end: "bottom top", 
            onUpdate: (e) => {
              setY(e.progress * y);
            },
            markers: true
          },
        });
    
        return () => {
          timeline?.current?.kill(); 
        };
      }, [id, speed, windowWidth]);
  
    return (
      <div ref={trigger} className={className}>
        <div ref={target}>{children}</div>
      </div>
    );
  }