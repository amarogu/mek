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
    reverse?: boolean;
}

export function Parallax({ className, children, speed = 1, id = 'parallax', reverse = false}: ParallaxProps) {
    const trigger = useRef<HTMLDivElement>(null);
    const target = useRef<HTMLDivElement>(null);  
    const timeline = useRef<GSAPTimeline>(); 
    const { width: windowWidth } = useWindowSize() as { width: number };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    
        const setY = gsap.quickSetter(target.current, "y", "px");
        const y = reverse ? (windowWidth * -speed * 0.1) : (windowWidth * speed * 0.1);
    
        timeline.current = gsap.timeline({
          scrollTrigger: {
            id: id,
            trigger: trigger.current,
            scrub: true, 
            start: "top 200",  
            end: "bottom top",
            onUpdate: (e) => {
              setY(e.progress * y);
            },
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