const apiEndPoints = {
  auth: {
    patientRegister: 'user/register',
    userLogin: 'user/signup',
    userRegister: 'user/register',
    forgotPass: 'user/forgotPassword',
    logout: 'user/logout',
    googleRegister:'user/googleRegister',
    googleLogin:'user/googleLogin'
  },
  doctor: {
    changePass: 'doctor/changePassword'
  },
  patient: {
    changePass: 'patient/changePassword'
  }
}

export default apiEndPoints;