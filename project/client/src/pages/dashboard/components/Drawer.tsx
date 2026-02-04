import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import NotificationsIcon from "@mui/icons-material/Notifications";


const drawerWidth = 260;

interface DashboardDrawerProps {
  currentView: string;
  onViewChange: (view: string) => void;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export default function DashboardDrawer({ currentView, onViewChange, mobileOpen, onDrawerToggle }: DashboardDrawerProps) {

  const handleLogout = () => {
    // Add real logout logic here later
    alert("Logging out...");
  };

  const menuItems = [
    { id: "products", label: "Productos", icon: <InventoryIcon /> },
    { id: "orders", label: "Pedidos", icon: <ShoppingCartIcon /> },
    { id: "invoices", label: "Facturas", icon: <ReceiptLongIcon /> },
    { id: "returns", label: "Devoluciones", icon: <AssignmentReturnIcon /> },
    { id: "analysis", label: "Análisis", icon: <AnalyticsIcon /> },
    { id: "notifications", label: "Notificaciones", icon: <NotificationsIcon /> },
  ];


  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* LOGO / TITLE */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          FMy Dashboard
        </Typography>
      </Box>

      {/* MAIN MENU */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={currentView === item.id}
              onClick={() => onViewChange(item.id)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* PUSH CONTENT DOWN */}
      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      {/* SETTINGS */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={currentView === "settings"}
            onClick={() => onViewChange("settings")}
          >
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>

      {/* PROFILE */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
          "&:hover": { bgcolor: "action.hover" }
        }}
        onClick={handleLogout}
      >
        <Avatar
          src="https://i.pravatar.cc/100"
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography variant="body2" fontWeight="bold">
            My Profile
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Logout
            </Typography>
            <LogoutIcon sx={{ fontSize: 14, color: "text.secondary" }} />
          </Box>

        </Box>
      </Box>
    </Box>
  );

  return (

    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 'min(85%, 350px)' // Responsive width: up to 85% of screen but capped at 350px
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
