import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import GoogleLogin from 'react-google-login';

import loginBanner from '../../assets/images/login-banner.png';
import { Link } from 'react-router-dom';
import { loginGoogle, loginUser } from '../../../utils/services/auth';
import { validateEmail, validatePassword } from '../../../utils/validations';
import configs from '../../../../config';


const validate = values => {
	const errors = {};
	const { email, password } = values;
	const emailError = validateEmail(email);
	const passwordError = validatePassword(password);
	if (emailError)
		errors.eamil = emailError;
	if (passwordError)
		errors.password = passwordError;
	return errors;
};


const LoginContainer = () => {

	const [error, setError] = useState('');
	const [loading, setLoading] = useState('');

	const formik = useFormik({
		initialValues: {
			email: "devansh",
			password: "shukla"
			
		},
		validate,
		onSubmit: async (values) => {
			       console.log("clicked");
			//    (loginUser(values, setLoading, setError));

		}
	})

	const responseGoogle = async (gdata) => {
		loginGoogle(gdata.profileObj.email,gdata.googleId, setLoading, setError);
	}


	useEffect(() => {
		document.body.classList.add('account-page');
		return () => {
			document.body.classList.remove('account-page');
		}
	}, []);

	return (

		<div className="content">
			<div className="container-fluid">

				<div className="row">
					<div className="col-md-8 offset-md-2">


						<div className="account-content">
							<div className="row align-items-center justify-content-center">
								<div className="col-md-7 col-lg-6 login-left">
									<img src={loginBanner} className="img-fluid" alt="Doccure Login" />
								</div>
								<div className="col-md-12 col-lg-6 login-right">
									<div className="login-header">
										<h3>Login <span>Doccure</span></h3>
									</div>
									{loading && <div class="spinner-border text-primay" />}
									{error && <div class="alert alert-danger">{error}</div>}
									<form onSubmit={formik.handleSubmit}>
										<div className="form-group form-focus">
											<input type="email" className="form-control floating" name='email' value={formik.values.email} onChange={formik.handleChange} />
											<label className="focus-label">Email</label>
											{formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
										</div>
										<div className="form-group form-focus">
											<input type="password" className="form-control floating" name='password' value={formik.values.password} onChange={formik.handleChange} />
											<label className="focus-label">Password</label>
											{formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
										</div>
										<div className="text-right">
											<Link to="/forgot-password" className="forgot-link">Forgot Password ?</Link>
										</div>
										<button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Login</button>
										<div className="text-center dont-have">Don’t have an account?<Link to="/register">Register</Link></div>
									</form>
									<div className="login-or">
											<span className="or-line"></span>
											<span className="span-or">or</span>
										</div>
										<div className="row form-row social-login">
											<div className="col-3">
												{/* <a href="#0" className="btn btn-facebook btn-block">
													<i className="fab fa-facebook-f mr-1"></i>Login</a> */}
											</div>
											<div className="col-6">
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
								</div>
							</div>
						</div>


					</div>
				</div>

			</div>

		</div>

	);
}

export default LoginContainer;