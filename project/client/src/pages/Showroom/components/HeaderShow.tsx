import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Avatar,
    Badge,
    Menu,
    MenuItem,
    Typography,
    Stack,
    ListItemIcon,
    Divider,
    useTheme,
    Button
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ES from 'country-flag-icons/react/3x2/ES';
import GB from 'country-flag-icons/react/3x2/GB';

interface HeaderShowProps {
    toggleTheme?: () => void;
    onCartClick?: () => void; // Optional if using internal handler
    onLogout?: () => void;
}

export default function HeaderShow({ toggleTheme, onLogout }: HeaderShowProps) {
    const theme = useTheme();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
    const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);
    const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null);
    const [language, setLanguage] = useState<'ES' | 'EN'>('ES');

    // -- Handlers --
    const handleUserClick = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
    const handleUserClose = () => setAnchorElUser(null);

    const handleLangClick = (event: React.MouseEvent<HTMLElement>) => setAnchorElLang(event.currentTarget);
    const handleLangClose = (lang?: 'ES' | 'EN') => {
        if (lang) setLanguage(lang);
        setAnchorElLang(null);
    };

    const handleCartClick = (event: React.MouseEvent<HTMLElement>) => setAnchorElCart(event.currentTarget);
    const handleCartClose = () => setAnchorElCart(null);

    const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => setAnchorElNotif(event.currentTarget);
    const handleNotifClose = () => setAnchorElNotif(null);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: 'text.primary',
                transition: 'all 0.3s ease'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', height: 80, px: { xs: 2, md: 4 } }}>

                {/* --- LEFT: SaaS Logo --- */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="overline"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            cursor: 'pointer',
                            opacity: 0.7,
                            '&:hover': { opacity: 1 }
                        }}
                    >
                        TEXTIL3D
                    </Typography>
                </Box>

                {/* --- CENTER: Brand Logo --- */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontFamily: '"Playfair Display", "Times New Roman", serif',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            textTransform: 'uppercase'
                        }}
                    >
                        VOGUE<Box component="span" sx={{ color: theme.palette.primary.main }}>.</Box>
                    </Typography>
                </Box>

                {/* --- RIGHT: Actions --- */}
                <Stack direction="row" spacing={1} sx={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

                    {/* 1. Language Selector */}
                    <HiddenOnMobile>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            onClick={handleLangClick}
                            sx={{
                                cursor: 'pointer',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                        >
                            <Box sx={{ width: 20, display: 'flex', borderRadius: '2px', overflow: 'hidden' }}>
                                {language === 'ES' ? <ES /> : <GB />}
                            </Box>
                            <Typography variant="caption" fontWeight="600">{language}</Typography>
                            <ExpandMoreIcon sx={{ fontSize: 14, opacity: 0.6 }} />
                        </Stack>
                    </HiddenOnMobile>

                    {/* 2. Theme Toggle */}
                    <IconButton size="small" onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
                        {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
                    </IconButton>

                    {/* 3. Notifications */}
                    <IconButton size="small" onClick={handleNotifClick} sx={{ color: 'text.secondary' }}>
                        <Badge badgeContent={3} color="error" variant="dot">
                            <NotificationsNoneOutlinedIcon fontSize="small" />
                        </Badge>
                    </IconButton>

                    {/* 4. Cart */}
                    <IconButton onClick={handleCartClick} sx={{ color: 'text.primary' }}>
                        <Badge badgeContent={2} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: 9, height: 16, minWidth: 16 } }}>
                            <ShoppingBagOutlinedIcon />
                        </Badge>
                    </IconButton>

                    {/* 5. Profile (Last) */}
                    <IconButton onClick={handleUserClick} size="small" sx={{ ml: 1 }}>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <PersonOutlineOutlinedIcon fontSize="small" />
                        </Avatar>
                    </IconButton>

                </Stack>
            </Toolbar>

            {/* --- MENUS --- */}

            {/* Language Menu */}
            <Menu
                anchorEl={anchorElLang}
                open={Boolean(anchorElLang)}
                onClose={() => handleLangClose()}
                slotProps={{ paper: { elevation: 2, sx: { mt: 1, minWidth: 120 } } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleLangClose('ES')} selected={language === 'ES'}>
                    <Box sx={{ width: 20, mr: 1, display: 'flex' }}><ES /></Box> Español
                </MenuItem>
                <MenuItem onClick={() => handleLangClose('EN')} selected={language === 'EN'}>
                    <Box sx={{ width: 20, mr: 1, display: 'flex' }}><GB /></Box> English
                </MenuItem>
            </Menu>

            {/* Notifications Menu */}
            <Menu
                anchorEl={anchorElNotif}
                open={Boolean(anchorElNotif)}
                onClose={handleNotifClose}
                slotProps={{ paper: { elevation: 3, sx: { mt: 1.5, width: 320, maxWidth: '100%' } } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" fontWeight="bold">Notificaciones</Typography>
                </Box>
                <MenuItem onClick={handleNotifClose}>
                    <Box>
                        <Typography variant="body2" fontWeight="500">Nuevo diseño disponible</Typography>
                        <Typography variant="caption" color="text.secondary">La colección Otoño/Invierno ha llegado.</Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleNotifClose}>
                    <Box>
                        <Typography variant="body2" fontWeight="500">Orden enviada</Typography>
                        <Typography variant="caption" color="text.secondary">Tu pedido #3021 está en camino.</Typography>
                    </Box>
                </MenuItem>
                <Box sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ cursor: 'pointer', color: 'primary.main', fontWeight: 600 }}>Ver todas</Typography>
                </Box>
            </Menu>

            {/* Cart Menu (Mini Cart) */}
            <Menu
                anchorEl={anchorElCart}
                open={Boolean(anchorElCart)}
                onClose={handleCartClose}
                slotProps={{ paper: { elevation: 4, sx: { mt: 1.5, width: 300 } } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" fontWeight="bold">Tu Carrito (2)</Typography>
                </Box>

                {/* Cart Item 1 */}
                <MenuItem sx={{ py: 1.5 }}>
                    <Box sx={{ width: 40, height: 40, bgcolor: 'action.hover', borderRadius: 1, mr: 2 }} /> {/* Placeholder IMG */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="500">Camiseta Básica</Typography>
                        <Typography variant="caption" color="text.secondary">Negro / M x 1</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="600">$45.00</Typography>
                </MenuItem>

                {/* Cart Item 2 */}
                <MenuItem sx={{ py: 1.5 }}>
                    <Box sx={{ width: 40, height: 40, bgcolor: 'action.hover', borderRadius: 1, mr: 2 }} /> {/* Placeholder IMG */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="500">Pantalón Lino</Typography>
                        <Typography variant="caption" color="text.secondary">Beige / 32 x 1</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="600">$120.00</Typography>
                </MenuItem>

                <Divider />
                <Box sx={{ px: 2, py: 2 }}>
                    <Stack direction="row" justifyContent="space-between" mb={2}>
                        <Typography variant="body2">Subtotal</Typography>
                        <Typography variant="subtitle1" fontWeight="bold">$165.00</Typography>
                    </Stack>
                    <Button variant="contained" fullWidth size="small" onClick={handleCartClick}>
                        Pasar a pagar
                    </Button>
                </Box>
            </Menu>

            {/* User Menu */}
            <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleUserClose}
                slotProps={{ paper: { elevation: 3, sx: { mt: 1.5, minWidth: 200, borderRadius: 2 } } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2">Usuario Demo</Typography>
                    <Typography variant="caption" color="text.secondary">cliente@textil3d.com</Typography>
                </Box>
                <Divider />

                <MenuItem onClick={handleUserClose}>
                    <ListItemIcon><AccountCircleOutlinedIcon fontSize="small" /></ListItemIcon>
                    Ver Perfil
                </MenuItem>

                <MenuItem onClick={() => { handleUserClose(); onLogout?.(); }}>
                    <ListItemIcon><LogoutOutlinedIcon fontSize="small" /></ListItemIcon>
                    Cerrar Sesión
                </MenuItem>
            </Menu>

        </AppBar>
    );
}

// Utility for responsive hiding
function HiddenOnMobile({ children }: { children: React.ReactNode }) {
    return <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{children}</Box>;
}
