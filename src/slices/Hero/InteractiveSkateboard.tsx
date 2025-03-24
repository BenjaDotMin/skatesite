"use client";
import * as THREE from "three";
import { Skateboard } from "@/app/components/Skateboard";
import { ContactShadows, Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import gsap from "gsap";
import { HotSpot } from "./HotSpot";
import { WavyPaths } from "./WavyPaths";

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const;

type Props = {
    deckTextureURL: string,
    wheelTextureURL: string,
    truckColour: string,
    boltColour: string,
}

//expects types set above 
export function InteractiveSkateboard({deckTextureURL, wheelTextureURL, truckColour, boltColour}: Props) {
  return (
    <div className="absolute inset-10 flex items-center justify-center">
        {/* canvas from three-fibre, camera, xyz */}
        <Canvas className="min-h-[60] w-full" camera={{position: INITIAL_CAMERA_POSITION, fov:55}}> 

            {/* wait for everything inside this to be ready */}
            <Suspense>
                {/* use scene from below (pass things in) */}
                <Scene deckTextureURL={deckTextureURL} wheelTextureURL={wheelTextureURL} truckColour={truckColour} boltColour={boltColour}></Scene>
            </Suspense>

        </Canvas>
    </div>
  )
}

//<Scene/> tag (takes in these, that expect types set above)
function Scene({deckTextureURL, wheelTextureURL, truckColour, boltColour}: Props){
    const containerRef = useRef<THREE.Group>(null);
    const originRef = useRef<THREE.Group>(null);

    //each item in object has a boolean by default
    const [hotSpot, setHotSpot] = useState({front: true, middle: true, back: true});
    const [animating, setAnimating] = useState(false); //if animating, do not animatate again

    const {camera} = useThree(); //pull camera out of three

    //weave board side to side
    useEffect(() => {
        if(!containerRef.current || !originRef.current) return;
        gsap.to(containerRef.current.position, {x: .2, duration:3, repeat:-1, yoyo:true, ease: "sine.inOut"});
        gsap.to(originRef.current.rotation, {y: Math.PI/64, duration:3, repeat:-1, yoyo:true, ease: "sine.inOut"})
    },[]);

    useEffect(() => {
        camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0)); //point camera at this position xyz

        function setZoom(){
            const scale = Math.max(Math.min(1000/window.innerWidth, 2.2), 1); //as window shrinks, zoom camera out
            camera.position.x = INITIAL_CAMERA_POSITION[0]*scale;
            camera.position.y = INITIAL_CAMERA_POSITION[1]*scale;
            camera.position.z = INITIAL_CAMERA_POSITION[2]*scale;
        }
        setZoom();
        window.addEventListener("resize", setZoom); //rerun on resize

        return () => window.removeEventListener("resize", setZoom); //remove listener on unmount
    }, [camera]);

    function onClick(e: ThreeEvent<MouseEvent>) {
        e.stopPropagation(); //stop click "drilling" through all sides of a mesh, hit first surface and stop
        const board = containerRef.current; //skateboard group
        if(!board) return;

        const {name} = e.object; //pull name out of e.object for *this event* (front/middle/back)
        const origin = originRef.current; //is origin in center, for tricks?

        if(!board || !origin || animating) return; //check both exist before going further...or if its animating, stop here

        //set whether front/middle/back hotSpot is visible or not (depending on trick)
        setHotSpot(current => ({...current, [name]: false})); //set one that matches name to false, leave others alone

        if(name === "back"){
            ollie(board); //jump + rotate x 
        }else if (name === "middle"){
            kickflip(board); //jump + rotate x/z 
        }else if (name === "front"){ 
            frontside360(board, origin) //jump + rotate x/y 
        }

        function jumpForward(board: THREE.Group){
            setAnimating(true); //set animating to true, so it doesnt get through the if statement above
            //click animation, y movement
            gsap.timeline({onComplete: () => setAnimating(false)}) //when animating is done, set to false,, so it gets through the if statement above
            .to(board.position, {y: .8, duration: .51, ease: "power2.out", delay: .26})
            .to(board.position, {y: 0, duration: .43, ease: "power2.in"});
        }

        function ollie(board: THREE.Group){
            jumpForward(board); //reuse jump animation           
            //at the same time run this animatin, which does the x rotation (wheelie)
            gsap.timeline()
            .to(board.rotation, {x:-.6, duration: .26, ease: "none"})
            .to(board.rotation, {x:.4, duration: .82, ease: "power2.in"})
            .to(board.rotation, {x:0, duration: .12, ease: "none"});
        }

        function kickflip(board: THREE.Group){
            jumpForward(board); //reuse jump animation           
            //at the same time run this animatin, which does the x/z rotation (wheelie)
            gsap.timeline()
            .to(board.rotation, {x:-.6, duration: .26, ease: "none"})
            .to(board.rotation, {x:.4, duration: .82, ease: "power2.in"})
            .to(board.rotation, {z: `+=${Math.PI*2}`, duration: .78, ease: "none"}, .3) //math.PI*2 rotates 360, but start this line .3 seconds *from start of whole animation*, not line before....... ("-=.3") ect can start it .3s from before the *current* line
            .to(board.rotation, {x:0, duration: .12, ease: "none"});
        }

        function frontside360(board: THREE.Group, origin:THREE.Group){
            jumpForward(board); //reuse jump animation           
            //at the same time run this animatin, which does the x/y rotation (wheelie)
            gsap.timeline()
            .to(board.rotation, {x:-.6, duration: .26, ease: "none"})
            .to(board.rotation, {x:.4, duration: .82, ease: "power2.in"})
            .to(origin.rotation, {y: `+=${Math.PI*2}`, duration: .77, ease: "none"}, .3) //math.PI*2 rotates 360, but start this line .3 seconds *from start of whole animation*, not line before....... ("-=.3") ect can start it .3s from before the *current* line
            .to(board.rotation, {x:0, duration: .14, ease: "none"});
        }    
    };

    return(

        //group up items, like layers/divs
        <group>
            {/* enable controls */}
            {/* <OrbitControls/> */}

            {/* lighting */}
            {/* instead of lights, we can use an "image" to light our scenen background shows img(optional) */}
            {/* <Environment preset="sunset" background/> */}
            {/* use our own file instead: */}            
            <Environment files={"/hdr/warehouse-256.hdr"}/>

            {/*mesh is geometry + material */}
            {/* <mesh> */}
                {/* meshStandardMaterial require lights/enviroment(hdr) in a scene, or it shows up black (meshBasicMaterial doesnt, but that doesnt react to light at all, so use whats needed) */}
                {/* <meshStandardMaterial/>
                <boxGeometry/> */}
            {/* </mesh> */}

            {/* group for origin middle hack (when board origin needs to be from middle, not back wheels) */}
            <group ref={originRef}>
           
                {/* groups are positioned over the back wheels */}
                <group ref={containerRef}  position={[-0.25, 0, -0.635]}>
                    <group position={[0, -0.086, 0.635]}>                
                        <Skateboard constantWheelSpin wheelTextureURLs={[wheelTextureURL]} wheelTextureURL={wheelTextureURL} deckTextureURLs={[deckTextureURL]} deckTextureURL={deckTextureURL} truckColour={truckColour} boltColour={boltColour}/>

                        <HotSpot isVisible={!animating && hotSpot.front} position={[0, .38, 1]} color="#B8FC39"></HotSpot>

                        {/* front click trigger, not the whole skateboard shape */}
                        <mesh position={[0, .27, 0.9]} name="front" onClick={onClick}>
                            <boxGeometry args={[0.6, 0.2, .58]} />
                            <meshStandardMaterial visible={false}/>
                        </mesh>

                        <HotSpot isVisible={!animating && hotSpot.middle} position={[0, .33, 0]} color="#FF7A51"></HotSpot>

                        {/* middle click trigger, not the whole skateboard shape */}
                        <mesh position={[0, .27, 0]} name="middle" onClick={onClick}>
                            <boxGeometry args={[0.6, 0.1, 1.2]} />
                            <meshStandardMaterial visible={false}/>
                        </mesh>

                        <HotSpot isVisible={!animating && hotSpot.back} position={[0, .35, -.9]} color="#46ACFA"></HotSpot>

                        {/* back click trigger, not the whole skateboard shape */}
                        <mesh position={[0, .27, -0.9]} name="back" onClick={onClick}>
                            <boxGeometry args={[0.6, 0.2, .58]} />
                            <meshStandardMaterial visible={false}/>
                        </mesh>
                        
                    </group>
                </group>

            </group>

            {/* enable shadows, move it down on y */}
            <ContactShadows opacity={0.6} position={[0, -0.08, 0]}/>

            {/* plane for wavy lines to animate on */}
            <group rotation={[-Math.PI/2, 0, -Math.PI/2]} position={[0, -.09, -0.5]} scale={[0.2, 0.2, 0.2]}>
                {/* from drei, not Next */}
                <Html wrapperClass="pointer-events-none" transform zIndexRange={[2, 0]} occlude="blending">
                    {/* use our component, its just a bunch of svgs*/}
                    <WavyPaths/>
                </Html>
            </group>
        </group>
    )
}