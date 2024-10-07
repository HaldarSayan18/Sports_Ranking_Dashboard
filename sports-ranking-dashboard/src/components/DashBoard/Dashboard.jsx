import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Header2 from '../common/Header2';
import '../styles/Dashboard.css';
import sports_ranking from '../../images/sport_ranking_logo.svg'
import { FaRegUser } from "react-icons/fa";
import arena from '../../images/arena.svg';
import athelet from '../../images/athelet.svg';
import barchart from '../../images/barchart.svg';
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineScan } from "react-icons/ai";
import news from '../../images/news.svg';
import { MdOutlineLogout } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
// const handleLogout=()=>{
    //     setLoggedUser(null);
    // }
    
export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        toast.success("Logged out successfully", {
            position: "top-center"
        })
        setTimeout(() => navigate('/log'), 3000)
    }

    const sideIcons = [
        <FaRegUser style={{ height: "20px", width: "20px", color: "#a2a2a2" }} onClick={() => {
            navigate('/profile')
        }}/>,
        <img src={arena} alt='' style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <img src={athelet} alt='' style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <MdOutlineCalendarMonth style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <AiOutlineScan style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <img src={news} alt='' style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />
    ]

    return (
        <div className='dash-container'>
            <ToastContainer />
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" open={open}>
                    <Toolbar style={{ backgroundColor: "#171717", boxShadow: "none" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <img src={sports_ranking} alt='' style={{ height: "40px", width: "45px" }} />
                        </IconButton>
                        <Header2 />
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#171717',
                            color: 'white',
                            // fontSize: "12px"
                        },
                        // backgroundColor:'black',
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose} style={{ color: "white", border: "none" }}>
                            {theme.direction === 'ltr' ? <img src={sports_ranking} alt='' style={{ height: "40px", width: "45px" }} /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {['My Profile', 'Arena', 'Athelets', 'Tournaments', 'Transaction', 'News'].map((text, index) => (
                            <ListItem key={text}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {sideIcons[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <br />
                    <button style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: "70px", backgroundColor: "#1D1D1D", height: "40px", marginLeft: "30px", outline: "none", boxShadow: "none", border: "none" }}>
                        <MdOutlineLogout style={{ height: "20px", width: "20px", color: "#f4c727", marginRight: "5px" }} />
                        <text style={{ color: "#949494", cursor: "pointer" }} onClick={handleLogout}>Logout</text>
                    </button>
                </Drawer>
                <Main open={open}>
                    <div className='card-container'>
                        <div className="md-3 card card-style" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <div style={{ border: "2px solid #292929", borderRadius: "100%", backgroundColor: "#292929", height: "52px", width: "52px", textAlign: "center" }}>
                                    <img src={arena} alt='' height="50px" width="50px" />
                                </div>
                                <div style={{ fontSize: "25px" }}>
                                    <p className="card-text" style={{ marginLeft: "20px" }}>Arena</p>
                                    <p style={{ color: "#f4c727", fontWeight: "700", marginLeft: "20px" }}>14</p>
                                </div>
                            </div>
                        </div>
                        <div className="md-3 card card-style" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <div style={{ border: "2px solid #292929", borderRadius: "100%", backgroundColor: "#292929", height: "62px", width: "62px", textAlign: "center" }}>
                                    <img src={athelet} alt='' height="50px" width="50px" />
                                </div>
                                <div style={{ fontSize: "25px" }}>
                                    <p className="card-text" style={{ marginLeft: "20px" }}>Athelets</p>
                                    <p style={{ color: "#f4c727", fontWeight: "700", marginLeft: "20px" }}>16</p>
                                </div>
                            </div>
                        </div>
                        <div className="card card-style" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <div style={{ border: "2px solid #292929", borderRadius: "100%", backgroundColor: "#292929", height: "60px", width: "60px", textAlign: "center" }}>
                                    <img src={barchart} alt='' height="55px" width="40px" />
                                </div>
                                <div style={{ fontSize: "25px" }}>
                                    <p className="card-text" style={{ marginLeft: "10px" }}>Total Revenue</p>
                                    <p style={{ color: "#f4c727", fontWeight: "700", marginLeft: "10px" }}>$7525566</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Main>
            </Box>
        </div>
    );
}
