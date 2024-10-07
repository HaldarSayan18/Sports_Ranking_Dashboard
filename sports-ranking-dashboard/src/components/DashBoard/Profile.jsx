import React, { useState, useEffect } from 'react';
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
import '../styles/Dashboard.css';
import '../styles/Profile.css';
import sports_ranking from '../../images/sport_ranking_logo.svg'
import { FaRegUser } from "react-icons/fa";
import arena from '../../images/arena.svg';
import athelet from '../../images/athelet.svg';
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineScan } from "react-icons/ai";
import news from '../../images/news.svg';
import { MdOutlineLogout } from "react-icons/md";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Header2 from '../common/Header2.jsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { profileUpdateURL } from '../API_fetching/APIs.jsx';
import { FaLongArrowAltLeft } from "react-icons/fa";
import camera from '../../images/camera.svg';
import demoImg from '../../images/demoImg.png'

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

export const registrationScema = yup.object({
    name: yup.string().min(2).max(30).required("Enter your name properly"),
    display: yup.string().min(2).max(30).required("Enter the name you want to display"),
    phone: yup.string().required('Your phone number is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(/@/, 'Email must contain "@" symbol'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required("Please Enter a password")
        .matches(/[\W_]/, 'Password must contain at least one special character'),
    confirmpassword: yup.string().required("Re-enter your input password").oneOf([yup.ref('password'), null], 'Passwords must match'),
    state: yup.string().required('Enter your current state name'),
    city: yup.string().required('Enter your current city name'),
    address: yup.string().required('Your full address is required'),
    check: yup.bool().required().oneOf([true], 'Terms must be accepted')
});

export default function Profile() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [image, setImage] = useState(demoImg);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const sideIcons = [
        <FaRegUser style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <img src={arena} alt='' style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <img src={athelet} alt='' style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <MdOutlineCalendarMonth style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <AiOutlineScan style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />,
        <img src={news} alt='' style={{ height: "20px", width: "20px", color: "#a2a2a2" }} />
    ]

    const [initialValues, setInitialValues] = useState({
        'name': '',
        'display': '',
        'phone': '',
        'email': '',
        'password': '',
        'confirmpassword': '',
        'state': '',
        'city': '',
        'address': '',
        'check': false,
    })
    const { values, touched, errors, handleSubmit, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: registrationScema,
        onSubmit: async (values) => {
            // values.preventDefault(); //prevents page reload
            try {
                const demo = await axios.post(profileUpdateURL, initialValues)
                if (demo.data) {
                    setInitialValues(demo.data)
                    toast.success("Registration successfull")
                    console.log(demo.data);
                    navigate('/log')
                }
                localStorage.setItem("Registration_data: ", JSON.stringify(values))
            }
            catch (error) {
                console.log("Error occured is: ", error);
            }
        }
    });
    useEffect(() => {
        const savedData = localStorage.getItem('Registration_data');
        if (savedData) {
            setInitialValues(JSON.parse(savedData)); // Pre-fill the form with stored data
        }
    }, [])

    const onfile = (event) => {
        console.log("image show: ", event.target.files[0])
        setImage(URL.createObjectURL(event.target.files[0]))
    }
    const handleLogout = () => {
        toast.success("Logged out successfully", {
            position:"top-center"
        })
        setTimeout(() => navigate('/log'), 3000)
    }

    return (
        <div className='dash-container'>
            <ToastContainer/>
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
                    <div className="reg-card profile-card">
                        <div className="browseimg">
                            <div className="upld">
                                <label htmlFor="upload-button" className="uploadBtn">
                                    <img src={image} alt="dummy" width="300" height="300" />
                                    <div style={{borderRadius:"100%", backgroundColor:"yellow", height:"40px", width:"60px"}}><img src={camera} alt='' height="15px" width="15px"/></div>
                                </label>
                                <input
                                    type="file"
                                    accept='image/png, image/gif, image/jpeg, image/jpg, image/svg'
                                    id="upload-button"
                                    style={{ display: "none" }}
                                    onChange={onfile}
                                />
                                <br />
                            </div>
                        </div>
                        <div className="profile-card-body">
                            <form className='form' onSubmit={handleSubmit}>
                                <div className="col mb-3 form-input-field">
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        className="profile-input"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.name && errors.name ? <div className="error">{errors.name}</div> : null}
                                </div>
                                <div className="col mb-3 form-input-field">
                                    <input
                                        type="text"
                                        placeholder='Nick Name'
                                        className="profile-input"
                                        name="display"
                                        value={values.display}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.display && errors.display ? <div className="error">{errors.display}</div> : null}
                                </div>
                                <div className="col mb-3 form-input-field">
                                    <input
                                        type="text"
                                        placeholder='State'
                                        className="profile-input"
                                        name="state"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.state && errors.state ? <div className="error">{errors.state}</div> : null}
                                </div>
                                <div className="col mb-3 form-input-field">
                                    <input
                                        type="text"
                                        placeholder='City'
                                        className="profile-input"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.city && errors.city ? <div className="error">{errors.city}</div> : null}
                                </div>
                                <div className="col mb-3 form-input-field">
                                    <input
                                        type="text"
                                        placeholder='Phone Number'
                                        className="profile-input"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.phone && errors.phone ? <div className="error">{errors.phone}</div> : null}
                                </div>
                                <div className="col mb-3 form-input-field">
                                    <input
                                        type="text"
                                        placeholder='Address'
                                        className="profile-input"
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.address && errors.address ? <div className="error">{errors.address}</div> : null}
                                </div>
                                <div className="col mb-3 form-input-field">
                                    <span>
                                        <input
                                            type="text"
                                            placeholder='Summary'
                                            className="profile-input"
                                            name="summary"
                                            value={values.summary}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </span>
                                    {touched.summary && errors.summary ? <div className="error">{errors.summary}</div> : null}
                                </div>
                                <button type="submit" className="btn btn-primary reg-btn" style={{ borderRadius: "20px" }} checked={values.check}>Save</button>
                            </form>
                        </div>
                        <p style={{ marginRight: "87%" }}><FaLongArrowAltLeft /><Link to="#" style={{ textDecoration: "underline", color: "white", marginLeft: "5px" }}>Back</Link></p>
                    </div>
                </Main>
            </Box>
        </div>
    );
}
