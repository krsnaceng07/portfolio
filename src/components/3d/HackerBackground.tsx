
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useScroll, useTransform } from 'framer-motion';

function CyberParticles(props: any) {
    const ref = useRef<any>();
    // Generate 5000 positions in a sphere
    const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

    useFrame((state, delta) => {
        if (ref.current) {
            // Constant rotation
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;

            // "Breathing" scale effect based on time
            const t = state.clock.getElapsedTime();
            ref.current.scale.setScalar(1 + Math.sin(t / 2) * 0.1);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00ff41" // Hacker Green
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

function GridParams() {
    useFrame(({ clock, camera }) => {
        // Subtle camera movement
        const t = clock.getElapsedTime();
        camera.position.z = 3 + Math.sin(t * 0.2) * 0.2;
    });
    return null;
}

export default function HackerBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
                {/* Ambient environment */}
                <fog attach="fog" args={['#000', 2, 6]} />
                <GridParams />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <CyberParticles />
                </Float>
            </Canvas>
        </div>
    );
}
