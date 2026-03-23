import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const register = useAuthStore((s) => s.register); // สมมติมีฟังก์ชัน register
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/login"); // หลัง register สำเร็จ ไปหน้า login
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 to-purple-400">
      <form
        onSubmit={handleSubmit}
        className="card bg-white shadow-xl p-8 w-96 rounded-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Register
        </h2>

        <input
          placeholder="Name"
          type="text"
          className="input input-bordered w-full mb-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          type="email"
          className="input input-bordered w-full mb-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-6 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="btn btn-primary w-full mb-4">Register</button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
