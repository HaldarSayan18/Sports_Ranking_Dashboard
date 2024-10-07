import React from 'react'
import '../styles/Login.css'
import sportsLogo from "../../images/sport_ranking_logo.svg"
import bg2 from "../../images/bg2Img.png"
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import Header from '../common/Header';
import Footer from '../common/Footer';

const LogIn = () => {
    return (
        <>
        <div className='row login-container form-division'>
            <Header />
            <div className='col bgImg-container'>
                <img src={bg2} alt='' className='bg2'/>
            </div>
            <div className="col">
                <div className="log-card">
                    <img src={sportsLogo} className="card-img-top" alt="..." height="50px"/>
                    <p style={{textAlign:"center", fontSize:"16px", fontWeight:"600"}}>Ready to Login</p>
                    <div className="card-body">
                        <form className='form'>
                            <div className="mb-3 form-control">
                                <HiOutlineMail className='icons' />
                                <input type="email" placeholder='| Email address' className="email-input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 form-control">
                                <RiLockPasswordLine className='icons' /> <input type="password" placeholder='| Passowrd' className="password-input" id="exampleInputPassword1" />
                            </div>
                            <p className='forgot-password'>Forgot password?</p>
                            <button type="submit" className="btn btn-primary log-btn">Login</button>
                            {/* <div className='inputDiv'>
                                <div className='inputContainer'>
                                    <i className="fa-regular fa-envelope inputIcon"></i>
                                    <input type='text' placeholder='| Email address' className='inputField' />
                                </div>
                                <div className='inputContainer'>
                                    <LockOpenIcon className='inputIcon' />
                                    <input type='password' placeholder='| Password' className='inputField' />
                                </div>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
            {/* <div style={{backgroundColor:"black"}}>
                <p>&copy</p>
            </div> */}
            <Footer/>
        </div>
        </>
    )
}

export default LogIn
