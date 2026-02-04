import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { useMemo, useEffect } from 'react';
import './App.css'; // Import global CSS
import Dashboard from './pages/dashboard/Dashboard';
import { useStore } from './store/useStore';
import Showroom from './pages/Showroom/Showroom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';


// Color Palettes
const colorPalettes = {
    blue: { main: '#90caf9' },
    purple: { main: '#ce93d8' },
    pink: { main: '#f48fb1' },
    orange: { main: '#ffcc80' },
};

function App() {
    const { mode, colorTheme } = useStore();

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: mode,
                primary: colorPalettes[colorTheme],
                background: {
                    default: mode === 'dark' ? '#121212' : '#f5f5f5',
                    paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
                },
            },
        });
    }, [mode, colorTheme]);

    // Sync Theme with CSS Variables for App.css
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', theme.palette.primary.main);
        root.style.setProperty('--bg-color', theme.palette.background.default);
        root.style.setProperty('--text-color', theme.palette.text.primary);
    }, [theme]);

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline is kept for normalizing, but App.css handles specific overrides */}
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/showroom" element={<Showroom />} />
                    <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
