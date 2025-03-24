import { Billboard } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

//interchangable with Type (Props), use either
interface HotSpotPops {
    position: [number, number, number];
    isVisible: boolean;
    color?: string; //optional
}

export function HotSpot({position, isVisible, color="#E6FC6A"}:HotSpotPops) {

    const hotspotRef = useRef<THREE.Mesh>(null);


  return (
    //items in Billboard (drei) always faces the camera, to keep things flat even when camera rotates
    <Billboard position={position} follow={true}>

        {/* mesh is geometry + material */}
        <mesh ref={hotspotRef} visible={isVisible}>
            {/* flat, not a sphere */}
            <circleGeometry args={[.02, 32]}></circleGeometry>
            <meshStandardMaterial color={color} transparent opacity={1}></meshStandardMaterial>
        </mesh>

        {/* on hover, change to hand icon */}
        <mesh visible={isVisible} onPointerOver={() => document.body.style.cursor = "pointer"} onPointerOut={() => document.body.style.cursor = "default"}>
            {/* flat, not a sphere */}
            <circleGeometry args={[.03, 32]}></circleGeometry>
            <meshBasicMaterial color={color}></meshBasicMaterial>
        </mesh>

    </Billboard>
  )
}