"use client";

import { ImageField } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
    foregroundImage: ImageField;
    backgroundImage: ImageField;
    className?: string
}

//just like passing things in, except it as :Props on the end, and that says what the types wil be
export function ParallaxImage({foregroundImage, backgroundImage, className}: Props) {

  //select dom elements like this
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  //using useRef and not useState, because useState causes *this component* to rerender when it changes, but useRef does not (we only want to change value to animate, not cause a rerender)
  const targetPosition = useRef({x:0, y:0}); //start as an object, with xy 0
  const currentPosition = useRef({x:0, y:0}); //move towards this (will get updated on mouse move)



  //run this code after template(html section)
  useEffect(() => {
    const frameId = requestAnimationFrame(animationFrame); //start animation loop //store in a var, so we can grab and cancel it later 
   
    window.addEventListener("mousemove", onMouseMove); //run onMouseMove when moving mouse

    function onMouseMove(e:MouseEvent){
      const {innerWidth, innerHeight} = window; //get innerWidth and innerHeight from window (destructure)
      const xPercent = (e.clientX / innerWidth - 0.5) * 2; //range -1 to 1
      const yPercent = (e.clientY / innerHeight - 0.5) * 2;
      //console.log({xPercent}); //object for easier output
      targetPosition.current = {x:xPercent*-20, y:yPercent*-20}; //*-20 to make a smaller number to move image by
    }

    function animationFrame(){
      const {x:targetX, y:targetY} = targetPosition.current; //take x and y from targetPosition(destructure), but rename them as targetX/Y
      const {x:currentX, y:currentY} = currentPosition.current; //take x and y from currentPosition(destructure), but rename them as currentX/Y
      const newX = currentX + (targetX - currentX) * .1; //lerp towards
      const newY = currentY + (targetY - currentY) * .1; //lerp towards
      currentPosition.current = {x:newX, y:newY}; //update currentPosition values
      if(backgroundRef.current){
        backgroundRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
      if(foregroundRef.current){
        foregroundRef.current.style.transform = `translate(${newX*2.5}px, ${newY*2.5}px)`; //2.5 to move more (parallax)
      }
      requestAnimationFrame(animationFrame); //re-call self and 60fps (when idle)
    }

    return () => {window.addEventListener("mousemove", onMouseMove); cancelAnimationFrame(frameId);} //remove event listener when component unmounts(fix memory leaks)
  }, []); //empty brackets means run once (on dom ready)



  return (
    <div className={clsx("grid grid-cols-1 place-items-center", className)}>
       <div ref={backgroundRef} className="col-start-1 row-start-1 transition-transform">
        <PrismicNextImage alt="" field={backgroundImage} className="w-11/12"/>
       </div>
       <div ref={foregroundRef} className="col-start-1 row-start-1 transition-transform h-full w-full place-items-center">
        {/* use imigix to request same image, but at different dimensions */}
        <PrismicNextImage alt="" field={foregroundImage} imgixParams={{height:600}} className="h-full max-h-[500px] w-auto" />
       </div>       
    </div>
  )
}

