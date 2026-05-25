"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 55;
const CONNECTION_DISTANCE = 2.0;
const BOUND = 2.6;

function createNodes(count: number) {
  return Array.from({ length: count }, () =>
    new THREE.Vector3(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5
    )
  );
}

export default function NeuralCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const nodesRef = useRef(createNodes(NODE_COUNT));
  const velocitiesRef = useRef(
    nodesRef.current.map(
      () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004
        )
    )
  );

  /* ── Geometries & materials ── */
  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.06, 8, 8), []);
  const nodeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#6366f1",
        emissive: "#6366f1",
        emissiveIntensity: 1.1,
        roughness: 0.2,
        metalness: 0.8,
      }),
    []
  );

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxPairs = NODE_COUNT * (NODE_COUNT - 1);
    const pos = new Float32Array(maxPairs * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#6366f1",
        transparent: true,
        opacity: 0.2,
      }),
    []
  );

  const coreGeo = useMemo(() => new THREE.SphereGeometry(0.44, 32, 32), []);
  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4f46e5",
        emissive: "#6366f1",
        emissiveIntensity: 0.55,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.88,
      }),
    []
  );

  const wfGeo = useMemo(() => new THREE.SphereGeometry(0.46, 14, 14), []);
  const wfMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#06b6d4",
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    []
  );

  /* ── Imperative line segments object ── */
  useEffect(() => {
    if (!groupRef.current) return;
    const ls = new THREE.LineSegments(lineGeo, lineMat);
    linesRef.current = ls;
    groupRef.current.add(ls);
    return () => {
      groupRef.current?.remove(ls);
    };
  }, [lineGeo, lineMat]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.16;
    groupRef.current.rotation.x += delta * 0.035;

    const nodes = nodesRef.current;
    const vels = velocitiesRef.current;

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].add(vels[i]);
      if (nodes[i].length() > BOUND) {
        vels[i].negate();
        nodes[i].add(vels[i]);
      }
    }

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
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodesRef.current.map((pos, i) => (
        <mesh
          key={i}
          geometry={nodeGeo}
          material={nodeMat}
          position={[pos.x, pos.y, pos.z]}
        />
      ))}

      {/* Core */}
      <mesh geometry={coreGeo} material={coreMat} />
      <mesh geometry={wfGeo} material={wfMat} />

      {/* Lighting */}
      <pointLight color="#6366f1" intensity={4} distance={9} position={[0, 0, 0]} />
      <pointLight color="#06b6d4" intensity={2} distance={11} position={[3, 3, 3]} />
      <pointLight color="#a78bfa" intensity={1.5} distance={8} position={[-3, -2, 2]} />
    </group>
  );
}
