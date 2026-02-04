import React from 'react';
import { Box, Typography, Stack, ListItemButton, Divider } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DiamondIcon from '@mui/icons-material/Diamond';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import BackpackIcon from '@mui/icons-material/Backpack';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

// --- Types ---
export interface Category {
    id: string;
    label: string;
    icon: React.ReactNode;
}

// --- Data ---
export const CATEGORIES: Category[] = [
    { id: 'hair', label: 'HAIR', icon: <FaceRetouchingNaturalIcon fontSize="small" /> },
    { id: 'head', label: 'HEAD', icon: <AutoAwesomeIcon fontSize="small" /> },
    { id: 'outerwear', label: 'OUTERWEAR', icon: <CheckroomIcon fontSize="small" /> },
    { id: 'arms', label: 'ARMS', icon: <DiamondIcon fontSize="small" /> },
    { id: 'waist', label: 'WAIST', icon: <BackpackIcon fontSize="small" /> },
    { id: 'legs', label: 'LEGS', icon: <CheckroomIcon fontSize="small" sx={{ transform: 'rotate(180deg)' }} /> },
    { id: 'footwear', label: 'FOOTWEAR', icon: <DoNotStepIcon fontSize="small" /> },
];

interface PartesCuerpoProps {
    selectedCategory: Category | null;
    onSelectCategory: (category: Category) => void;
}

export default function PartesCuerpo({ selectedCategory, onSelectCategory }: PartesCuerpoProps) {
    return (
        <Box
            sx={{
                width: 280,
                height: '100%',
                bgcolor: '#fff',
                borderRight: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: 2,
                zIndex: 10
            }}
        >
            <Typography variant="overline" color="text.secondary" sx={{ mb: 2, pl: 2, letterSpacing: '0.1em' }}>
                SELECCIÓN
            </Typography>
            <Stack spacing={0} divider={<Divider sx={{ borderColor: 'rgba(0,0,0,0.05)' }} />}>
                {CATEGORIES.map((cat) => (
                    <ListItemButton
                        key={cat.id}
                        onClick={() => onSelectCategory(cat)}
                        selected={selectedCategory?.id === cat.id}
                        sx={{
                            py: 2.5,
                            px: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            '&.Mui-selected': { bgcolor: 'rgba(0,0,0,0.04)' },
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontFamily: '"Roboto", "Inter", sans-serif',
                                fontWeight: selectedCategory?.id === cat.id ? 700 : 400,
                                letterSpacing: '0.05em',
                                color: selectedCategory?.id === cat.id ? 'text.primary' : 'text.secondary',
                                textTransform: 'uppercase'
                            }}
                        >
                            {cat.label}
                        </Typography>
                        <Box sx={{ color: selectedCategory?.id === cat.id ? 'primary.main' : 'text.disabled', display: 'flex' }}>
                            {cat.icon}
                        </Box>
                    </ListItemButton>
                ))}
            </Stack>
        </Box>
    );
}