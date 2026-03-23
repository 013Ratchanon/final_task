import { useEffect, useState, useRef } from "react";
import { useTaskStore } from "../stores/useTaskStore";
import { useAuthStore } from "../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { tasks, fetchTasks, createTask, deleteTask } = useTaskStore();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // สำหรับรายละเอียด
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    fetchTasks();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTask({ title, description, status: "pending" });
    fetchTasks();
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 relative">
      {/* Navbar */}
      <nav className="navbar bg-white shadow-lg px-6 py-3 flex justify-between items-center fixed w-full z-20">
        <div className="text-2xl font-bold text-purple-700 animate-pulse">
          TaskFlow
        </div>

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-full hover:bg-purple-100 transition shadow-sm"
            >
              <span className="text-purple-800 font-medium">{user.name}</span>
              <span className="bg-purple-400 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                {user.name[0]}
              </span>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-lg p-2 border border-gray-200 z-10">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 rounded hover:bg-purple-50 transition text-purple-700 font-medium"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded hover:bg-red-100 text-red-600 font-medium transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="p-6 pt-24 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-900">Tasks</h1>

        <div className="flex flex-col gap-2 mb-6">
          <input
            className="input input-bordered flex-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <textarea
            className="textarea textarea-bordered flex-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)"
          />
          <button
            className="btn btn-primary animate-bounce"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="grid gap-4">
          <AnimatePresence>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard key={task._id} task={task} onDelete={handleDelete} />
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4 text-lg">
                No tasks yet. Add your first task!
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Add Task Button */}
      <button
        onClick={handleAdd}
        className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-purple-700 transition animate-pulse"
      >
        +
      </button>
    </div>
  );
}

// Component สำหรับ Task
function TaskCard({ task, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      whileHover={{ scale: 1.02 }}
      className={`card p-4 rounded-lg flex flex-col gap-2 shadow-lg border-l-4 transition
        ${task.status === "completed" ? "border-green-400 bg-green-50" : "border-purple-400 bg-purple-50"}`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`font-medium ${task.status === "completed" ? "text-green-800" : "text-purple-800"}`}
        >
          {task.title}
        </span>
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-info"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide" : "Show"} Details
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>

      {expanded && (
        <p className="text-gray-700 mt-2 border-t pt-2">
          {task.description || "No description."}
        </p>
      )}
    </motion.div>
  );
}
