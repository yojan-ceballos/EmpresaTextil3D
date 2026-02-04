import React, { useState } from 'react';
import { Box, IconButton, Typography, Stack, Paper, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const DANCES = [
    { id: 'salsa', label: 'Salsa Flow' },
    { id: 'hiphop', label: 'Hip Hop Groove' },
    { id: 'ballet', label: 'Ballet Spin' },
    { id: 'kpop', label: 'K-Pop High' },
    { id: 'runway', label: 'Runway Walk' },
    { id: 'pose', label: 'Editorial Pose' },
];

export default function BailesPanel() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <Box sx={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Trigger Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Paper
                    elevation={3}
                    onClick={() => setOpen(!open)}
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(10px)',
                        cursor: 'pointer',
                        color: 'text.primary',
                        border: '1px solid rgba(255,255,255,0.5)'
                    }}
                >
                    {open ? <CloseRoundedIcon /> : <MusicNoteIcon />}
                </Paper>
            </motion.div>
            <Typography variant="caption" sx={{ mt: 1, fontWeight: 600, color: 'text.secondary', opacity: 0.7 }}>Bailes</Typography>

            {/* Dance Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'absolute', top: 80, width: 220 }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                overflow: 'hidden',
                                borderRadius: 3,
                                bgcolor: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(15px)',
                                border: '1px solid rgba(255,255,255,0.5)'
                            }}
                        >
                            <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid divider' }}>
                                <Typography variant="subtitle2" fontWeight="bold">Selecciona un movimiento</Typography>
                            </Box>
                            <Stack spacing={0.5} sx={{ p: 1 }}>
                                {DANCES.map((dance) => (
                                    <Box
                                        key={dance.id}
                                        onClick={() => { setSelected(dance.id); /* Trigger animation logic here */ }}
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            bgcolor: selected === dance.id ? 'primary.main' : 'transparent',
                                            color: selected === dance.id ? 'background.paper' : 'text.primary',
                                            '&:hover': { bgcolor: selected === dance.id ? 'primary.dark' : 'rgba(0,0,0,0.05)' }
                                        }}
                                    >
                                        <Typography variant="body2" fontWeight={500}>{dance.label}</Typography>
                                        {selected === dance.id && <PlayArrowRoundedIcon fontSize="small" />}
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}