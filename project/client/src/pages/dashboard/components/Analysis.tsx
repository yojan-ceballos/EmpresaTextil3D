import { Box, Typography, Grid, Paper } from "@mui/material";

export default function Analysis() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Analysis
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Typography variant="h6" color="primary">Sales Overview</Typography>
                        {/* Placeholder for Chart */}
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', mt: 2, borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">Chart Placeholder</Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Typography variant="h6" color="primary">User Growth</Typography>
                        {/* Placeholder for Chart */}
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', mt: 2, borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">Chart Placeholder</Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Typography variant="h6" color="primary">Revenue</Typography>
                        {/* Placeholder for Chart */}
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', mt: 2, borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">Chart Placeholder</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
