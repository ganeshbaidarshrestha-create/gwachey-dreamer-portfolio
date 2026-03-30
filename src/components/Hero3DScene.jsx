import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Sparkles, Text } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

const FINAL_LINES = ["Where", "Silence Glows,", "Dreams Learn", "to Breathe."];
const LETTERS = FINAL_LINES.flatMap((line, lineIndex) =>
  line.split("").map((char, charIndex) => ({ char, lineIndex, charIndex })),
);

function seededUnit(seed) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function seededSigned(seed) {
  return seededUnit(seed) * 2 - 1;
}

function getCharacterAdvance(char) {
  return char === " " ? 0.18 : 0.24;
}

function computeTargetPosition(line, lineIndex, charIndex) {
  const characters = line.split("");
  const advances = characters.map((char) => getCharacterAdvance(char));
  const width = Math.max(
    0,
    advances.slice(0, -1).reduce((total, advance) => total + advance, 0),
  );
  const xOffset = advances.slice(0, charIndex).reduce((total, advance) => total + advance, 0);
  const x = xOffset - width / 2 + 3.15;
  const yOffsets = [1.9, 1.05, 0.2, -0.58];
  const zOffsets = [0.34, 0.14, -0.02, -0.16];
  const y = yOffsets[lineIndex] ?? 0;
  const z = zOffsets[lineIndex] ?? 0;

  return new THREE.Vector3(x, y, z);
}

function createLetterData() {
  return LETTERS.map(({ char, lineIndex, charIndex }, index) => {
    const line = FINAL_LINES[lineIndex];
    const seedBase = index * 17.173 + lineIndex * 11.91 + charIndex * 5.37;

    return {
      char,
      key: `${char}-${lineIndex}-${charIndex}-${index}`,
      size: char === " " ? 0.05 : 0.22,
      start: new THREE.Vector3(
        seededSigned(seedBase + 1) * 9 + (seededUnit(seedBase + 2) > 0.5 ? 4.2 : -4.2),
        seededSigned(seedBase + 3) * 6,
        seededSigned(seedBase + 4) * 8,
      ),
      orbit: new THREE.Vector3(
        seededSigned(seedBase + 5) * 0.82,
        seededSigned(seedBase + 6) * 0.56,
        seededSigned(seedBase + 7) * 0.9,
      ),
      target: computeTargetPosition(line, lineIndex, charIndex),
      velocity: new THREE.Vector3(
        seededSigned(seedBase + 8) * 0.04,
        seededSigned(seedBase + 9) * 0.035,
        seededSigned(seedBase + 10) * 0.04,
      ),
      rotationSeed: seededUnit(seedBase + 11) * Math.PI * 2,
      driftSeed: seededUnit(seedBase + 12) * 1000,
    };
  });
}

function useFormationPhase(reducedMotion) {
  const [formation, setFormation] = useState(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (reducedMotion) {
      setFormation(1);
      return undefined;
    }

    let animationFrame;
    const start = performance.now();
    const duration = 6200;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setFormation(eased);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [reducedMotion]);

  return formation;
}

function LetterMesh({ letter, index, formation, reducedMotion, quality }) {
  const groupRef = useRef(null);
  const materialRef = useRef(null);
  const chaoticOffset = useRef(new THREE.Vector3());
  const gatherTarget = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const group = groupRef.current;
    const material = materialRef.current;

    if (!group || !material) return;

    const time = state.clock.getElapsedTime();
    const gatherProgress = THREE.MathUtils.smoothstep(formation, 0.18, 0.58);
    const finalProgress = THREE.MathUtils.smoothstep(formation, 0.52, 1);

    chaoticOffset.current.set(
      Math.sin(time * 0.42 + letter.driftSeed) * 0.8,
      Math.cos(time * 0.34 + letter.driftSeed * 0.8) * 0.52,
      Math.sin(time * 0.24 + letter.driftSeed) * 0.9,
    );

    gatherTarget.current.copy(letter.target).add(letter.orbit);
    target.current.copy(letter.start).lerp(gatherTarget.current, gatherProgress).lerp(letter.target, finalProgress);

    if (!reducedMotion) {
      const driftStrength = 1 - finalProgress;
      target.current.addScaledVector(chaoticOffset.current, driftStrength);
      group.position.x += letter.velocity.x * (0.24 + Math.sin(time + index) * 0.08) * quality.motionScale;
      group.position.y += letter.velocity.y * (0.28 + Math.cos(time * 0.6 + index) * 0.08) * quality.motionScale;
      group.position.z += letter.velocity.z * (0.26 + Math.sin(time * 0.4 + index) * 0.1) * quality.motionScale;
    }

    group.position.lerp(target.current, delta * THREE.MathUtils.lerp(0.9, 2.8, finalProgress));
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      reducedMotion ? 0 : (1 - finalProgress) * Math.sin(time * 0.35 + letter.rotationSeed) * 0.28 * quality.motionScale,
      delta * 1.8,
    );
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      reducedMotion ? 0 : (1 - finalProgress) * Math.cos(time * 0.32 + letter.rotationSeed) * 0.38 * quality.motionScale,
      delta * 1.8,
    );
    group.rotation.z = THREE.MathUtils.lerp(
      group.rotation.z,
      reducedMotion ? 0 : (1 - finalProgress) * Math.sin(time * 0.28 + letter.rotationSeed) * 0.16 * quality.motionScale,
      delta * 1.8,
    );

    material.emissiveIntensity = THREE.MathUtils.lerp(0.24, 0.92, finalProgress);
    material.opacity = THREE.MathUtils.lerp(0.72, 1, gatherProgress + finalProgress * 0.2);
  });

  return (
    <group ref={groupRef} position={letter.start.toArray()}>
      <Text
        fontSize={letter.size}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.98}
        outlineWidth={0.01}
        outlineColor="#cbd8f7"
        maxWidth={10}
      >
        {letter.char}
        <meshStandardMaterial
          ref={materialRef}
          transparent
          color="#eef4ff"
          emissive="#8baeff"
          emissiveIntensity={0.4}
          metalness={0.2}
          roughness={0.08}
        />
      </Text>
    </group>
  );
}

function AnimatedLetters({ reducedMotion, quality }) {
  const formation = useFormationPhase(reducedMotion);
  const letters = useMemo(() => createLetterData(), []);

  return letters.map((letter, index) => (
    <LetterMesh
      key={letter.key}
      letter={letter}
      index={index}
      formation={formation}
      reducedMotion={reducedMotion}
      quality={quality}
    />
  ));
}

function ParticleField({ reducedMotion, quality }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.014 * quality.motionScale;
    groupRef.current.rotation.x = Math.sin(time * 0.12) * 0.028 * quality.motionScale;
  });

  return (
    <group ref={groupRef}>
      <Sparkles
        count={quality.primarySparkles}
        scale={[16, 9, 12]}
        size={quality.sparkleSize}
        speed={reducedMotion ? 0.05 : 0.14}
        opacity={0.32}
        color="#adc6ff"
      />
      <Sparkles
        count={quality.secondarySparkles}
        scale={[11, 6, 8]}
        size={quality.sparkleSize + 0.35}
        speed={reducedMotion ? 0.03 : 0.09}
        opacity={0.18}
        color="#ffffff"
      />
    </group>
  );
}

function LightVeil({ reducedMotion, quality }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.z = Math.sin(time * 0.15) * 0.045 * quality.motionScale;
    meshRef.current.material.opacity = 0.06 + Math.sin(time * 0.2) * 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.3, -2.8]}>
      <planeGeometry args={[16, 10]} />
      <meshBasicMaterial color="#6e93e6" transparent opacity={0.06} />
    </mesh>
  );
}

function CameraRig({ reducedMotion, quality, isActive }) {
  useFrame((state) => {
    if (!isActive) return;
    const time = state.clock.getElapsedTime();
    const targetX = reducedMotion ? 1.2 : 1.26 + Math.sin(time * 0.12) * 0.07 * quality.motionScale;
    const targetY = reducedMotion ? 0.28 : 0.34 + Math.cos(time * 0.1) * 0.06 * quality.motionScale;
    const targetZ = reducedMotion ? 8.55 : 8.45 + Math.sin(time * 0.08) * 0.06 * quality.motionScale;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.03);
    state.camera.lookAt(3.2, 0.65, 0);
  });

  return null;
}

function Scene({ reducedMotion, quality, isActive }) {
  return (
    <>
      <fog attach="fog" args={["#040507", 8, 19]} />
      <ambientLight intensity={0.5} color="#b9cbf9" />
      <directionalLight position={[2.8, 3.5, 5.5]} intensity={1.45} color="#f5f9ff" />
      <pointLight position={[-5, 0, 4]} intensity={2.35} color="#6f96ff" />
      <pointLight position={[4, 2, -1]} intensity={0.95} color="#9dc4ff" />
      <LightVeil reducedMotion={reducedMotion} quality={quality} />
      <Center position={[1.2, 0.7, 0]}>
        <AnimatedLetters reducedMotion={reducedMotion} quality={quality} />
      </Center>
      <ParticleField reducedMotion={reducedMotion} quality={quality} />
      <CameraRig reducedMotion={reducedMotion} quality={quality} isActive={isActive} />
    </>
  );
}

function useHeroQuality(reducedMotion) {
  const [quality, setQuality] = useState(() => ({
    dpr: [1, reducedMotion ? 1.05 : 1.4],
    antialias: !reducedMotion,
    primarySparkles: reducedMotion ? 20 : 42,
    secondarySparkles: reducedMotion ? 10 : 20,
    sparkleSize: reducedMotion ? 1 : 1.2,
    motionScale: reducedMotion ? 0 : 1,
  }));
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const updateQuality = () => {
      const width = window.innerWidth;
      const isCompact = width < 768;
      const isMid = width >= 768 && width < 1280;

      setQuality({
        dpr: [1, reducedMotion ? 1.05 : isCompact ? 1.1 : isMid ? 1.25 : 1.5],
        antialias: !reducedMotion && width >= 768,
        primarySparkles: reducedMotion ? 20 : isCompact ? 24 : isMid ? 34 : 46,
        secondarySparkles: reducedMotion ? 10 : isCompact ? 10 : isMid ? 14 : 22,
        sparkleSize: isCompact ? 1 : 1.2,
        motionScale: reducedMotion ? 0 : isCompact ? 0.72 : isMid ? 0.86 : 1,
      });
    };

    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState !== "hidden");
    };

    updateQuality();
    updateVisibility();
    window.addEventListener("resize", updateQuality);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      window.removeEventListener("resize", updateQuality);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [reducedMotion]);

  return { quality, isDocumentVisible };
}

export function Hero3DScene({ className = "" }) {
  const reducedMotion = useReducedMotion();
  const { quality, isDocumentVisible } = useHeroQuality(reducedMotion);
  const [isReady, setIsReady] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const supportsWebGL =
      typeof window !== "undefined" &&
      !!window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));

    setWebglAvailable(Boolean(supportsWebGL));
  }, []);

  if (!webglAvailable) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-black/20 to-black/30">
        <div className="max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-soft backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.38em] text-slate">Atmosphere</p>
          <p className="mt-4 font-display text-3xl text-white">
            Where Silence Glows, Dreams Learn to Breathe.
          </p>
          <p className="mt-4 text-base leading-8 text-slate">
            The cinematic letter field is unavailable on this device, so the site shifts into a
            quieter still-life composition instead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {!isReady ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.35em] text-slate backdrop-blur">
            Summoning the phrase...
          </div>
        </div>
      ) : null}

      <Canvas
        gl={{ alpha: true, antialias: quality.antialias, powerPreference: "high-performance" }}
        dpr={quality.dpr}
        camera={{ position: [0, 0.05, 8.9], fov: 40 }}
        frameloop={isDocumentVisible ? "always" : "demand"}
        performance={{ min: 0.6 }}
        onCreated={() => setIsReady(true)}
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} quality={quality} isActive={isDocumentVisible} />
        </Suspense>
      </Canvas>
    </div>
  );
}
