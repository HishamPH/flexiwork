import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Use a separate axios instance to avoid interceptors loop
        const response = await axios.get("/api/user/refreshToken");

        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");

        // Redirect to login or handle unauthenticated state
      }
    } else if (error.response.status === 403) {
      localStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;