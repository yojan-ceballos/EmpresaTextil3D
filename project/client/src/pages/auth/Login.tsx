import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    Stack,
    Paper,
    Fade
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/auth/register');
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#fff',
                p: { xs: 2, md: 0 },
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#000',
                    borderRadius: '0px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#333',
                }
            }}
        >
            <Fade in timeout={800}>
                <Box
                    component={Paper}
                    elevation={0}
                    sx={{
                        width: '100%',
                        maxWidth: 450,
                        p: { xs: 3, md: 5 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 0,
                        bgcolor: 'background.paper',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                    }}
                >
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 400, letterSpacing: '-0.02em', mb: 1, color: 'black' }}>
                            WELCOME BACK
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Please enter your details to sign in
                        </Typography>
                    </Box>

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            fullWidth
                            placeholder="Enter your Email"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 0, fontSize: '0.95rem' }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': { borderColor: 'black' },
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            placeholder="Enter your Password"
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 0, fontSize: '0.95rem' }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': { borderColor: 'black' },
                                }
                            }}
                        />

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" alignItems="center" gap={1}>
                                <input type="radio" id="remember" style={{ accentColor: 'black' }} />
                                <Typography component="label" htmlFor="remember" variant="body2" color="text.secondary">Remember me</Typography>
                            </Stack>
                            <Typography
                                variant="body2"
                                sx={{ cursor: 'pointer', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px', color: 'black' }}
                            >
                                Forgot password?
                            </Typography>
                        </Stack>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                bgcolor: 'black',
                                color: 'white',
                                borderRadius: 0,
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': { bgcolor: '#333' }
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>

                    <Box sx={{ textAlign: 'center', my: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account?{' '}
                            <Box
                                component="span"
                                onClick={handleRegisterClick}
                                sx={{
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    color: 'text.primary',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px',
                                    ml: 0.5
                                }}
                            >
                                Sign Up
                            </Box>
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                        <Box sx={{ height: '1px', bgcolor: 'divider', flex: 1 }} />
                        <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Or With</Typography>
                        <Box sx={{ height: '1px', bgcolor: 'divider', flex: 1 }} />
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                borderRadius: 0,
                                borderColor: '#eee',
                                color: 'text.primary',
                                textTransform: 'none',
                                py: 1.2,
                                '&:hover': { borderColor: 'black', bgcolor: 'transparent' }
                            }}
                        >
                            Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<AppleIcon />}
                            sx={{
                                borderRadius: 0,
                                borderColor: '#eee',
                                color: 'text.primary',
                                textTransform: 'none',
                                py: 1.2,
                                '&:hover': { borderColor: 'black', bgcolor: 'transparent' }
                            }}
                        >
                            Apple
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Box>
    );
};

export default Login;
