import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    Fade,
    IconButton,
    useMediaQuery,
    useTheme,
    Dialog,
    Slide,
    AppBar,
    Toolbar
} from '@mui/material';
import Categorias, { AvatarSection } from './Categorias';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import AuthAvatar, { AuthAvatarRef } from './avatar';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface SidebarItemProps {
    icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
    <Stack
        alignItems="center"
        spacing={1.5}
        onClick={onClick}
        sx={{
            cursor: 'pointer',
            color: active ? 'black' : '#ccc',
            transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: active ? 1 : 0.5,
            '&:hover': { color: 'black', opacity: 1, transform: 'translateX(5px)' },
            transform: active ? 'scale(1.15)' : 'scale(1)',
        }}
    >
        <Icon sx={{ fontSize: 24 }} />
        <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            {label}
        </Typography>
    </Stack>
);

const AvatarEditor: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const avatarRef = useRef<AuthAvatarRef>(null);
    const [section, setSection] = useState<AvatarSection>('CUERPO');
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    useEffect(() => {
        if (!avatarRef.current) return;
        const timer = setTimeout(() => {
            switch (section) {
                case 'CUERPO': avatarRef.current?.focusAnatomy(); break;
                case 'ROSTRO': avatarRef.current?.focusFace(); break;
                case 'PIEL':
                case 'PELO': avatarRef.current?.focusFull(); break;
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [section]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                bgcolor: '#fcfcfc',
                overflow: 'hidden',
                position: 'relative',
                background: 'radial-gradient(circle at 30% 50%, #fff 0%, #f9f9f9 100%)'
            } as any}
        >
            {/* IZQUIERDA: Sidebar de Navegación (Solo PC) */}
            {!isMobile && (
                <Box
                    sx={{
                        width: 110,
                        borderRight: '1px solid rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 10,
                        bgcolor: 'transparent',
                        zIndex: 2
                    }}
                >
                    <Stack spacing={8}>
                        <SidebarItem icon={AccessibilityNewIcon} label="Cuerpo" active={section === 'CUERPO'} onClick={() => setSection('CUERPO')} />
                        <SidebarItem icon={ViewInArIcon} label="Rostro" active={section === 'ROSTRO'} onClick={() => setSection('ROSTRO')} />
                        <SidebarItem icon={ColorLensIcon} label="Piel" active={section === 'PIEL'} onClick={() => setSection('PIEL')} />
                        <SidebarItem icon={ContentCutIcon} label="Pelo" active={section === 'PELO'} onClick={() => setSection('PELO')} />
                    </Stack>
                </Box>
            )}

            {/* CENTRO: Visualizador 3D (PC y Mobile) */}
            <Box
                sx={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ width: '100%', height: '100%' }}>
                    <AuthAvatar ref={avatarRef} />
                </Box>

                {/* HUD Overlay */}
                <Fade in timeout={1500}>
                    <Box sx={{ position: 'absolute', top: { xs: 30, md: 50 }, left: { xs: 30, md: 50 }, pointerEvents: 'none' }}>
                        <Typography variant="h4" sx={{ fontWeight: 100, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.8)', mb: 1, fontSize: { xs: '1.2rem', md: '2.4rem' } }}>
                            Identity
                        </Typography>
                        <Box sx={{ width: 60, height: 1, bgcolor: 'black', mb: 2, opacity: 0.3 }} />
                        <Typography variant="caption" sx={{ letterSpacing: '0.6em', color: '#bbb', display: 'block', fontWeight: 300 }}>
                            CORE // MODULE // {section}
                        </Typography>
                    </Box>
                </Fade>

                {/* BOTÓN FLOTANTE: (Solo Mobile) */}
                {isMobile && (
                    <>
                        {/* Selector de Sección Flotante */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 30,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                bgcolor: 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '50px',
                                px: 4,
                                py: 2,
                                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                                zIndex: 10
                            }}
                        >
                            <Stack direction="row" spacing={4}>
                                <IconButton size="small" onClick={() => setSection('CUERPO')} sx={{ color: section === 'CUERPO' ? 'black' : '#ccc' }}><AccessibilityNewIcon /></IconButton>
                                <IconButton size="small" onClick={() => setSection('ROSTRO')} sx={{ color: section === 'ROSTRO' ? 'black' : '#ccc' }}><ViewInArIcon /></IconButton>
                                <IconButton size="small" onClick={() => setSection('PIEL')} sx={{ color: section === 'PIEL' ? 'black' : '#ccc' }}><ColorLensIcon /></IconButton>
                                <IconButton size="small" onClick={() => setSection('PELO')} sx={{ color: section === 'PELO' ? 'black' : '#ccc' }}><ContentCutIcon /></IconButton>
                            </Stack>
                        </Box>

                        {/* Botón de Ajustes */}
                        <IconButton
                            onClick={() => setOpenMobileMenu(true)}
                            sx={{
                                position: 'absolute',
                                top: 30,
                                right: 30,
                                bgcolor: 'white',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                p: 2,
                                '&:hover': { bgcolor: '#f5f5f5' }
                            }}
                        >
                            <TuneIcon />
                        </IconButton>
                    </>
                )}
            </Box>

            {/* DERECHA: Panel de Controles (Solo PC) */}
            {!isMobile && (
                <Box
                    sx={{
                        width: 520,
                        bgcolor: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 5,
                        zIndex: 2,
                        borderLeft: '1px solid rgba(0,0,0,0.02)'
                    }}
                >
                    <Box sx={{ mb: 4, pl: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 200, letterSpacing: '-0.02em', color: 'black', mb: 0.5 }}>
                            Construcción
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#aaa', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.6rem' }}>
                            Base de identidad digital v2.0
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1, overflow: 'hidden' }}>
                        <Categorias section={section} />
                    </Box>

                    <Box sx={{ pt: 4, mt: 'auto' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: 'black',
                                color: 'white !important',
                                borderRadius: '12px',
                                py: 2.5,
                                letterSpacing: '0.4em',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                '&:hover': { bgcolor: '#222', transform: 'translateY(-2px)', color: 'white !important' }
                            }}
                        >
                            CONFIRMAR BIOMETRÍA
                        </Button>
                    </Box>
                </Box>
            )}

            {/* DIÁLOGO MÓVIL: Full Screen Controls */}
            <Dialog
                fullScreen
                open={openMobileMenu}
                onClose={() => setOpenMobileMenu(false)}
                TransitionComponent={Transition}
                sx={{ '& .MuiDialog-paper': { bgcolor: '#fcfcfc' } }}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'black', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            {section}
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={() => setOpenMobileMenu(false)} sx={{ color: 'black' }}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 4, flex: 1, overflow: 'auto' }}>
                    <Categorias section={section} />
                </Box>
                <Box sx={{ p: 3, bgcolor: 'white', borderTop: '1px solid #eee' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setOpenMobileMenu(false)}
                        sx={{
                            bgcolor: 'black',
                            color: 'white !important',
                            borderRadius: '12px',
                            py: 2,
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            '&:hover': { bgcolor: '#222', color: 'white !important' }
                        }}
                    >
                        APLICAR CAMBIOS
                    </Button>
                </Box>
            </Dialog>
        </Box>
    );
};

export default AvatarEditor;
