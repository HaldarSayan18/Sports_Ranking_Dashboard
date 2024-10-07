import React, { useEffect, useState } from 'react'
import "../styles/Registration.css";
import sportsLogo from "../../images/sport_ranking_logo.svg"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { regURL } from '../API_fetching/APIs.jsx';

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

const Registration = () => {
    const navigate = useNavigate();
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
                const demo = await axios.post(regURL, initialValues)
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
    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     if(values.check){
    //         setTimeout(() => navigate('/log'), 3000)
    //     }
    // }
    return (
        <div className='reg-container'>
            <ToastContainer />
            <Header />
            <div className="reg-card">
                <img src={sportsLogo} className="card-img-top" alt="..." />
                <p style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Create Your Account</p>
                <div className="card-body">
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className="col mb-3 form-input-field">
                                <input
                                    type="text"
                                    placeholder='Name'
                                    className="input"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.name && errors.name ? <div className="error">{errors.name}</div> : null}
                                <input
                                    type="text"
                                    placeholder='Display Name'
                                    className="input"
                                    name="display"
                                    value={values.display}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.display && errors.display ? <div className="error">{errors.display}</div> : null}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col mb-3 form-input-field">
                                <input
                                    type="text"
                                    placeholder='Phone Number'
                                    className="input"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.phone && errors.phone ? <div className="error">{errors.phone}</div> : null}
                                <input
                                    type="email"
                                    placeholder='Email address'
                                    className="input"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.email && errors.email ? <div className="error">{errors.email}</div> : null}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col mb-3 form-input-field">
                                <input
                                    type="password"
                                    placeholder='Password'
                                    className="input"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.password && errors.password ? <div className="error">{errors.password}</div> : null}
                                <input
                                    type="password"
                                    placeholder='Confirm Password'
                                    className="input"
                                    name="confirmpassword"
                                    value={values.confirmpassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.confirmpassword && errors.confirmpassword ? <div className="error">{errors.confirmpassword}</div> : null}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col mb-3 form-input-field">
                                <input
                                    type="text"
                                    placeholder='State'
                                    className="input"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.state && errors.state ? <div className="error">{errors.state}</div> : null}
                                <input
                                    type="text"
                                    placeholder='City'
                                    className="input"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.city && errors.city ? <div className="error">{errors.city}</div> : null}
                            </div>
                        </div>
                        <div className='row form-input-field'>
                            <input
                                type="text"
                                placeholder='Address'
                                className="address-input"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.address && errors.address ? <div className="error">{errors.address}</div> : null}
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" name='check' checked={values.check} onChange={handleChange} onBlur={handleBlur} />
                            <label class="form-check-label" for="exampleCheck1">Accept <Link to="#" className='t_c'>Terms & Condition</Link></label>
                            {touched.check && errors.check ? <div className="error">{errors.check}</div> : null}
                        </div>
                        <button type="submit" className="btn btn-primary reg-btn" style={{ borderRadius: "20px", width: "100%" }} checked={values.check}>Register</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Registration
