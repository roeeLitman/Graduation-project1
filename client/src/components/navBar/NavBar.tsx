import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';


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
                        <ListItemButton><NavLink to="/">Login</NavLink></ListItemButton>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/Frequency-of-incidents">Select year</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/information-on-organizations">information about organizations</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/Number-of-casualties">Places with the highest average casualties</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/terror-highest-casualties">terror highest casualties</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/top-terror-organizations">top terror organizations</NavLink>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}
