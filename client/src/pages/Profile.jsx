import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; // axios instance ใส่ token อัตโนมัติ

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const getMe = useAuthStore((s) => s.getMe);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await getMe();
      setLoading(false);
    };
    fetchUser();
  }, [getMe]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess("");
      const res = await axios.put("/auth/update", form); // endpoint update user
      await getMe(); // refresh user info
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setSuccess("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-purple-700">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p>User not found. Please login.</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Profile</h1>

        {/* Editable fields */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">ID:</span>{" "}
          <span className="text-gray-800">{user._id}</span>
        </div>

        {success && (
          <p
            className={`mt-2 ${
              success.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {success}
          </p>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="btn btn-primary flex-1"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button onClick={handleLogout} className="btn btn-error flex-1">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
