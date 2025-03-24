"use client";

import * as THREE from "three";
import { CameraControls, Environment, Preload, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { useCustomiserControls } from "./context";
import { asImageSrc } from "@prismicio/client";
import { Skateboard } from "../components/Skateboard";

const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.png";
const DEFAULT_TRUCK_COLOR = "#6f6e6a";
const DEFAULT_BOLT_COLOR = "#6f6e6a";
const ENVIRONMENT_COLOR = "#3b3a3a";

type Props = {
    wheelTextureURLs: string[];
    deckTextureURLs: string[];
}

export default function Preview({wheelTextureURLs, deckTextureURLs}: Props) {

    const cameraControls = useRef<CameraControls>(null);
    const floorRef = useRef<THREE.Mesh>(null);

    const {selectedWheel, selectedBolt, selectedDeck, selectedTruck} = useCustomiserControls(); //pull out from here

    const wheelTextureURL = asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
    const deckTextureURL = asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
    const truckColor = selectedTruck?.color ?? DEFAULT_TRUCK_COLOR;
    const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;

    function setCameraControls(target: THREE.Vector3, pos: THREE.Vector3){
        //camera controls somes from three/drei
        if(!cameraControls.current) return;
        cameraControls.current.setTarget(target.x, target.y, target.z, true); //true = enable transition
        cameraControls.current.setPosition(pos.x, pos.y, pos.z, true); //true = enable transition
    }

    
    useEffect(() => {
        setCameraControls(
            new THREE.Vector3(0, .3, 0), //look at 
            new THREE.Vector3(1.5, .8, 0) //position
        )
    }, [selectedDeck]);  //everytime selectedDeck changes, run this

    useEffect(() => {
        setCameraControls(
            new THREE.Vector3(-.12, .29, .57), //look at
            new THREE.Vector3(.1, .25, .9) //position
        )
    }, [selectedTruck]);  //everytime selectedTruck changes, run this

    useEffect(() => {
        setCameraControls(
            new THREE.Vector3(-.08, .54, .64), //look at
            new THREE.Vector3(.09, 1, .9) //position
        )
    }, [selectedWheel]);  //everytime selectedWheel changes, run this

    useEffect(() => {
        setCameraControls(
            new THREE.Vector3(-.25, .3, .62), //look at
            new THREE.Vector3(-.5, .35, .8) //position
        )
    }, [selectedBolt]);  //everytime selectedBolt changes, run this




    function onCameraControlsStart(){
        if(!cameraControls.current || !floorRef.current || cameraControls.current.colliderMeshes.length > 0) return;
        cameraControls.current.colliderMeshes = [floorRef.current];
    }

  return (
    <Canvas shadows camera={{position:[2.5, 1, 0], fov:50}}>
        {/* wait for data inside to load */}
        <Suspense fallback={null}>

            <Environment files={"/hdr/warehouse-512.hdr"} environmentIntensity={.6}></Environment>
            {/* added directional light too, just for drop shadow */}
            <directionalLight castShadow lookAt={[0, 0, 0]} position={[1, 1, 1]} intensity={1.6}></directionalLight>

            {/* to stop hard edges on floor, we use fog for "draw distance" */}
            <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 10]}></fog>
            <color attach="background" args={[ENVIRONMENT_COLOR]}></color>

            <StageFloor></StageFloor>
        
            <mesh ref={floorRef} rotation={[-Math.PI/2, 0, 0]}> {/* create a plane just for camera to hit */}
                <planeGeometry args={[6, 6]}></planeGeometry>
                <meshBasicMaterial visible={false}></meshBasicMaterial>
            </mesh>

            <Skateboard pose="side" wheelTextureURLs={wheelTextureURLs} wheelTextureURL={wheelTextureURL} deckTextureURLs={deckTextureURLs} deckTextureURL={deckTextureURL} truckColour={truckColor} boltColour={boltColor}></Skateboard>
            
            {/* like orbit controls, but it wont clip geometry like walls, floors etc...set to not zoom too close, or too far away */}
            <CameraControls ref={cameraControls} minDistance={.2} maxDistance={4} onStart={onCameraControlsStart}></CameraControls>
        </Suspense>

        {/* preload everything when possible */}
        <Preload all/>
    </Canvas>
  )
}


//floor plane
function StageFloor(){
    const normalMap = useTexture("/concrete-normal.avif");
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(30, 30);
    normalMap.anisotropy = 8;

    const material = new THREE.MeshStandardMaterial({
        roughness: .75,
        color: ENVIRONMENT_COLOR,
        normalMap: normalMap //like bumpmap but for light
    });

    return (
        //added material as a var, rather than inside the mesh tags
        <mesh material={material} castShadow receiveShadow position={[0, -.005, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <circleGeometry args={[20, 32]}></circleGeometry>
        </mesh>
    )
}
