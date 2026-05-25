"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField() {
  const meshRef = useRef<THREE.Points>(null!);

  const [geometry, material] = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 16;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color("#6366f1"),
      size: 0.025,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });

    return [geo, mat];
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.03;
      meshRef.current.rotation.x += delta * 0.01;
    }
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}
