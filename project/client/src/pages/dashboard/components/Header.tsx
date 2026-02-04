import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Badge,
    Chip,
    Stack,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

import ES from 'country-flag-icons/react/3x2/ES';
import GB from 'country-flag-icons/react/3x2/GB';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    onNavigate?: (view: string) => void;
    onDrawerToggle?: () => void;
}

export default function Header({ onNavigate, onDrawerToggle }: HeaderProps) {
    const [anchorElLanguage, setAnchorElLanguage] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
    const [language, setLanguage] = useState<'EN' | 'ES'>('EN');

    // Language Handlers
    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleLanguageClose = (lang?: 'EN' | 'ES') => {
        if (lang) {
            setLanguage(lang);
        }
        setAnchorElLanguage(null);
    };

    // User Menu Handlers
    const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleUserClose();
        // Add actual logout logic here
        console.log("Logging out...");
    };

    // Notification Menu Handlers
    const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setAnchorElNotifications(null);
    };

    return (
        <AppBar position="static" elevation={0} sx={{ bgcolor: '#0B0F19', borderBottom: '1px solid rgba(255,255,255,0.1)', py: 0.5 }}>
            <Toolbar sx={{ minHeight: '60px !important', justifyContent: 'space-between' }}>
                {/* Left Side: Team Selector */}
                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo Placeholder */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src="https://img.logoipsum.com/296.svg" alt="Logo" style={{ height: 32 }} />
                    </Box>

                </Stack>

                {/* Right Side: Tools & Profile */}
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    {/* boton dia noche */}
                    dia
                    

                    {/* Language Selector */}
                    <IconButton size="small" sx={{ p: 1 }} onClick={handleLanguageClick}>
                        <Box sx={{ width: 20, mr: 0.5, display: 'flex', alignItems: 'center' }}>
                            {language === 'EN' ? <GB /> : <ES />}
                        </Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 'bold' }}>
                            {language}
                        </Typography>
                    </IconButton>
                    <Menu
                        anchorEl={anchorElLanguage}
                        open={Boolean(anchorElLanguage)}
                        onClose={() => handleLanguageClose()}
                        PaperProps={{
                            sx: {
                                bgcolor: '#0B0F19',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }
                        }}
                    >
                        <MenuItem onClick={() => handleLanguageClose('EN')} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            <Box sx={{ width: 20, mr: 1, display: 'flex', alignItems: 'center' }}><GB /></Box> English (EN)
                        </MenuItem>
                        <MenuItem onClick={() => handleLanguageClose('ES')} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            <Box sx={{ width: 20, mr: 1, display: 'flex', alignItems: 'center' }}><ES /></Box> Español (ES)
                        </MenuItem>
                    </Menu>

                    {/* Notifications */}
                    <IconButton
                        size="small"
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                        onClick={handleNotificationsClick}
                    >
                        <Badge badgeContent={4} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: 16, minWidth: 16 } }}>
                            <NotificationsNoneIcon sx={{ fontSize: 22 }} />
                        </Badge>
                    </IconButton>
                    <Menu
                        anchorEl={anchorElNotifications}
                        open={Boolean(anchorElNotifications)}
                        onClose={handleNotificationsClose}
                        PaperProps={{
                            sx: {
                                width: 320,
                                bgcolor: '#0B0F19',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.1)',
                                mt: 1.5
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
                        </Box>
                        {[1, 2, 3, 4].map((item) => (
                            <MenuItem key={item} onClick={handleNotificationsClose} sx={{
                                whiteSpace: 'normal',
                                py: 1.5,
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                            }}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                                    <Box>
                                        <Typography variant="body2" fontWeight="bold">New Order Received</Typography>
                                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                            Order #1234 has been placed by a new customer.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </MenuItem>
                        ))}
                        <Box sx={{ p: 1.5, textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 'bold' }}>
                                View All Notifications
                            </Typography>
                        </Box>
                    </Menu>

                    {/* Settings */}
                    <IconButton
                        size="small"
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                        onClick={() => onNavigate && onNavigate('settings')}
                    >
                        <SettingsOutlinedIcon sx={{ fontSize: 22 }} />
                    </IconButton>

                    {/* Avatar with Menu */}
                    <Box sx={{ pl: 1, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        <Avatar
                            sx={{ width: 32, height: 32, border: '2px solid', borderColor: 'primary.main', cursor: 'pointer' }}
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            onClick={handleUserClick}
                        />
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleUserClose}
                            PaperProps={{
                                sx: {
                                    bgcolor: '#0B0F19',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    minWidth: 150,
                                    mt: 1.5
                                }
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleUserClose} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 32 }}>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </MenuItem>
                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                            <MenuItem onClick={handleLogout} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <ListItemIcon sx={{ color: 'error.main', minWidth: 32 }}>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                            </MenuItem>
                        </Menu>
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}   