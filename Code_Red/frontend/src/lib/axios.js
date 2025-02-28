import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Update if needed

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensures cookies (like tokens) are sent
  headers: {
    "Content-Type": "application/json",
  },
});

// Ensure credentials (cookies) are always included in requests
axios.defaults.withCredentials = true;

export default axiosInstance;
