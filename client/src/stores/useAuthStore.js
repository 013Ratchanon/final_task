import { create } from "zustand";
import axios from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,

  register: async (data) => {
    try {
      set({ loading: true });
      await axios.post("/auth/register", data);
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message });
    }
  },

  login: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });
    } catch (err) {
      set({ error: err.response?.data?.message });
    }
  },

  getMe: async () => {
    try {
      const res = await axios.get("/auth/me"); // axios instance ใส่ token ให้อัตโนมัติ
      set({ user: res.data });
    } catch (err) {
      console.log("getMe error:", err.response?.status, err.response?.data);
      set({ user: null, token: null });
      localStorage.removeItem("token");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
