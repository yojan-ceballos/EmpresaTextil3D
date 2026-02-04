import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';

export default function Header() {
    return (
        <AppBar position="sticky" color="inherit" elevation={1} sx={{ bgcolor: 'white' }}>
            <Toolbar>
                {/* LOGO */}
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mr: 4,
                        cursor: 'pointer',
                        letterSpacing: 1
                    }}
                >
                    TEXTILE 3D
                </Typography>

                {/* NAVIGATION ITEMS */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Button color="inherit" sx={{ fontWeight: 500 }}>Inicio</Button>
                    <Button color="inherit" sx={{ fontWeight: 500 }}>Productos</Button>
                    <Button color="inherit" sx={{ fontWeight: 500 }}>Nosotros</Button>
                </Box>

                {/* LOGIN BUTTON */}
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<LoginIcon />}
                    sx={{ mr: 3, textTransform: 'none', borderRadius: 2 }}
                >
                    Iniciar Sesión
                </Button>

                {/* DASHBOARD CIRCLE BUTTON */}
                <Tooltip title="Ir al Dashboard">
                    <IconButton
                        sx={{
                            p: 0.5,
                            border: '2px solid',
                            borderColor: 'primary.light',
                            transition: 'all 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                borderColor: 'primary.main'
                            }
                        }}
                        href="/dashboard"
                    >
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <DashboardIcon fontSize="small" />
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}
