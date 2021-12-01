import axiosInstance from "../apibase";
import history from "../history";
import apiEndPoints from "./endPoints";
import Messages from "../language/en/en.json";

const { patientRegister, userLogin, userRegister, forgotPass, googleRegister,googleLogin } = apiEndPoints.auth;
const { userExist, incorrectInfo, tokenExpired, somethingWrong } = Messages.apiServicesMsg;

export const registerPatient = (data, setError, setLoading) => {

  setLoading(true);
  setError(false);
  axiosInstance.post(patientRegister, data).then((res) => {
    const {token, refreshToken} = res.data;
    setLoading(false);
    localStorage.setItem('token', JSON.stringify({ token: token, role: 'patient',refreshToken }));
    history.push('patient/dashboard');
  })
    .catch(err => {
      console.log(err);
      setError(userExist);
      setLoading(false);
    })
}

export const loginUser = (formData, setLoading, setError) => {

  setLoading(true);
  setError(false);
  axiosInstance.post(userLogin, formData).then((res) => {
    setLoading(false);
    let { token, role,refreshToken } = res.data;
    localStorage.setItem('token', JSON.stringify({ token, role,refreshToken }));
    if (role === 'doctor') {
      history.push('template/doctor/doctor-dashboard');
    } else if (role === 'patient') {
      history.push('template/patient/dashboard');
    }
  })
    .catch(err => {
      console.log(err);
      setLoading(false);
      setError(incorrectInfo);
    })
}

export const registerDoctor = (formData, setLoading, setError) => {

  setLoading(true);
  setError(false);
  axiosInstance.post(userRegister, formData).then((res) => {
    setLoading(false);
    const {token,refreshToken} = res.data;
    localStorage.setItem('token', JSON.stringify({ token: token, role: 'doctor',refreshToken }));
    history.push('doctor-dashboard');
  })
    .catch(err => {
      setLoading(false);
      setError(userExist);
      console.log(err);
    })

}

export const forgotPassword = (email, setLoading, setError) => {
  setError(false);
  setLoading(true);
  axiosInstance.post(forgotPass, email).then((res) => {
    setLoading(false);
  })
    .catch(err => {
      console.log(err);
      setLoading(false);
      setError(tokenExpired);
    })
}

export const logout = () => {
  axiosInstance.post(logout).then(() => {
    localStorage.removeItem('token');
    history.push('/');
  })
    .catch((err) => {
      console.log(somethingWrong);
    })
}

export const registerGoogle = (id, gtoken, role, setLoading, setError,) => {
  setError(false);
  setLoading(true);
  axiosInstance.post(googleRegister, { googleId: id, token: gtoken, role }).then((res) => {
    setLoading(false);
    let { token,refreshToken } = res.data;
    localStorage.setItem('token', JSON.stringify({ token, role,refreshToken }));
    if (role === 'doctor') {
      history.push('template/doctor/doctor-dashboard');
    } else if (role === 'patient') {
      history.push('template/patient/dashboard');
    }
  })
    .catch((err) => {
      setLoading(false);
      setError(userExist);
      console.log(err, err.message);
    })
}

export const loginGoogle = (email, googleId, setLoading, setError) => {
  setLoading(true);
  setLoading(false);
  axiosInstance.post(googleLogin, { email,googleId })
    .then((res) => {
      setLoading(false);
      let { token, role,refreshToken } = res.data;
      localStorage.setItem('token', JSON.stringify({ token, role ,refreshToken}));
      if (role === 'doctor') {
        history.push('template/doctor/doctor-dashboard');
      } else if (role === 'patient') {
        history.push('template/patient/dashboard');
      }
    }).catch((err) => {
      setError(somethingWrong);
      setLoading(false);
    })
}