import axiosInstance from "../apibase";
import history from "../history";
import apiEndPoints from "./endPoints";

const {changePass}= apiEndPoints.patient;

export const changePassword =(formData, setLoading , setError)=>{
  
    setLoading(true);
    setError(false);
		axiosInstance.post(changePass, formData)
    .then(()=>{
      setLoading(false);
      localStorage.removeItem('token');
      history.push('/template/login');
    })
	  .catch(err=>{
      setError('Please provide the correct password');
      setLoading(false);
     console.log("An error has occured");
	  })
}