import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface OptionCardProps {
    label: string;
    color?: string;
    selected?: boolean;
    onClick?: () => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({ label, color, selected, onClick }) => (
    <Box
        onClick={onClick}
        sx={{
            cursor: 'pointer',
            textAlign: 'center',
            transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { transform: 'scale(1.05)' }
        }}
    >
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                aspectRatio: '1/1',
                bgcolor: color || 'rgba(255, 255, 255, 0.5)',
                border: selected ? '2px solid black' : '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0,
                mb: 0.5,
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(5px)'
            }}
        >
            {color && <Box sx={{ width: '100%', height: '100%', bgcolor: color }} />}
        </Paper>
        <Typography variant="caption" sx={{ fontSize: '0.55rem', textTransform: 'uppercase', color: selected ? 'black' : '#aaa', fontWeight: selected ? 700 : 500, letterSpacing: '0.05em' }}>
            {label}
        </Typography>
    </Box>
);

export const eyeColors = [
    { label: 'Azul', color: '#4a90e2' },
    { label: 'Verde', color: '#7ed321' },
    { label: 'Café', color: '#8b572a' },
    { label: 'Negro', color: '#000000' },
    { label: 'Gris', color: '#9b9b9b' },
    { label: 'Avellana', color: '#c0a080' },
    { label: 'Amatista', color: '#9b59b6' },
    { label: 'Ámbar', color: '#f1c40f' }
];

export const skinTones = [
    { label: 'Porcelana', color: '#fdf5e6' },
    { label: 'Marfil', color: '#f9ebe0' },
    { label: 'Arena', color: '#f3d6c1' },
    { label: 'Trigueño', color: '#e6b99c' },
    { label: 'Miel', color: '#d09168' },
    { label: 'Canela', color: '#a66b44' },
    { label: 'Chocolate', color: '#5d3b2e' },
    { label: 'Ónix', color: '#2c1e1a' }
];

export const subtones = [
    { label: 'Frío', color: '#f8d7da' },
    { label: 'Neutro', color: '#fcfcfc' },
    { label: 'Cálido', color: '#fff3cd' }
];

export const hairStyles = [
    { label: 'Buzz Cut' },
    { label: 'Liso Clásico' },
    { label: 'Ondas Suaves' },
    { label: 'Afro' },
    { label: 'Mohawk Fade' },
    { label: 'Side Shaved' },
    { label: 'Top Knot' },
    { label: 'Pompadour' },
    { label: 'Mullet' },
    { label: 'Wolf Cut' },
    { label: 'Rastas' },
    { label: 'Rapado Total' }
];

export const hairColors = [
    { label: 'Negro Profundo', color: '#000000' },
    { label: 'Castaño Oscuro', color: '#2c1e1a' },
    { label: 'Castaño Medio', color: '#4b3c32' },
    { label: 'Castaño Claro', color: '#8b5a2b' },
    { label: 'Rubio Ceniza', color: '#b8a389' },
    { label: 'Rubio Platino', color: '#e5e4e2' },
    { label: 'Pelirrojo', color: '#8b2119' },
    { label: 'Cobre', color: '#b87333' },
    { label: 'Azul Eléctrico', color: '#0000ff' },
    { label: 'Rosa Neón', color: '#ff00ff' },
    { label: 'Lavanda', color: '#e6e6fa' },
    { label: 'Verde Esmeralda', color: '#50c878' },
    { label: 'Gris Plata', color: '#c0c0c0' },
    { label: 'Turquesa', color: '#40e0d0' },
    { label: 'Borgoña', color: '#800020' },
    { label: 'Blanco Nieve', color: '#ffffff' }
];

export const highlightColors = [
    { label: 'Azul', color: '#3498db' },
    { label: 'Rosa', color: '#e91e63' },
    { label: 'Violeta', color: '#8e44ad' },
    { label: 'Turquesa', color: '#1abc9c' },
    { label: 'Blanco', color: '#ecf0f1' },
    { label: 'Negro', color: '#2c3e50' },
    { label: 'Oro', color: '#d4af37' }
];

export const shoulderTypes = [
    { label: 'Delgados' },
    { label: 'Normales' },
    { label: 'Desarrollados' },
    { label: 'Culturista' }
];

export const faceShapes = [
    { label: 'Ovalado' },
    { label: 'Cuadrado' },
    { label: 'Corazón' },
    { label: 'Diamante' },
    { label: 'Redondo' },
    { label: 'Alargado' }
];

export const noseTypes = [
    { label: 'Recta' },
    { label: 'Respingada' },
    { label: 'Ancha' },
    { label: 'Aguileña' },
    { label: 'Griega' }
];
