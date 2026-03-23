import { create } from "zustand";
import axios from "../api/axios";

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    const res = await axios.get("/tasks");
    set({ tasks: res.data, loading: false });
  },

  createTask: async (data) => {
    await axios.post("/tasks", data);
  },

  deleteTask: async (id) => {
    await axios.delete(`/tasks/${id}`);
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id),
    }));
  },
}));
