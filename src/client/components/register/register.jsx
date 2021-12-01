import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import GoogleLogin from 'react-google-login';

import loginBanner from '../../assets/images/login-banner.png';
import { registerGoogle, registerPatient } from '../../../utils/services/auth';
import { validateEmail, validatePassword, validatePhoneNo, validateUserName } from '../../../utils/validations';
import configs from '../../../../config';

const validate = (values) => {
    let errors = {};
    let { name, email, password, phone } = values;
    const errorsName = validateUserName(name);
    const errorsEmail = validateEmail(email);
    const errorsPassword = validatePassword(password);
    const errorsPhone = validatePhoneNo(phone);
    if(errorsName)
    errors.name=errorsName;
    if(errorsEmail)
    errors.email=errorsEmail;
    if(errorsPassword)
        errors.password=errorsPassword;
    if(errorsPhone)
        errors.phone=errorsPhone;

    return errors;
}

const Register = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
   
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            role: "patient"
        },
        validate,
        onSubmit: (values) => {
            registerPatient(values, setError, setLoading);
        }
    })

    useEffect(() => {
        document.body.classList.add('account-page');
        return (() => {
            document.body.classList.remove('account-page');
        })
    }, []);

    
	const responseGoogle = async (gdata) => {
		registerGoogle(gdata.googleId, gdata.tokenId, 'patient',setLoading, setError);
	}

    return (
        <div className="content">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-8 offset-md-2">


                        <div className="account-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-7 col-lg-6 login-left">
                                    <img src={loginBanner} className="img-fluid" alt="Doccure Register" />
                                </div>
                                <div className="col-md-12 col-lg-6 login-right">
                                    <div className="login-header">
                                        <h3>Patient Register <Link to="/doctor/doctor-register" >Are you a Doctor?</Link></h3>
                                    </div>

                                    {loading && <div class="spinner-border text-primary" />}
                                    {error && <div class="alert alert-danger">{error}</div>}
                                    <form
                                        // action="/doctor/doctor-dashboard"
                                        onSubmit={formik.handleSubmit}>
                                        <div className="form-group form-focus">
                                            <input type="text" className="form-control floating" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                                            <label className="focus-label" htmlFor="name">Name</label>
                                            {formik.errors.name ? <div style={{ color: 'red' }}>{formik.errors.name}</div> : null}
                                        </div>
                                        <div className="form-group form-focus">
                                            <input type="text" className="form-control floating" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                                            <label className="focus-label" htmlFor="email">Email</label>
                                            {formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                                        </div>
                                        <div className="form-group form-focus">
                                            <input type="text" className="form-control floating" id="mobile" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                                            <label className="focus-label" htmlFor="mobile">Mobile Number</label>
                                            {formik.errors.phone ? <div style={{ color: 'red' }}>{formik.errors.phone}</div> : null}
                                        </div>
                                        <div className="form-group form-focus">
                                            <input type="password" className="form-control floating" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                                            <label className="focus-label" htmlFor="password">Create Password</label>
                                            {formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
                                        </div>
                                        <div className="text-right">
                                            <Link to="/login" className="forgot-link">Already have an account?</Link>
                                        </div>
                                        <button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Signup</button>
                                        <div className="login-or">
                                            <span className="or-line"></span>
                                            <span className="span-or">or</span>
                                        </div>
                                        <div className="row form-row social-login">
                                            <div className="col-3">
                                                {/* <a href="#0" className="btn btn-facebook btn-block"><i className="fab fa-facebook-f mr-1"></i> Login</a> */}
                                            </div>
                                            <div className="col-6">
                                                {/* <a href="#0" className="btn btn-google btn-block"><i className="fab fa-google mr-1"></i> Login</a> */}
                                                <GoogleLogin
													clientId={configs.googleId}
													render={renderProps => (
														<span onClick={renderProps.onClick} className="btn btn-google btn-block"><i className="fab fa-google mr-1"></i>Login</span> 
													)}
													buttonText="Login"
													onSuccess={responseGoogle}
													onFailure={responseGoogle}
													cookiePolicy={'single_host_origin'}
												/>
                                            </div>
                                            <div className="col-3">

                                            </div>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register;