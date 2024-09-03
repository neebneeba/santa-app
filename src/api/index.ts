// I created this file to initialize an Axios instance and call the API from the backend.
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.ORIGIN,
});

export default axiosInstance;
