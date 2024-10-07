import React from 'react'
import "../styles/Registration.css";
import sportsLogo from "../../images/sport_ranking_logo.svg"
import { Link } from 'react-router-dom';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';

const Registration = () => {
    // const [post, setPost] = useState("")
    return (
        <div className='reg-container'>
            <Header/>
            <div className="reg-card">
                <img src={sportsLogo} className="card-img-top" alt="..." />
                <p style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Create Your Account</p>
                <div className="card-body">
                    <form className='form'>
                        <div className='row'>
                            <div className="col mb-3 form-input-field">
                                <input type="name" placeholder='Name' className="input" id="" aria-describedby="emailHelp" />
                            </div>
                            <div className="col mb-3 form-input-field">
                                <input type="name" placeholder='Display Name' className="input" id="" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col mb-3 form-input-field">
                                <input type="phone" placeholder='Phone Number' className="input" id="" />
                            </div>
                            <div className="col mb-3 form-input-field">
                                <input type="email" placeholder='Email address' className="input" id="" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col mb-3 form-input-field">
                                <input type="password" placeholder='Password' className="input" id="" aria-describedby="emailHelp" />
                            </div>
                            <div className="col mb-3 form-input-field">
                                <input type="password" placeholder='Confirm Passowrd' className="input" id="" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col mb-3 form-input-field">
                                <input type="text" placeholder='State' className="input" id="" aria-describedby="emailHelp" />
                            </div>
                            <div className="col mb-3 form-input-field">
                                <input type="text" placeholder='City' className="input" id="" />
                            </div>
                        </div>
                        <div className='row mb-3 form-input-field'>
                            <input type="text" placeholder='Address' className="address-input" id="" />
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Accept <Link to="#" className='t_c'>Terms & Condition</Link></label>
                        </div>
                        <button type="submit" className="btn btn-primary reg-btn" style={{ borderRadius: "20px", width: "100%" }}>Register</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Registration
