import { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Fade,
    TablePagination,
    TextField,
    InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';

// Mock Data
const products = [
    { id: 1, name: "Cotton T-Shirt", category: "Apparel", sales: 120, stock: 50, offer: "On Sale", disabled: false },
    { id: 2, name: "Denim Jeans", category: "Apparel", sales: 85, stock: 30, offer: "No Offer", disabled: true },
    { id: 3, name: "Leather Jacket", category: "Outerwear", sales: 45, stock: 10, offer: "No Offer", disabled: false },
    { id: 4, name: "Running Shoes", category: "Footwear", sales: 200, stock: 15, offer: "On Sale", disabled: false },
    { id: 5, name: "Wool Sweater", category: "Apparel", sales: 60, stock: 25, offer: "No Offer", disabled: true },
];

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filter products based on search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const displayedProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();

        Swal.fire({
            title: 'Confirmar deshabilitación del producto',
            text: 'Este producto será deshabilitado por un período de 3 meses. Una vez transcurrido este tiempo, será eliminado automáticamente del sistema.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Deshabilitar producto',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Producto deshabilitado',
                    'El producto ha sido deshabilitado correctamente. La eliminación automática se realizará después de 3 meses.',
                    'success'
                );

                // Aquí va la lógica real para deshabilitar el producto
            }
        });
    };

    const handleEnable = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Habilitar producto',
            text: "¿Deseas habilitar nuevamente este producto?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, habilitar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Habilitado!',
                    'El producto ha sido habilitado correctamente.',
                    'success'
                );
                // Logic to enable product would go here
            }
        });
    };


    const handleOfferToggle = (e: React.MouseEvent, currentOffer: string) => {
        e.stopPropagation();
        const newStatus = currentOffer === "On Sale" ? "No Offer" : "On Sale";
        const message = currentOffer === "On Sale"
            ? "¿Quiero cambiar a sin oferta?"
            : "¿Quiero cambiar a oferta?";

        Swal.fire({
            title: 'Cambiar Estado de Oferta',
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Actualizado!',
                    `El estado ha sido cambiado a ${newStatus}.`,
                    'success'
                );
                // Logic to update product offer would go here
            }
        });
    };

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3, transition: 'all 0.5s ease', height: '100%', overflowY: 'auto' }}>

            {/* 3D Preview Container (Left Side on Desktop, Bottom on Mobile) */}
            <Box
                sx={{
                    order: { xs: 2, lg: 1 },
                    flex: selectedProduct ? { xs: '0 0 auto', lg: '0 0 35%' } : '0 0 0%',
                    height: selectedProduct ? { xs: '300px', lg: 'auto' } : '0px',
                    opacity: selectedProduct ? 1 : 0,
                    width: selectedProduct ? '100%' : 0,
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    bgcolor: 'primary.main',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: 6,
                    mt: { xs: 3, lg: 0 }
                }}
            >
                <Fade in={!!selectedProduct} timeout={700}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold">
                            Here goes the 3D figure
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                            Product ID: {selectedProduct}
                        </Typography>
                    </Box>
                </Fade>
            </Box>

            {/* Products Table (Right Side on Desktop, Top on Mobile) */}
            <Box sx={{ flex: 1, transition: 'all 0.5s ease', width: '100%', order: { xs: 1, lg: 2 } }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Products
                </Typography>
                <TextField
                    id="standard-basic"
                    label="Search Products"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Busca por nombre, categoría, estado o stock…"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ height: 20 }} />

                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="products table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'background.default' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sales</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Offers</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedProducts.map((product) => (
                                <TableRow
                                    key={product.id}
                                    selected={selectedProduct === product.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                        '&:hover': {
                                            bgcolor: 'action.hover'
                                        },
                                        '&.Mui-selected': {
                                            bgcolor: 'action.selected',
                                            '&:hover': {
                                                bgcolor: 'action.selected'
                                            }
                                        }
                                    }}
                                    onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.id}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.sales}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.offer}
                                            color={product.offer === "On Sale" ? "success" : "default"}
                                            size="small"
                                            variant={product.offer === "On Sale" ? "filled" : "outlined"}
                                            onClick={(e) => handleOfferToggle(e, product.offer)}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="edit"
                                            color="primary"
                                            size="small"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        {product.disabled ? (
                                            <IconButton
                                                aria-label="enable"
                                                color="success"
                                                size="small"
                                                onClick={(e) => handleEnable(e, product.id)}
                                            >
                                                <RestoreFromTrashIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                size="small"
                                                onClick={(e) => handleDelete(e, product.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}
