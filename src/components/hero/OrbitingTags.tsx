"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const TAGS = [
  "Python",
  "TensorFlow",
  "OpenCV",
  "Gemini API",
  "React.js",
  "YOLOv8",
  "Agentic AI",
  "HTML",
  "CSS",
  "JavaScript",
  "LLMs",
  "SQL",
  "Prompt Engineering"
];

export default function OrbitingTags() {
  const groupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    angleRef.current += delta * 0.4;
  });

  return (
    <group ref={groupRef}>
      {TAGS.map((tag, i) => {
        const baseAngle = (i / TAGS.length) * Math.PI * 2;
        return (
          <OrbitingTag
            key={tag}
            tag={tag}
            index={i}
            baseAngle={baseAngle}
            angleRef={angleRef}
            camera={camera}
          />
        );
      })}
    </group>
  );
}

function OrbitingTag({
  tag,
  index,
  baseAngle,
  angleRef,
  camera,
}: {
  tag: string;
  index: number;
  baseAngle: number;
  angleRef: React.MutableRefObject<number>;
  camera: THREE.Camera;
}) {
  const ref = useRef<THREE.Group>(null!);
  const RADIUS = 2.8;

  useFrame(() => {
    if (!ref.current) return;
    const angle = baseAngle + angleRef.current;
    const x = Math.cos(angle) * RADIUS;
    const z = Math.sin(angle) * RADIUS;
    const y = Math.sin(angleRef.current + index) * 0.3;
    ref.current.position.set(x, y, z);
    ref.current.lookAt(camera.position);
  });

  return (
    <group ref={ref}>
      <Text
        fontSize={0.18}
        color="#00BCD4"
        anchorX="center"
        anchorY="middle"
      >
        {tag}
      </Text>
    </group>
  );
}
