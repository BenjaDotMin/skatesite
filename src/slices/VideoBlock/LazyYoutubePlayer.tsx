"use client";

import { KeyTextField } from "@prismicio/client";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  youTubeID: KeyTextField;
};

export function LazyYouTubePlayer({ youTubeID }: VideoProps) {
    const [isInView, setIsInView] = useState(false); //is video visibile? cause component to rerender on change
    const containerRef = useRef<HTMLDivElement>(null); //grab dom element. No rerender on change

    //run on dom ready
    useEffect(() => {
        const currentContainerRef = containerRef.current; //so we dont have to keep adding .current

        const videoObserver = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting){ //is visible (in screen/rootmargin area)
                setIsInView(true);
                console.log("Video nearly in view");
            }
        }, {threshold:0, rootMargin: "1500px"});
        //treshhold means how much of *entry item* is in screen/rootmargin area (0 being 1px in screen/rootmargin area, 1 being fully in screen/rootmargin area)
        //rootmargin adds an "offset" to *window* so the threshold setting will trigger when it enters that area, not just default window size
        
        if(currentContainerRef){ 
            videoObserver.observe(currentContainerRef); //pass in dom element to watch (video)
        }

        //stop watching if unmounted
        return  () => {
            if(currentContainerRef){
                videoObserver.unobserve(currentContainerRef); 
            }
        }
    },[]); 

    return (
        <div className="relative h-full w-full" ref={containerRef}>
            {/* isInview is toggle by intersection observer */}
            {isInView && (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="pointer-events-none h-full w-full border-0"
                />
            )}
        </div>
  );
}