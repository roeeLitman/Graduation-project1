import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";


export default function NavBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            setIsDrawerOpen(open);
        };

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    width: '50vw', 
                    '& .MuiDrawer-paper': { width: '20vw' },
                }}
            >
                <List>
                    <ListItem>
                        <NavLink to="/">Login</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/Frequency-of-incidents">Select year</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/Frequency-of-incidents">Select year</NavLink>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}
