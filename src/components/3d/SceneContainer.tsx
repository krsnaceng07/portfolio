'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

function SceneContent() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="city" />

            <group rotation={[0, 0, 0]} scale={1.5}>
                {/* Shield Base */}
                <mesh>
                    <dodecahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} wireframe={false} />
                </mesh>

                {/* Wireframe Overlay */}
                <mesh scale={1.05}>
                    <dodecahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#00ff88" wireframe transparent opacity={0.3} />
                </mesh>

                {/* Floating Nodes */}
                <mesh position={[1.5, 0, 0]}>
                    <octahedronGeometry args={[0.2, 0]} />
                    <meshStandardMaterial color="#00ccff" wireframe />
                </mesh>
                <mesh position={[-1.5, 0, 0]}>
                    <octahedronGeometry args={[0.2, 0]} />
                    <meshStandardMaterial color="#00ccff" wireframe />
                </mesh>
            </group>

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} enablePan={false} />
        </>
    );
}

export default function SceneContainer() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <SceneContent />
                </Suspense>
            </Canvas>
        </div>
    );
}
