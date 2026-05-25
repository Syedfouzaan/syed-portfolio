"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import NeuralCore from "./NeuralCore";
import ParticleField from "./ParticleField";

function Fallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "1px solid rgba(99,102,241,0.35)",
          boxShadow: "0 0 40px rgba(99,102,241,0.15)",
        }}
      />
    </div>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 52 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.2} />
          <NeuralCore />
          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  );
}
