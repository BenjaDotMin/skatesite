"use client";

import { ReactNode, useEffect, useRef } from "react";

//this takes in children (things between the <SlideIn> tags, like a slot)
type Props = {
    children: ReactNode; //children are of type ReactNode, not a string etc
    delay?: number //optional
    duration?: number; //optional
}

//takes in children, delay, duration, with set above
export default function SlideIn({children, delay=0, duration=.6}: Props) {

    //useRef does not trigger component to rerender (useState does)
    const elementRef = useRef<HTMLDivElement>(null);

    //run on dom ready
    useEffect(() => {
        const element = elementRef.current; //so we dont have to add .current to everything
        if(!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    element.style.animation = `slide-in ${duration}s ease ${delay}s forwards`;
                    observer.unobserve(element); //after its done, stop watching
                }
            }, {threshold: 0, rootMargin: "-150px"} //1px within area thats 150px into screen (from bottom)
            //treshhold means how much of *entry item* is in screen/rootmargin area (0 being 1px in screen/rootmargin area, 1 being fully in screen/rootmargin area)
            //rootmargin adds an "offset" to *window* so the threshold setting will trigger when it enters that area, not just default window size
        );

        observer.observe(element); //pass element into observer to watch (div on template/html section below)
        return () => observer.disconnect(); //if unmount, remove listeners (completely remove, not just stop watching like unobserve)
    }, [delay, duration])


  return (
    //start with class that hides it, then when in view intersectionObserver triggers animation in
    <div ref={elementRef} className="slide-in-hidden">
        {/* children is things between <SlideIn> tags, like a slot */}
        {children}
    </div>
  )
}