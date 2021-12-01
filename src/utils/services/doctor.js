import axiosInstance from "../apibase";
import history from "../history";
import apiEndPoints from "./endPoints";

const { changePass } = apiEndPoints.doctor;

export const changePassword = (formData, setLoading, setError) => {
  setLoading(true);
  setError(false);
  axiosInstance.post(changePass,
    formData,
  ).then((res) => {
    setLoading(false);
    localStorage.removeItem('token');
    history.push('/template/login');
  })
    .catch(err => {
      setError();
      setLoading(false);
      setError('Please provid correct password');
      console.log('An error has occured' + err);
    })
}