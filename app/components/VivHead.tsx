"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";

function HeadModel() {
    const { scene, animations } = useGLTF("/models/viv_head.glb");
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        const idle = actions?.Idle || actions?.idle || actions?.["Armature|Idle"];
        if (idle) idle.play();
    }, [actions]);

    // Move the model DOWN so only the head stays in view
    scene.position.y = -1.5;

    // Scale down so the head fits inside the small canvas
    scene.scale.set(0.8, 0.8, 0.8);


    return <primitive object={scene} />;
}

export function VivHead() {
    return (
        <div className="w-20 h-28 -mt-15">
            <Canvas camera={{ position: [0, 0, 1.4], fov: 25 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 2, 8]} />
                <HeadModel />
            </Canvas>

        </div>
    );
}