const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = "https://final-task-blond.vercel.app";
const MONGO_URI =
  "mongodb+srv://013Ratchanon:<db_password>@taskproject.5ctn4gp.mongodb.net/";

// Middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

// Preflight handler
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }
  next();
});

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
