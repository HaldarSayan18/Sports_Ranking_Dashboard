import React, { useState } from 'react'
import '../styles/Login.css'
import axios from 'axios'
import { useFormik } from 'formik';
import * as yup from 'yup';
import sportsLogo from "../../images/sport_ranking_logo.svg"
import bg2 from "../../images/bg2Img.png"
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import Header from '../common/Header';
import Footer from '../common/Footer';
import { logURL } from '../API_fetching/APIs';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const LogIn = () => {
    const [login, setLogin] = useState();
    const navigate = useNavigate();
    const regData = JSON.parse(localStorage.getItem("Registration_data"))
    // Form validation schema
    const loginSchema = yup.object({
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required'),
        password: yup.string().required("Please Enter password"),
    });

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            // try {
            //     if (values.email === regData.email && values.password === regData.password) {
            //         toast.success("Login successful");
            //         setTimeout(() => navigate('/dash'), 5000);
            //     } else {
            //         toast.error("Login failed. Please try again.");
            //     }
            // } catch (error) {
            //     console.error("Error occurred:", error);
            // }
            const data = {
                'email': values.email,
                'password': values.password,
            }
            axios.post(logURL, data)
                .then(response => {
                    console.log(response);
                    console.log("response");
                    toast.success("Login successful");
                    setTimeout(() => navigate('/dash'), 3000);
                    // if (response.data.success) {
                    //     setLogin(response.data.data);
                    //     // toast.success("Login successful");
                    //     // setTimeout(()=>navigate('/dash'), 3000);
                    // }
                    // else {
                    //     alert(response.data.message);
                    // }
                })
                .catch(error => {
                    console.log(error);
                    toast.success("Login successful");
                    setTimeout(() => navigate('/dash'), 3000);
                })
        }
    });

    return (
        <>
            <ToastContainer />
            <div className=' login-container form-division'>
                <Header />
                <div className='col bgImg-container'>
                    <img src={bg2} alt='' className='bg2' />
                </div>
                <div className='col'>
                    <div className="log-card">
                        <img src={sportsLogo} className="card-img-top" alt="..." height="50px" />
                        <p style={{ textAlign: "center", fontSize: "24px", fontWeight: "600" }}>Ready to Login</p>
                        <div className="card-body">
                            <form className='form' onSubmit={handleSubmit}>
                                <div className="mb-3 form-control email-input">
                                    <HiOutlineMail className='icons' />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='| Email address'
                                        className="input"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
                                </div>
                                <div className="mb-3 form-control password-input">
                                    <RiLockPasswordLine className='icons' />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder='| Password'
                                        className="input"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
                                </div>
                                <p className='forgot-password'>Forgot password?</p>
                                <button type="submit" className="btn btn-primary log-btn">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default LogIn;
