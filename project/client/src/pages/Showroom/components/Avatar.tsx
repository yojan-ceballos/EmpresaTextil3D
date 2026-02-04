import React, {
    Suspense,
    useLayoutEffect,
    useRef,
    useEffect,
    useState
} from 'react'
import { Canvas } from '@react-three/fiber'
import {
    CameraControls,
    Environment,
    ContactShadows,
    useGLTF
} from '@react-three/drei'
import * as THREE from 'three'

import { Box, Button, Stack, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import { BodyPartName } from './scaleAvatar'

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

        // 🔥 REAL visual center for camera
        onCenterComputed(size.y * 0.55)
    }, [onCenterComputed])

    return (
        <group ref={ref} scale={2.4}>
            <primitive object={scene} />
        </group>
    )
}

/* ===========================
   CAMERA PRESETS FACTORY
=========================== */
const buildCameraPresets = (cy: number) => ({
    HOME: {
        pos: [0, cy, 6.5],
        target: [0, cy, 0]
    },
    CABEZA: {
        pos: [0, cy + 1.4, 1.3],   // Face framed nicely (not extreme macro)
        target: [0, cy + 1.35, 0]
    },
    CUELLO: {
        pos: [0, cy + 1.2, 1.5],
        target: [0, cy + 1.2, 0]
    },
    TORSO: {
        pos: [0, cy + 0.2, 3.5],   // Further back, shows neck + pants top
        target: [0, cy + 0.2, 0]
    },
    CINTURA: {
        pos: [0, cy - 0.2, 2.5],
        target: [0, cy - 0.2, 0]
    },
    'BRAZO IZQUIERDO': {
        pos: [-1.2, cy + 0.4, 2.0],
        target: [-0.6, cy + 0.4, 0]
    },
    'MANO IZQUIERDA': {
        pos: [-1.2, cy - 0.2, 1.0],
        target: [-0.9, cy - 0.2, 0]
    },
    'BRAZO DERECHO': {
        pos: [1.2, cy + 0.4, 2.0],
        target: [0.6, cy + 0.4, 0]
    },
    'MANO DERECHA': {
        pos: [1.2, cy - 0.2, 1.0],
        target: [0.9, cy - 0.2, 0]
    },
    'PIERNA IZQUIERDA': {
        pos: [-0.5, cy - 1.0, 2.5],
        target: [-0.3, cy - 1.0, 0]
    },
    'PIE IZQUIERDO': {
        pos: [-0.4, cy - 1.8, 1.5],
        target: [-0.3, cy - 1.75, 0]
    },
    'PIERNA DERECHA': {
        pos: [0.5, cy - 1.0, 2.5],
        target: [0.3, cy - 1.0, 0]
    },
    'PIE DERECHO': {
        pos: [0.4, cy - 1.8, 1.5],
        target: [0.3, cy - 1.75, 0]
    }
})

/* ===========================
   MAIN VIEWER
=========================== */
interface AvatarViewerProps {
    focusedPart?: BodyPartName | null
}

export default function AvatarViewer({ focusedPart }: AvatarViewerProps) {
    const theme = useTheme()
    const cameraControlsRef = useRef<CameraControls>(null)

    const [centerY, setCenterY] = useState<number | null>(null)

    // 🎬 Camera Director
    useEffect(() => {
        if (!cameraControlsRef.current || centerY === null) return

        const PRESETS = buildCameraPresets(centerY)
        const preset =
            focusedPart && PRESETS[focusedPart]
                ? PRESETS[focusedPart]
                : PRESETS.HOME

        cameraControlsRef.current.setLookAt(
            preset.pos[0],
            preset.pos[1],
            preset.pos[2],
            preset.target[0],
            preset.target[1],
            preset.target[2],
            true
        )
    }, [focusedPart, centerY])

    return (
        <Box
            sx={{
                width: '100%',
                height: '90vh',
                position: 'relative',
                bgcolor: '#f0f0f2'
            }}
        >
            {/* ===== 3D SCENE ===== */}
            <Canvas shadows camera={{ position: [0, 2.6, 6.5], fov: 32 }}>
                <ambientLight intensity={0.9} />
                <spotLight
                    position={[5, 10, 5]}
                    angle={0.25}
                    penumbra={1}
                    intensity={1.2}
                    castShadow
                />
                <spotLight position={[-2, 5, -2]} intensity={0.6} />

                <Suspense fallback={null}>
                    <CenteredModel onCenterComputed={setCenterY} />
                    <Environment preset="studio" />
                    <ContactShadows
                        position={[0, 0, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2.5}
                        far={4}
                    />
                </Suspense>

                <CameraControls
                    ref={cameraControlsRef}
                    makeDefault
                    smoothTime={0.5}
                    dampingFactor={0.1}
                    minDistance={0.5}
                    maxDistance={8}
                    minPolarAngle={Math.PI / 2.6}
                    maxPolarAngle={Math.PI / 1.7}
                />
            </Canvas>

            {/* ===== BOTTOM UI ===== */}
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10
                }}
            >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="contained"
                        startIcon={<ShoppingBagOutlinedIcon />}
                        sx={{
                            borderRadius: 50,
                            px: 4,
                            py: 1.5,
                            bgcolor: 'text.primary',
                            color: 'background.paper',
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: theme.shadows[4],
                            '&:hover': { bgcolor: '#000' }
                        }}
                    >
                        Comprar
                    </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="outlined"
                        startIcon={<BookmarkBorderOutlinedIcon />}
                        sx={{
                            borderRadius: 50,
                            px: 4,
                            py: 1.5,
                            borderColor: 'text.primary',
                            color: 'text.primary',
                            textTransform: 'none',
                            fontWeight: 600,
                            bgcolor: 'rgba(255,255,255,0.5)',
                            backdropFilter: 'blur(10px)',
                            borderWidth: '1.5px',
                            '&:hover': {
                                borderWidth: '1.5px',
                                bgcolor: 'rgba(255,255,255,0.8)'
                            }
                        }}
                        onClick={() => {
                            if (!cameraControlsRef.current || centerY === null) return
                            const home = buildCameraPresets(centerY).HOME
                            cameraControlsRef.current.setLookAt(
                                home.pos[0],
                                home.pos[1],
                                home.pos[2],
                                home.target[0],
                                home.target[1],
                                home.target[2],
                                true
                            )
                        }}
                    >
                        Ver Outfit Completo
                    </Button>
                </motion.div>
            </Stack>
        </Box>
    )
}

useGLTF.preload('/models/fashion_model.glb')
