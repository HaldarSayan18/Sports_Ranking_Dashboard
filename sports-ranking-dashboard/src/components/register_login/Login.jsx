import React from 'react'
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
import { toast } from 'react-toastify';

const LogIn = () => {
    const navigate = useNavigate();

    // Form validation schema
    const loginSchema = yup.object({
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required')
            .matches(/@/, 'Email must contain "@" symbol'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required("Please Enter a password")
            .matches(/[\W_]/, 'Password must contain at least one special character'),
    });

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(logURL, values);

                if (response.data.success) {
                    toast.success("Login successful");
                    navigate('/dash');
                } else {
                    toast.error(response.data.message || "Login failed. Please try again.");
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }
    });

    return (
        <>
            <div className='row login-container form-division'>
                <Header />
                <div>
                    <img src={bg2} alt='' className='bg2' />
                </div>
                <div>
                    <div className="log-card">
                        <img src={sportsLogo} className="card-img-top" alt="..." height="50px" />
                        <p style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Ready to Login</p>
                        <div className="card-body">
                            <form className='form' onSubmit={handleSubmit}>
                                <div className="mb-3 form-control">
                                    <HiOutlineMail className='icons' />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='| Email address'
                                        className="email-input"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
                                </div>
                                <div className="mb-3 form-control">
                                    <RiLockPasswordLine className='icons' />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder='| Password'
                                        className="password-input"
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
