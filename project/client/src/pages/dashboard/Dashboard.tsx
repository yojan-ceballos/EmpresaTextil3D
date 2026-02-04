import React, { useState } from "react";
import { Box } from "@mui/material";
import DashboardDrawer from "./components/Drawer";
import Analysis from "./components/Analysis";
import Settings from "./components/Settings";
import Products from "./components/Products";
import Header from "./components/Header";

// Placeholder for other components
const Invoices = () => <Box sx={{ p: 3 }}>Invoices Component</Box>;

export default function Dashboard() {
    const [currentView, setCurrentView] = useState("analysis");
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const renderContent = () => {
        switch (currentView) {
            case "products":
                return <Products />;
            case "analysis":
                return <Analysis />;
            case "invoices":
                return <Invoices />;
            case "settings":
                return <Settings />;
            default:
                return <Analysis />;
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <DashboardDrawer
                currentView={currentView}
                onViewChange={(view) => {
                    setCurrentView(view);
                    setMobileOpen(false); // Close drawer on mobile when item selected
                }}
                mobileOpen={mobileOpen}
                onDrawerToggle={handleDrawerToggle}
            />

            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", height: "100vh", overflow: "hidden", display: 'flex', flexDirection: 'column', width: { sm: `calc(100% - 260px)` } }}>
                <Header onNavigate={setCurrentView} onDrawerToggle={handleDrawerToggle} />
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
}