const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Load environment variables

const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/event"));
app.use("/api/booking", require("./routes/booking"));
app.use("/api/review", require("./routes/review"));

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Event Management System API is running.");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
