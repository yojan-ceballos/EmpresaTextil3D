import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@mui/material';
import { Category } from './Partes_cuerpo';

// --- Types ---
export type BodyPartName =
    | 'CABEZA' | 'CUELLO' | 'TORSO' | 'CINTURA'
    | 'BRAZO IZQUIERDO' | 'MANO IZQUIERDA'
    | 'BRAZO DERECHO' | 'MANO DERECHA'
    | 'PIERNA IZQUIERDA' | 'PIE IZQUIERDO'
    | 'PIERNA DERECHA' | 'PIE DERECHO';

// --- Mapping ---
const PART_TO_CATEGORY: Record<BodyPartName, string> = {
    'CABEZA': 'head', 'CUELLO': 'head',
    'TORSO': 'outerwear',
    'CINTURA': 'waist',
    'BRAZO IZQUIERDO': 'arms', 'MANO IZQUIERDA': 'arms',
    'BRAZO DERECHO': 'arms', 'MANO DERECHA': 'arms',
    'PIERNA IZQUIERDA': 'legs', 'PIE IZQUIERDO': 'footwear',
    'PIERNA DERECHA': 'legs', 'PIE DERECHO': 'footwear'
};

interface InteractivePartProps {
    name: BodyPartName;
    position: [number, number, number];
    args?: any[];
    geometryType: 'box' | 'cylinder' | 'sphere';
    onClickPart: (name: BodyPartName) => void;
    rotation?: [number, number, number];
    scale?: [number, number, number];
    isSelected: boolean;
}

// --- Interactive Sub-Component ---
const InteractivePart = ({ name, position, args, geometryType, onClickPart, rotation, scale = [1, 1, 1], isSelected }: InteractivePartProps) => {
    const [hovered, setHovered] = useState(false);

    const handleClick = (e: any) => {
        e.stopPropagation();
        onClickPart(name);
    };

    return (
        <mesh
            position={position}
            rotation={rotation as any}
            scale={scale as any}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {geometryType === 'box' && <boxGeometry args={args as any} />}
            {geometryType === 'cylinder' && <cylinderGeometry args={args as any} />}
            {geometryType === 'sphere' && <sphereGeometry args={args as any} />}

            <meshStandardMaterial
                color={isSelected || hovered ? '#2196f3' : '#e0e0e0'}
                roughness={0.5}
                metalness={0.1}
            />
        </mesh>
    );
};

// --- Mannequin Assembly ---
const Mannequin = ({ onSelect, selectedCategory }: { onSelect: (name: BodyPartName) => void, selectedCategory: Category | null }) => {

    const isPartSelected = (name: BodyPartName) => {
        if (!selectedCategory) return false;
        return PART_TO_CATEGORY[name] === selectedCategory.id;
    };

    return (
        <group position={[0, -0.5, 0]} scale={0.85}>
            {/* HEAD & NECK */}
            <InteractivePart name="CABEZA" geometryType="sphere" args={[0.22, 32, 32]} position={[0, 2.7, 0]} onClickPart={onSelect} isSelected={isPartSelected('CABEZA')} />
            <InteractivePart name="CUELLO" geometryType="cylinder" args={[0.1, 0.1, 0.3, 16]} position={[0, 2.4, 0]} onClickPart={onSelect} isSelected={isPartSelected('CUELLO')} />

            {/* TORSO & WAIST */}
            <InteractivePart name="TORSO" geometryType="box" args={[0.6, 0.8, 0.3]} position={[0, 1.9, 0]} onClickPart={onSelect} isSelected={isPartSelected('TORSO')} />
            <InteractivePart name="CINTURA" geometryType="cylinder" args={[0.28, 0.28, 0.3, 16]} position={[0, 1.35, 0]} onClickPart={onSelect} isSelected={isPartSelected('CINTURA')} />

            {/* ARMS */}
            <InteractivePart name="BRAZO IZQUIERDO" geometryType="cylinder" args={[0.09, 0.08, 0.9, 16]} position={[-0.45, 1.9, 0]} rotation={[0, 0, 0.2]} onClickPart={onSelect} isSelected={isPartSelected('BRAZO IZQUIERDO')} />
            <InteractivePart name="BRAZO DERECHO" geometryType="cylinder" args={[0.09, 0.08, 0.9, 16]} position={[0.45, 1.9, 0]} rotation={[0, 0, -0.2]} onClickPart={onSelect} isSelected={isPartSelected('BRAZO DERECHO')} />

            {/* LEGS */}
            <InteractivePart name="PIERNA IZQUIERDA" geometryType="cylinder" args={[0.11, 0.09, 1.1, 16]} position={[-0.2, 0.65, 0]} onClickPart={onSelect} isSelected={isPartSelected('PIERNA IZQUIERDA')} />
            <InteractivePart name="PIERNA DERECHA" geometryType="cylinder" args={[0.11, 0.09, 1.1, 16]} position={[0.2, 0.65, 0]} onClickPart={onSelect} isSelected={isPartSelected('PIERNA DERECHA')} />

            {/* FEET */}
            <InteractivePart name="PIE IZQUIERDO" geometryType="box" args={[0.15, 0.1, 0.3]} position={[-0.2, 0.05, 0.1]} onClickPart={onSelect} isSelected={isPartSelected('PIE IZQUIERDO')} />
            <InteractivePart name="PIE DERECHO" geometryType="box" args={[0.15, 0.1, 0.3]} position={[0.2, 0.05, 0.1]} onClickPart={onSelect} isSelected={isPartSelected('PIE DERECHO')} />
        </group>
    );
};

// --- Props ---
interface ScaleAvatarProps {
    selectedCategory: Category | null;
    onSelectCategory: (category: Category) => void;
    categories: Category[];
    onPartSelect?: (part: BodyPartName) => void; // New callback
}

// --- Main Widget Component ---
export default function ScaleAvatar({ selectedCategory, onSelectCategory, categories, onPartSelect }: ScaleAvatarProps) {

    const handlePartSelect = (name: BodyPartName) => {
        // 1. Notify parent of specific part selection (for camera)
        if (onPartSelect) onPartSelect(name);

        // 2. Sync with Category List
        const catId = PART_TO_CATEGORY[name];
        if (catId) {
            const foundCat = categories.find(c => c.id === catId);
            if (foundCat) onSelectCategory(foundCat);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', borderRadius: 4, overflow: 'hidden' }}>
            <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
                <ambientLight intensity={1} />
                <pointLight position={[2, 2, 2]} intensity={0.5} />

                <Suspense fallback={null}>
                    <Mannequin onSelect={handlePartSelect} selectedCategory={selectedCategory} />
                </Suspense>
            </Canvas>
        </Box>
    );
}
