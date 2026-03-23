import axios from "axios";

const instance = axios.create({
  baseURL: "https://final-task-a1hr.onrender.com", // URL backend ของคุณ
  withCredentials: true, // ส่ง cookie ด้วย (ถ้า backend ใช้ session)
});

// เพิ่ม interceptor ให้ใส่ JWT token อัตโนมัติ
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ดึง token จาก localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ใส่ลงใน header
  }
  return config;
});

export default instance;
