// src/components/Headphone3D.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/models/headphone.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.006;
    }
  });

  return <primitive ref={ref} object={scene} {...props} />;
}

const Headphone3D = () => {
  return (
    <div className="w-[320px] h-[320px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >

        <Suspense fallback={null}>
          <Model scale={5} position={[0, -0.9, 0]} />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.2, 0]} opacity={0.4} blur={2.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Headphone3D;

useGLTF.preload("/models/headphone.glb");
