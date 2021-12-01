import React, { useState, useEffect } from 'react';
import loginBanner from '../../assets/images/login-banner.png';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { forgotPassword } from '../../../utils/services/auth';
import { validateEmail } from '../../../utils/validations';

const validate = values => {
	const errors = {};
	const emailError = validateEmail(values.email);
	if (emailError)
		errors.email = emailError;

	return errors;
};

const ForgotPassword = () => {

	const [loading, setLoading] = useState();
	const [error, setError] = useState();

	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validate,
		onSubmit: values => {
			forgotPassword(values, setLoading, setError);
		}
	})


	useEffect(() => {
		document.body.classList.add('account-page');
		return (() => {
			document.body.classList.remove('account-page');
		})
	}, [])


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
										<h3>Forgot Password?</h3>
										<p className="small text-muted">Enter your email to get a password reset link</p>
									</div>
									{loading && <div class="spinner-border text-primary" />}
									{error && <div class="alert alert-danger">{error}</div>}
									<form
										// action="/admin/login"
										onSubmit={formik.handleSubmit} >
										<div className="form-group form-focus">
											<label className="focus-label" >Email</label>
											<input type="email" className="form-control floating" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} />
											{formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
										</div>
										<div className="text-right">
											<Link to="/login" className="forgot-link">Remember your password? </Link>
										</div>
										<button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Reset Password</button>
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

export default ForgotPassword;