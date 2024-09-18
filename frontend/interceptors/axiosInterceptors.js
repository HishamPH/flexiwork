import axios from "axios";

import { dispatch } from "../src/redux/store";
import { logoutUser } from "../src/redux/slices/userAuth";
import { Failed } from "../src/helper/popup";

const axiosInstance = axios.create({
  baseURL: "/api", 
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem("accessToken");

//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     console.log(config);

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      const {data} = error.response;
      if(data.tokenExpired){
        dispatch(logoutUser());
        Failed(data.message);
      }
    } 

    return Promise.reject(error);
  }
);

export default axiosInstance;