const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// --- Config ---
const PORT = 5000; // หรือ Render จะใช้ PORT auto assign
const CLIENT_URL = "final-task-blond.vercel.app"; // URL ของ Vercel frontend
const MONGO_URI =
  "mongodb+srv://013Ratchanon:<db_password>@taskproject.5ctn4gp.mongodb.net/"; // MongoDB Atlas URI

// --- CORS ---
app.use(
  cors({
    origin: CLIENT_URL, // อนุญาต frontend domain
    credentials: true,
  }),
);

// --- Middleware ---
app.use(express.json());

// --- MongoDB connect ---
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// --- Routes ---
app.use("/auth", require("./routes/auth.routes"));
app.use("/tasks", require("./routes/task.routes"));

// --- Test route ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- Start server ---
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
