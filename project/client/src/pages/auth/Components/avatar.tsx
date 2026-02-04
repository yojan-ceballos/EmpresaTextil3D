import {
    Suspense,
    useLayoutEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle
} from 'react'
import { Canvas } from '@react-three/fiber'
import {
    CameraControls,
    Environment,
    ContactShadows,
    useGLTF
} from '@react-three/drei'
import * as THREE from 'three'
import { Box } from '@mui/material'

/* ===========================
   CENTERED AVATAR MODEL
=========================== */
function CenteredModel({
    onCenterComputed
}: {
    onCenterComputed: (centerY: number) => void
}) {
    const ref = useRef<THREE.Group>(null)
    const { scene } = useGLTF('/models/fashion_model.glb')

    useLayoutEffect(() => {
        if (!ref.current) return

        const box = new THREE.Box3().setFromObject(ref.current)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        // Center model
        ref.current.position.x -= center.x
        ref.current.position.y -= center.y
        ref.current.position.z -= center.z

        // Lift so feet touch ground
        ref.current.position.y += size.y / 2

        // Visual center for camera
        onCenterComputed(size.y * 0.55)
    }, [onCenterComputed])

    return (
        <group ref={ref} scale={2.4}>
            <primitive object={scene} />
        </group>
    )
}

export interface AuthAvatarRef {
    focusFace: () => void;
    focusFull: () => void;
    focusAnatomy: () => void;
}

const AuthAvatar = forwardRef<AuthAvatarRef, {}>((_, ref) => {
    const cameraControlsRef = useRef<CameraControls>(null)
    const [centerY, setCenterY] = useState<number | null>(null)

    const getPresets = (cy: number) => ({
        FULL: {
            pos: [0, cy, 7],
            target: [0, cy, 0]
        },
        FACE: {
            pos: [0, cy + 1.48, 1.1],
            target: [0, cy + 1.38, 0]
        },
        ANATOMY: {
            // Lower target and position to show torso/legs and hide face
            pos: [0, cy - 0.4, 4.2],
            target: [0, cy - 0.6, 0]
        }
    });

    useImperativeHandle(ref, () => ({
        focusFace: () => {
            if (!cameraControlsRef.current || centerY === null) return;
            const p = getPresets(centerY).FACE;
            cameraControlsRef.current.setLookAt(p.pos[0], p.pos[1], p.pos[2], p.target[0], p.target[1], p.target[2], true);
        },
        focusFull: () => {
            if (!cameraControlsRef.current || centerY === null) return;
            const p = getPresets(centerY).FULL;
            cameraControlsRef.current.setLookAt(p.pos[0], p.pos[1], p.pos[2], p.target[0], p.target[1], p.target[2], true);
        },
        focusAnatomy: () => {
            if (!cameraControlsRef.current || centerY === null) return;
            const p = getPresets(centerY).ANATOMY;
            cameraControlsRef.current.setLookAt(p.pos[0], p.pos[1], p.pos[2], p.target[0], p.target[1], p.target[2], true);
        }
    }));

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas shadows camera={{ position: [0, 2.6, 7], fov: 30 }}>
                <ambientLight intensity={1.5} />
                <spotLight
                    position={[5, 10, 5]}
                    angle={0.25}
                    penumbra={1}
                    intensity={2}
                    castShadow
                />
                <spotLight position={[-5, 5, -5]} intensity={1} />

                <Suspense fallback={null}>
                    <CenteredModel onCenterComputed={setCenterY} />
                    <Environment preset="studio" />
                    <ContactShadows
                        position={[0, 0, 0]}
                        opacity={0.3}
                        scale={10}
                        blur={2.5}
                        far={4}
                    />
                </Suspense>

                <CameraControls
                    ref={cameraControlsRef}
                    makeDefault
                    smoothTime={1}
                    dampingFactor={0.1}
                    minDistance={0.5}
                    maxDistance={12}
                    minPolarAngle={Math.PI / 2.2}
                    maxPolarAngle={Math.PI / 1.8}
                />
            </Canvas>
        </Box>
    )
});

useGLTF.preload('/models/fashion_model.glb')

export default AuthAvatar;
