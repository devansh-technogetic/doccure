import React, { useState } from 'react';
import DashboardSidebar from '../sidebar/sidebar.jsx';
import { useFormik } from 'formik';

import StickyBox from "react-sticky-box";
import { changePassword } from '../../../../../utils/services/patient.js';
import { validatePassword } from '../../../../../utils/validations/index.js';

const validate = values => {
	const errors = {};
	const { oldPassword, newPassword, confirmPassword } = values;
	const oldPasswordError = validatePassword(oldPassword);
	const newPasswordError = validatePassword(newPassword);
	const confirmPasswordError = validatePassword(confirmPassword);
	if(oldPasswordError)
	errors.oldPassword = oldPasswordError;
  if(newPasswordError)
	errors.newPassword = newPasswordError;
  if(confirmPasswordError)
	errors.confirmPassword = confirmPasswordError;

	return errors;
};

const Password = () => {

	const [loading, setLoading] = useState('');
	const [error, setError] = useState('');

	const formik = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		},
		validate,
		onSubmit: values => {
			changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword }, setLoading, setError);
		}
	})

	const { oldPassword, newPassword, confirmPassword } = formik.values;
	const { handleSubmit, handleChange, errors } = formik;

	return (
		<div>
			<div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><a href="/home">Home</a></li>
									<li className="breadcrumb-item active" aria-current="page">Profile Settings</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">Profile Settings</h2>
						</div>
					</div>
				</div>
			</div>
			<div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
							<StickyBox offsetTop={20} offsetBottom={20}>
								< DashboardSidebar />
							</StickyBox>
						</div>
						<div className="col-md-7 col-lg-8 col-xl-9">
							<div className="card">
								<div className="card-body">
									{loading && <div class="spinner-border text-primary" />}
									{error && <div class="alert alert-danger">{error}</div>}
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<label>Old Password</label>
											<input type="password" className="form-control" name="oldPassword" value={oldPassword} onChange={handleChange} />
											{errors.oldPassword ? <div style={{ color: 'red' }}>{errors.oldPassword}</div> : null}
										</div>
										<div className="form-group">
											<label>New Password</label>
											<input type="password" className="form-control" name="newPassword" value={newPassword} onChange={handleChange} />
											{errors.newPassword ? <div style={{ color: 'red' }}>{errors.newPassword}</div> : null}
										</div>
										<div className="form-group">
											<label>Confirm Password</label>
											<input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
											{errors.confirmPassword ? <div style={{ color: 'red' }}>{errors.confirmPassword}</div> : null}
										</div>
										<div className="submit-section">
											<button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
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

export default Password;


