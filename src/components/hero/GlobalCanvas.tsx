"use client";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── STAR FIELD — Hyperspace warp effect ──────────────────────────
function StarField({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [geo, mat] = useMemo(() => {
    const COUNT = 1800;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 30;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#00d4ff"),
      size: 0.05,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    return [geometry, material];
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    const warpSpeed = (0.4 + scrollProgress * 10) * delta;
    const COUNT = arr.length / 3;

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 2] += warpSpeed;
      if (arr[i * 3 + 2] > 20) {
        arr[i * 3]     = (Math.random() - 0.5) * 60;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
        arr[i * 3 + 2] = -60;
      }
    }
    attr.needsUpdate = true;

    // Color lerp cyan → violet as user scrolls
    const c = new THREE.Color("#00d4ff").lerp(new THREE.Color("#a855f7"), scrollProgress);
    mat.color = c;
    mat.size = 0.05 + scrollProgress * 0.1;
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
}

// ── WARP LINES — Hyperspace streaks ──────────────────────────────
function WarpLines({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  const lineGeos = useMemo(() => {
    return Array.from({ length: 120 }, () => {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        -40 + Math.random() * 30
      );
      const end = start.clone().add(new THREE.Vector3(0, 0, 2 + Math.random() * 3));
      const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
      return geo;
    });
  }, []);

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: "#00d4ff",
    transparent: true,
    opacity: 0.0,
  }), []);

  useEffect(() => {
    if (!groupRef.current) return;
    lineGeos.forEach(g => {
      groupRef.current.add(new THREE.Line(g, lineMat));
    });
    return () => { groupRef.current?.clear(); };
  }, [lineGeos, lineMat]);

  useFrame(() => {
    // Warp lines only visible at high scroll speed
    lineMat.opacity = Math.min(scrollProgress * 1.5, 0.35);
  });

  return <group ref={groupRef} />;
}

// ── HOLOGRAPHIC GRID ──────────────────────────────────────────────
function HologramGrid({ scrollProgress }: { scrollProgress: number }) {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame((_, delta) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.y += delta * 0.015;
    gridRef.current.position.y = -4 + scrollProgress * 2;
    gridRef.current.rotation.x = (Math.PI / 2) * 0.55 - scrollProgress * 0.1;
    const opacity = Math.max(1 - scrollProgress * 1.8, 0.1);
    (gridRef.current.material as THREE.Material).opacity = opacity * 0.6;
    (gridRef.current.material as THREE.Material).transparent = true;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[60, 60, "#00d4ff", "#101830"]}
      position={[0, -4, -5]}
      rotation={[Math.PI * 0.5 * 0.55, 0, 0]}
    />
  );
}

// ── NEURAL LATTICE — Neural network sphere ────────────────────────
const NODE_COUNT = 40;
const CONNECTION_DISTANCE = 1.6;

function createNodes(count: number) {
  return Array.from({ length: count }, () =>
    new THREE.Vector3(
      (Math.random() - 0.5) * 3.5,
      (Math.random() - 0.5) * 3.5,
      (Math.random() - 0.5) * 3.5
    )
  );
}

function NeuralLattice({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const nodesRef = useRef(createNodes(NODE_COUNT));
  const velsRef = useRef(
    nodesRef.current.map(() =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004
      )
    )
  );

  const { size } = useThree();
  const isMobile = size.width < 768;

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.045, 6, 6), []);
  const nodeMat = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: "#6366f1",
      emissive: "#6366f1",
      emissiveIntensity: 2.5,
      roughness: 0,
      metalness: 1,
    }), []);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxPairs = NODE_COUNT * (NODE_COUNT - 1);
    const pos = new Float32Array(maxPairs * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  const lineMat = useMemo(() =>
    new THREE.LineBasicMaterial({
      color: "#00d4ff",
      transparent: true,
      opacity: 0.18,
    }), []);

  const coreGeo = useMemo(() => new THREE.SphereGeometry(0.38, 32, 32), []);
  const coreMat = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: "#0a1020",
      emissive: "#6366f1",
      emissiveIntensity: 0.4,
      roughness: 0.05,
      metalness: 1,
      transparent: true,
      opacity: 0.95,
    }), []);

  const wfGeo = useMemo(() => new THREE.IcosahedronGeometry(0.42, 1), []);
  const wfMat = useMemo(() =>
    new THREE.MeshBasicMaterial({
      color: "#00d4ff",
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    }), []);

  const outerWfGeo = useMemo(() => new THREE.SphereGeometry(0.55, 10, 10), []);
  const outerWfMat = useMemo(() =>
    new THREE.MeshBasicMaterial({
      color: "#a855f7",
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    }), []);

  // Add line segments to group imperatively
  const lsRef = useRef<THREE.LineSegments | null>(null);
  useEffect(() => {
    if (!groupRef.current) return;
    const ls = new THREE.LineSegments(lineGeo, lineMat);
    lsRef.current = ls;
    groupRef.current.add(ls);
    return () => { groupRef.current?.remove(ls); };
  }, [lineGeo, lineMat]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.16;
    groupRef.current.rotation.x += delta * 0.035;

    // Position: right side on desktop, center on mobile
    const tX = isMobile ? 0 : 2.3;
    const tY = isMobile ? -0.5 : 0.1;
    const scrollFactor = Math.min(scrollProgress * 2, 1);
    const destX = tX + (isMobile ? 0 : 2) * scrollFactor;
    const destY = tY - scrollFactor * 2.5;
    const destZ = -scrollFactor * 8;

    groupRef.current.position.x += (destX - groupRef.current.position.x) * 0.08;
    groupRef.current.position.y += (destY - groupRef.current.position.y) * 0.08;
    groupRef.current.position.z += (destZ - groupRef.current.position.z) * 0.08;

    // Update nodes
    const nodes = nodesRef.current;
    const vels = velsRef.current;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].add(vels[i]);
      if (nodes[i].length() > 2.2) { vels[i].negate(); nodes[i].add(vels[i]); }
    }

    // Rebuild connections
    const posAttr = lineGeo.attributes.position as THREE.BufferAttribute;
    let idx = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECTION_DISTANCE) {
          posAttr.setXYZ(idx * 2,     nodes[i].x, nodes[i].y, nodes[i].z);
          posAttr.setXYZ(idx * 2 + 1, nodes[j].x, nodes[j].y, nodes[j].z);
          idx++;
        }
      }
    }
    for (let k = idx * 2; k < posAttr.count; k++) posAttr.setXYZ(k, 0, 0, 0);
    posAttr.needsUpdate = true;
    lineGeo.setDrawRange(0, idx * 2);

    // Fade as scroll progresses
    const fade = Math.max(1 - scrollProgress * 2.2, 0);
    nodeMat.emissiveIntensity = 2.5 * fade;
    lineMat.opacity = 0.18 * fade;
    wfMat.opacity = 0.12 * fade;
    outerWfMat.opacity = 0.06 * fade;
    coreMat.opacity = fade * 0.95;
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 2.3, 0, 0]}>
      {nodesRef.current.map((pos, i) => (
        <mesh key={i} geometry={nodeGeo} material={nodeMat}
          position={[pos.x, pos.y, pos.z]} />
      ))}
      <mesh geometry={coreGeo} material={coreMat} />
      <mesh geometry={wfGeo} material={wfMat} />
      <mesh geometry={outerWfGeo} material={outerWfMat} />
      <pointLight color="#00d4ff" intensity={5} distance={6} position={[0,0,0]} />
      <pointLight color="#6366f1" intensity={3} distance={8} position={[1,1,1]} />
    </group>
  );
}

// ── SCENE ─────────────────────────────────────────────────────────
function SciFiScene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.08} />
      <directionalLight position={[3, 5, 3]} intensity={1.2} color="#b8c8e8" />
      <pointLight position={[-5, -3, -4]} intensity={1.5} color="#a855f7" />
      <StarField scrollProgress={scrollProgress} />
      <WarpLines scrollProgress={scrollProgress} />
      <HologramGrid scrollProgress={scrollProgress} />
      <NeuralLattice scrollProgress={scrollProgress} />
    </>
  );
}

// ── GLOBAL CANVAS ─────────────────────────────────────────────────
export default function GlobalCanvas() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollH > 0) setScrollProgress(window.scrollY / scrollH);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <SciFiScene scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
    </div>
  );
}
