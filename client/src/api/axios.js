import axios from "axios";

const instance = axios.create({
  baseURL: "https://final-task-a1hr.onrender.com", // ปรับเป็น URL backend ของคุณ
  withCredentials: true, // ถ้าใช้ cookie
});

// เพิ่ม interceptor ใส่ token ให้ทุก request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
