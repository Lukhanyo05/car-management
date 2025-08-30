const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
}

// Your existing API routes
let cars = [
  { id: 1, make: "Mercedes-Benz", model: "A-class", seats: 5, imageUrl: "" },
  { id: 2, make: "Land Rover", model: "Defender 90", seats: 6, imageUrl: "" },
];

// GET all cars
app.get("/api", (req, res) => {
  res.json({
    success: true,
    data: cars,
    count: cars.length,
    timestamp: new Date().toISOString(),
  });
});

// POST a new car
app.post("/api", (req, res) => {
  // Your existing POST logic
});

// PUT update a car
app.put("/api/:id", (req, res) => {
  // Your existing PUT logic
});

// DELETE a car
app.delete("/api/:id", (req, res) => {
  // Your existing DELETE logic
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Serve React app in production (must be after API routes)
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚗 AutoManager Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
