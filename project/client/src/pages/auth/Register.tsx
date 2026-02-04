import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    Container,
    Paper,
    Fade,
    IconButton,
    Stack
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AvatarEditor from './Components/AvatarEditor';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

type Step = 'type-selection' | 'company-form' | 'client-step-1' | 'client-step-2' | 'client-step-3' | 'client-step-4';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>('type-selection');

    // -- Navigation Helpers --
    const handleBack = () => {
        navigate('/auth/login');
    };

    // -- Renders --

    const renderTypeSelection = () => (
        <Container maxWidth="md">
            <Box textAlign="center" mb={6}>
                <Typography variant="h3" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: '-0.02em', fontWeight: 300, color: 'black' }}>
                    Join Textile3D
                </Typography>
                <Typography color="text.secondary">
                    Select your account type to get started
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        component={motion.div}
                        whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        onClick={() => setStep('client-step-1')}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: '1px solid #e0e0e0',
                            borderRadius: 0,
                            transition: 'all 0.3s'
                        }}
                    >
                        <LocalMallOutlinedIcon sx={{ fontSize: 48, mb: 2, opacity: 0.8 }} />
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 400, color: 'black' }}>Customer</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.6 }}>
                            Get a personalized 3D avatar and virtual try-on experience.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        component={motion.div}
                        whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        onClick={() => setStep('company-form')}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: '1px solid #e0e0e0',
                            borderRadius: 0,
                            transition: 'all 0.3s'
                        }}
                    >
                        <BusinessOutlinedIcon sx={{ fontSize: 48, mb: 2, opacity: 0.8 }} />
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 400, color: 'black' }}>Enterprise</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.6 }}>
                            Scale your fashion business with our high-precision modeling tools.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box mt={6} textAlign="center">
                <Button onClick={handleBack} sx={{ color: 'text.secondary', textTransform: 'none', '&:hover': { color: 'black' } }}>
                    Back to Login
                </Button>
            </Box>
        </Container>
    );

    const renderCompanyForm = () => (
        <Container maxWidth="md">
            <Box mb={4}>
                <IconButton onClick={() => setStep('type-selection')} sx={{ mb: 2, color: 'black' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ textTransform: 'uppercase', letterSpacing: '-0.02em', fontWeight: 300, color: 'black' }}>
                    Enterprise Access
                </Typography>
                <Typography color="text.secondary">
                    Tell us about your company requirements
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">COMPANY NAME</Typography>
                    <TextField
                        fullWidth
                        placeholder="e.g. Fashion Corp"
                        variant="standard"
                        sx={{
                            '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                            '& .MuiInput-underline:hover:before': { borderBottomColor: 'black !important' }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">BUSINESS TYPE</Typography>
                    <Select
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        displayEmpty
                        sx={{
                            '&:after': { borderBottomColor: 'black' },
                            '&:hover:not(.Mui-disabled):before': { borderBottomColor: 'black' }
                        }}
                    >
                        <MenuItem value="" disabled>Select Type</MenuItem>
                        <MenuItem value="brand">Fashion Brand</MenuItem>
                        <MenuItem value="manufacturer">Manufacturer</MenuItem>
                        <MenuItem value="retailer">Retailer</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">CONTACT PERSON</Typography>
                    <TextField
                        fullWidth
                        placeholder="Full Name"
                        variant="standard"
                        sx={{
                            '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                            '& .MuiInput-underline:hover:before': { borderBottomColor: 'black !important' }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">WORK EMAIL</Typography>
                    <TextField
                        fullWidth
                        placeholder="name@company.com"
                        variant="standard"
                        type="email"
                        sx={{
                            '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                            '& .MuiInput-underline:hover:before': { borderBottomColor: 'black !important' }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">CIUDAD</Typography>
                    <TextField
                        fullWidth
                        placeholder="Ej. Medellín"
                        variant="standard"
                        sx={{
                            '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                            '& .MuiInput-underline:hover:before': { borderBottomColor: 'black !important' }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">MUNICIPIO</Typography>
                    <TextField
                        fullWidth
                        placeholder="Ej. Envigado"
                        variant="standard"
                        sx={{
                            '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                            '& .MuiInput-underline:hover:before': { borderBottomColor: 'black !important' }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">PROJECT NEEDS</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Describe your project briefly..."
                        variant="standard"
                        sx={{
                            '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                            '& .MuiInput-underline:hover:before': { borderBottomColor: 'black !important' }
                        }}
                    />
                </Grid>
            </Grid>

            <Box mt={6} display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => alert('Request sent!')}
                    sx={{ bgcolor: 'black', color: 'white', borderRadius: 0, px: 6, '&:hover': { bgcolor: '#333' } }}
                >
                    Request Access
                </Button>
            </Box>
        </Container>
    );

    const renderClientWizard = () => {
        const steps = {
            'client-step-1': (
                <Grid container spacing={6}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom color="text.secondary">EDAD</Typography>
                        <TextField
                            fullWidth
                            placeholder="Años"
                            variant="standard"
                            type="number"
                            sx={{
                                '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                                '& .MuiInput-underline:hover:before': { borderBottomColor: 'black !important' }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom color="text.secondary">ALTURA (CM)</Typography>
                        <TextField
                            fullWidth
                            placeholder="Ej. 175"
                            variant="standard"
                            type="number"
                            sx={{
                                '& .MuiInput-underline:after': { borderBottomColor: 'black' },
                                '& .MuiInput-underline:hover:before': { borderBottomColor: 'black !important' }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom color="text.secondary">GÉNERO</Typography>
                        <Select
                            fullWidth
                            variant="standard"
                            defaultValue=""
                            displayEmpty
                            sx={{
                                '&:after': { borderBottomColor: 'black' },
                                '&:hover:not(.Mui-disabled):before': { borderBottomColor: 'black' }
                            }}
                        >
                            <MenuItem value="" disabled>Seleccionar</MenuItem>
                            <MenuItem value="m">Masculino</MenuItem>
                            <MenuItem value="f">Femenino</MenuItem>
                            <MenuItem value="nb">No binario / Otro</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            ),
            'client-step-2': (
                <Grid container spacing={3}>
                    {['Rostro de frente', 'Perfil izquierdo', 'Perfil derecho'].map((label) => (
                        <Grid item xs={12} md={4} key={label}>
                            <Typography variant="subtitle2" gutterBottom align="center" color="text.secondary">{label.toUpperCase()}</Typography>
                            <Box
                                sx={{
                                    border: '1px dashed #eee',
                                    p: 4,
                                    height: 180,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': { borderColor: 'black', bgcolor: '#fafafa' }
                                }}
                            >
                                <CameraAltOutlinedIcon sx={{ fontSize: 30, color: '#ccc', mb: 2 }} />
                                <Typography variant="caption" color="text.secondary">SUBIR IMAGEN</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ),
            'client-step-3': (
                <Grid container spacing={3}>
                    {['Cuerpo completo de frente', 'Cuerpo completo de espaldas'].map((label) => (
                        <Grid item xs={12} md={6} key={label}>
                            <Typography variant="subtitle2" gutterBottom align="center" color="text.secondary">{label.toUpperCase()}</Typography>
                            <Box
                                sx={{
                                    border: '1px dashed #eee',
                                    p: 6,
                                    height: 300,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': { borderColor: 'black', bgcolor: '#fafafa' }
                                }}
                            >
                                <CameraAltOutlinedIcon sx={{ fontSize: 40, color: '#ccc', mb: 2 }} />
                                <Typography variant="caption" color="text.secondary">SUBIR FOTO CUERPO</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )
        };

        const titles = {
            'client-step-1': 'Datos Básicos',
            'client-step-2': 'Captura Facial',
            'client-step-3': 'Escaneo Corporal',
            'client-step-4': 'Editor de Avatar'
        };

        if (step === 'client-step-4') return <AvatarEditor />;

        const currentStepContent = steps[step as keyof typeof steps];
        const currentTitle = titles[step as keyof typeof titles];

        const goNext = () => {
            if (step === 'client-step-1') setStep('client-step-2');
            else if (step === 'client-step-2') setStep('client-step-3');
            else if (step === 'client-step-3') setStep('client-step-4');
        };

        const goBack = () => {
            if (step === 'client-step-1') setStep('type-selection');
            else if (step === 'client-step-2') setStep('client-step-1');
            else if (step === 'client-step-3') setStep('client-step-2');
        };

        return (
            <Container maxWidth="md">
                <Box mb={8} textAlign="center">
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={3}>
                        <IconButton onClick={goBack} size="small" sx={{ color: 'black' }}><ArrowBackIcon /></IconButton>
                        <Typography variant="caption" sx={{ letterSpacing: '0.3em', fontWeight: 600, color: '#ccc' }}>
                            PASO {step.split('-')[2]} DE 4
                        </Typography>
                    </Stack>
                    <Typography variant="h2" sx={{ textTransform: 'uppercase', letterSpacing: '-0.04em', fontWeight: 300, color: 'black' }}>
                        {currentTitle}
                    </Typography>
                </Box>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        {currentStepContent}
                    </motion.div>
                </AnimatePresence>

                <Box mt={8} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={goNext}
                        sx={{
                            px: 6,
                            py: 1.5,
                            bgcolor: 'black',
                            color: 'white',
                            borderRadius: 0,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontSize: '0.8rem',
                            '&:hover': { bgcolor: '#333' }
                        }}
                    >
                        SIGUIENTE PASO
                    </Button>
                </Box>
            </Container>
        );
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
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
            } as any}
        >
            <Fade in timeout={500}>
                <Box width="100%">
                    {step === 'type-selection' && renderTypeSelection()}
                    {step === 'company-form' && renderCompanyForm()}
                    {step.startsWith('client-') && renderClientWizard()}
                </Box>
            </Fade>
        </Box>
    );
};

export default Register;
