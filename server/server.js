const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = "https://final-task-blond.vercel.app"; // ✅ ต้องมี https://
const MONGO_URI =
  "mongodb+srv://013Ratchanon:<db_password>@taskproject.5ctn4gp.mongodb.net/";

// --- CORS ---
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);
app.options("*", cors({ origin: CLIENT_URL, credentials: true })); // รองรับ preflight

// Middleware
app.use(express.json());

// MongoDB connect
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/tasks", require("./routes/task.routes"));

// Test
app.get("/", (req, res) => res.send("API is running..."));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
