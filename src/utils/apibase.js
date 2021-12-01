import axios from 'axios';
import configs from '../../config';
import history from './history';

const data = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : '';
const token = data?.token;

const axiosInstance = axios.create({
  baseURL: configs.apiEndPoint,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("token") ?
      JSON.parse(localStorage.getItem("token")).refreshToken : '';
    if (
      refreshToken &&
      error.response.data.name === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const data = JSON.parse(localStorage.getItem("token"));
      const { role, refreshToken } = data;
      localStorage.removeItem('token');
      return axiosInstance
        .post(`/user/refreshToken`, { refreshToken: refreshToken })
        .then((res) => {
          localStorage.setItem('token', JSON.stringify({ token: res.data.token, role, refreshToken }));
          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          return axiosInstance(originalRequest);
        });
    } else if (error.response.data.name === 'jwt expired') {
      history.push('/');
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;

