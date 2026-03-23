import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate("/"); // หลัง login สำเร็จ
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 to-purple-400">
      <form
        onSubmit={handleSubmit}
        className="card bg-white shadow-xl p-8 w-96 rounded-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Login
        </h2>

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

        <button className="btn btn-primary w-full mb-4">Login</button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
