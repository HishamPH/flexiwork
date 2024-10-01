import axios from "axios";

import { dispatch } from "../src/redux/store";
import { logoutUser, setUser } from "../src/redux/slices/userAuth";
import { logoutAdmin } from "../src/redux/slices/adminAuth";
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
      const { data } = error.response;
      console.log(data);
      if (data.tokenExpired && data.isAdmin) {
        await dispatch(logoutAdmin());
        Failed(data.message);
      } else if (data.tokenExpired) {
        dispatch(logoutUser());
        Failed(data.message);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
