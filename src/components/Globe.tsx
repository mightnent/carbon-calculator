import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function Globe(){
    const globe = useGLTF('./earth.glb');

    const globeRef = useRef<any>();
    const rotationSpeed = 0.002;
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState([0,5,0]);

    useEffect(() => {
        function handleResize() {
          const screenWidth = window.innerWidth;
    
          // Adjust scale based on screen width
          if (screenWidth < 600) {
            setScale(0.6);
            setPosition([0,3,0]);
          } else {
            setScale(0.4);
            setPosition([0,5,0]);
          }
        }
    
        // Initial resize
        handleResize();
    
        // Event listener for window resize
        window.addEventListener("resize", handleResize);
    
        // Cleanup event listener
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    useFrame(() => { 
        if(globeRef.current){
            globeRef.current.rotation.y += rotationSpeed;
        }
    })

    return(
        <>
            <primitive
                object={globe.scene}
                ref={globeRef}
                scale={scale}
                position={position}
            
            />
        </>
    )
}