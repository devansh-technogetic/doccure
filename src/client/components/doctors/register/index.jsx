import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import GoogleLogin from 'react-google-login';

import loginBanner from '../../../assets/images/login-banner.png';
import { Link } from 'react-router-dom';
import { registerDoctor, registerGoogle } from '../../../../utils/services/auth';
import configs from "../../../../../config";
import { validateEmail, validatePassword, validatePhoneNo, validateUserName } from '../../../../utils/validations';


const validate = values => {
	const errors = {};
	const { name, email, phone, password } = values;
	const nameError = validateUserName(name);
	const phoneError = validatePhoneNo(phone);
	const passwordError = validatePassword(password);
	const emailError = validateEmail(email);
	if (nameError)
		errors.name = nameError;
	if (emailError)
		errors.email = emailError;
	if (passwordError)
		errors.password = passwordError;
	if (phoneError)
		errors.phone = phoneError;

	return errors;
};

const DoctorRegister = () => {

	const [loading, setLoading] = useState('');
	const [error, setError] = useState('');

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			password: "",
			role: "doctor"
		},
		validate,
		onSubmit: values => {
			registerDoctor(values, setLoading, setError);
		}
	})

	useEffect(() => {
		document.getElementsByTagName('body')[0].className = 'account-page';
		return () => {
			document.getElementsByTagName('body')[0].className = '';
		}
	}, [])

	
	const responseGoogle = async (gdata) => {
		registerGoogle(gdata.googleId, gdata.tokenId, 'doctor',setLoading , setError);
	}

	return (
		<div className="content">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-8 offset-md-2">
						<div className="account-content">
							<div className="row align-items-center justify-content-center">
								<div className="col-md-7 col-lg-6 login-left">
									<img src={loginBanner} className="img-fluid" alt="Login Banner" />
								</div>
								<div className="col-md-12 col-lg-6 login-right">
									<div className="login-header">
										<h3>Doctor Register <Link to="/register">Not a Doctor?</Link></h3>
									</div>
									{loading && <div class="spinner-border text-primary" />}
									{error && <div class="alert alert-danger">{error}</div>}
									<form
										onSubmit={formik.handleSubmit}>
										<div className="form-group form-focus">
											<input type="text" className="form-control floating" name="name" value={formik.values.name} onChange={formik.handleChange} />
											<label className="focus-label">Name</label>
											{formik.errors?.name ? <div style={{ color: 'red' }}>{formik.errors.name}</div> : ''}
										</div>
										<div className="form-group form-focus">
											<input type="text" className="form-control floating" name="email" value={formik.values.email} onChange={formik.handleChange} />
											<label className="focus-label">Email</label>
											{formik.errors?.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : ''}
										</div>
										<div className="form-group form-focus">
											<input type="text" className="form-control floating" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
											<label className="focus-label">Mobile Number</label>
											{formik.errors?.phone ? <div style={{ color: 'red' }}>{formik.errors.phone}</div> : ''}
										</div>
										<div className="form-group form-focus">
											<input type="password" className="form-control floating" name="password" value={formik.values.password} onChange={formik.handleChange} />
											<label className="focus-label">Create Password</label>
											{formik.errors?.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : ''}
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
	);
}

export default DoctorRegister;