import { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigit = useNavigate();
    const toggleDrawer =
        (open: boolean) => {
            setIsDrawerOpen(open);
        };

    return (
        <>
            <AppBar position="static" sx={{ marginBottom: "4px" }}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={ () => toggleDrawer(true)}
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
                onClose={() => toggleDrawer(false)}
                sx={{
                    width: "50vw",
                    "& .MuiDrawer-paper": { width: "20vw" },
                }}
            >
                <List>
                    <ListItem style={{color: "black"}}>
                        <ListItemButton>
                            <ListItemText
                                primary="Deadliest Attack Types Analysis"
                                onClick={() => {
                                    navigit("/");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                                primary="Select year"
                                onClick={() => {
                                    navigit("/Frequency-of-incidents");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                                primary="information about organizations"
                                onClick={() => {
                                    navigit("/information-on-organizations");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                                primary="Places with the highest average casualties"
                                onClick={() => {
                                    navigit("/Number-of-casualties");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                                primary="terror highest casualties"
                                onClick={() => {
                                    navigit("/terror-highest-casualties");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                                primary="top terror organizations"
                                onClick={() => {
                                    navigit("/top-terror-organizations");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                                primary="create new event"
                                onClick={() => {
                                    navigit("/create");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}
