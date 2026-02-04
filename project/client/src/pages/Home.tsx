import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../components/inc/Header'

export default function Home() {
    return (
        <>
            <Header />
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    sx={{ textAlign: 'center', my: 8 }}
                >
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                        Future of 3D Fashion
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                        Manage your digital textile assets, visualize in real-time, and scale your business using our SaaS platform.
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                        <Button variant="contained" size="large" sx={{ mr: 2 }}>
                            Get Started
                        </Button>
                        <Button variant="outlined" size="large">
                            View Specs
                        </Button>
                    </Box>
                </Box>

                {/* Features Grid */}
                <Grid container spacing={4}>
                    {[1, 2, 3].map((item) => (
                        <Grid item xs={12} md={4} key={item}>
                            <Box
                                component={motion.div}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }} elevation={3}>
                                    <Typography variant="h6" gutterBottom>
                                        Feature {item}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Advanced analysis and processing for your 3D models with high performance.
                                    </Typography>
                                </Paper>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
