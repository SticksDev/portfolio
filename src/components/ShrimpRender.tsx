'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef } from 'react';
import { AsciiRenderer, OrbitControls, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        Mesh_Mesh_head_geo001_lambert2SG001: THREE.Mesh;
    };
    materials: {
        ['lambert2SG.001']: THREE.MeshStandardMaterial;
    };
};

export function ShrimpModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/shrimp_smol.glb') as GLTFResult;
    const groupRef = useRef<THREE.Group>(null!);
    useFrame((state, delta) => (groupRef.current.rotation.z += delta * .5))

    return (
        <group {...props} ref={groupRef} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry}
                material={materials['lambert2SG.001']}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload('/shrimp_smol.glb');

function CameraHelper() {
    const camera = new THREE.PerspectiveCamera(60, 1.77, 1, 3);
    return (
        <group position={[0.5, 40, 8.5]} rotation={new THREE.Euler(-1.5, 0, 0)}>
            <cameraHelper args={[camera]} />
        </group>
    );
}

export default function Shrimp() {
    const eular = new THREE.Euler(-1.5, 0, 0);
    return (
        <>
            <Canvas
                className='shrimp'
                camera={{
                    position: [0.4, 40, 11],
                    rotation: eular,
                    fov: 60,
                    aspect: 1.77,
                    near: 1,
                }}
            >
                <color attach='background' args={['black']} />
                <ambientLight intensity={Math.PI / 2} />
                <ShrimpModel position={[0, -1, 0]} rotation={[0, 0, 0]} />
                <AsciiRenderer fgColor='red' />
            </Canvas>
        </>
    );
}
