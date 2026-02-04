import React from 'react';
import { Box, Typography, Grid, Paper, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from './Partes_cuerpo'; // Import type

interface ProductosProps {
    selectedCategory: Category | null;
}

const MOCK_PRODUCTS = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: `Item Deluxe ${i + 1}`,
    price: '$' + (120 + i * 50),
}));

// Product Card
const ProductCard = ({ product }: { product: any }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
    >
        <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#fff', borderRadius: 2, cursor: 'pointer', border: '1px solid transparent', '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' } }}>
            <Box sx={{ height: 120, bgcolor: '#f5f5f7', borderRadius: 1, mb: 1.5 }} />
            <Typography variant="subtitle2" fontWeight={600}>{product.name}</Typography>
            <Typography variant="caption" color="text.secondary">{product.price}</Typography>
        </Paper>
    </motion.div>
);

export default function Productos({ selectedCategory }: ProductosProps) {
    return (
        <Box
            sx={{
                width: 350,
                height: '100%',
                bgcolor: '#fff',
                borderLeft: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                zIndex: 10
            }}
        >
            <AnimatePresence mode="wait">
                {selectedCategory ? (
                    <motion.div
                        key={selectedCategory.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="caption" color="text.secondary">COLECCIÓN</Typography>
                            <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
                                {selectedCategory.label}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1, overflowY: 'auto', pr: 1, pb: 2 }}>
                            <Grid container spacing={2}>
                                {MOCK_PRODUCTS.map((prod) => (
                                    <Grid item xs={6} key={prod.id}>
                                        <ProductCard product={prod} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </motion.div>
                ) : (
                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                        <Typography variant="body2">Selecciona una categoría</Typography>
                    </Box>
                )}
            </AnimatePresence>
        </Box>
    );
}