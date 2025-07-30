import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      toast.error("Session expired. Please log in again.");

      localStorage.removeItem("adminToken");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      console.error("API Error:", error.response || error.message);
      toast.error("Something went wrong.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;