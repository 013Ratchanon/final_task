require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
const corsOrigins = process.env.CLIENT_URL;

// CORS
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
);

// Middleware
app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/tasks", require("./routes/task.routes"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
