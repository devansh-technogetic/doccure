import React, { useState } from 'react';
import DashboardSidebar from '../sidebar/index';
import { changePassword } from '../../../../utils/services/doctor';
import { useFormik } from 'formik';
import { validatePassword } from '../../../../utils/validations';


const validate = values => {
	const errors = {};
	const { oldPassword, newPassword } = values;
	const oldPasswordError = validatePassword(oldPassword);
	const newPasswordError = validatePassword(newPassword);

	if (oldPasswordError)
		errors.oldPassword = oldPasswordError
	if (newPasswordError)
		errors.newPassword = newPasswordError
	return errors;
};

const Password = () => {

	const [error, setError] = useState('');
	const [loading, setLoading] = useState('');

	const formik = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: ''
		},
		validate,
		onSubmit: values => {
			changePassword(values, setLoading, setError);
		}
	})

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
							< DashboardSidebar />
						</div>

						<div className="col-md-7 col-lg-8 col-xl-9">
							<div className="card">
								<div className="card-body">

									{loading && <div class="spinner-border text-primary" />}
									{error && <div class="alert alert-danger">{error}</div>}
									<form onSubmit={formik.handleSubmit}>
										<div className="form-group">
											<label>Old Password</label>
											<input type="password" className="form-control" name="oldPassword" value={formik.values.oldPassword} onChange={formik.handleChange} />
											{formik.errors?.oldPassword ? <div style={{ color: 'red' }}>{formik.errors.oldPassword}</div> : ''}
										</div>
										<div className="form-group">
											<label>New Password</label>
											<input type="password" className="form-control" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} />
											{formik.errors?.newPassword ? <div style={{ color: 'red' }}>{formik.errors.newPassword}</div> : ''}
										</div>
										<div className="form-group">
											<label>Confirm Password</label>
											<input type="password" className="form-control" />
										</div>
										<div className="submit-section">
											<button type="submit" className="btn btn-primary submit-btn"
												onSubmit={formik.handleSubmit}

											>Save Changes</button>
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


