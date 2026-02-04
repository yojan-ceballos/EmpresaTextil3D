import { Box, Typography, Switch, FormControlLabel, Paper, Divider, Button } from "@mui/material";

export default function Settings() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Settings
            </Typography>

            <Paper sx={{ p: 3, maxWidth: 600 }}>
                <Typography variant="h6" gutterBottom>
                    General Settings
                </Typography>
                <FormControlLabel control={<Switch defaultChecked />} label="Enable Notifications" />
                <FormControlLabel control={<Switch />} label="Dark Mode" />

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Account
                </Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                    Edit Profile
                </Button>
                <Button variant="outlined" color="error" sx={{ mt: 1, ml: 2 }}>
                    Delete Account
                </Button>
            </Paper>
        </Box>
    );
}
