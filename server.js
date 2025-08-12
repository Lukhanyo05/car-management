const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Enhanced body parser configuration
app.use(
  bodyParser.json({
    type: function (req) {
      // Accept both 'application/json' and 'application/json; charset=utf-8'
      const contentType = req.headers["content-type"];
      return contentType && contentType.includes("application/json");
    },
    strict: true, // Only parse actual JSON objects/arrays
  })
);

// Request validation middleware
app.use((req, res, next) => {
  // Only validate POST and PUT requests
  if (req.method === "POST" || req.method === "PUT") {
    const contentType = req.headers["content-type"];

    // Check Content-Type exists and is JSON
    if (!contentType || !contentType.includes("application/json")) {
      return res.status(400).json({
        success: false,
        error:
          "Content-Type must be 'application/json' (with optional charset)",
      });
    }

    // Check body exists for POST/PUT
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        success: false,
        error: "Request body must be a valid JSON object",
      });
    }
  }
  next();
});

// In-memory database
let cars = [
  { id: 1, make: "Mercedes-Benz", model: "A-class", seats: 5 },
  { id: 2, make: "Land Rover", model: "Defender 90", seats: 6 },
];

// Helper function to generate IDs
const generateId = () =>
  cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1;

// GET all cars
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    count: cars.length,
    data: cars,
  });
});

// POST new car
app.post("/api", (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ["make", "model", "seats"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate data types
    if (
      typeof req.body.make !== "string" ||
      typeof req.body.model !== "string" ||
      typeof req.body.seats !== "number"
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Invalid data types - make/model must be strings, seats must be number",
      });
    }

    // Create new car
    const newCar = {
      id: generateId(),
      make: req.body.make.trim(),
      model: req.body.model.trim(),
      seats: req.body.seats,
    };

    cars.push(newCar);
    res.status(201).json({
      success: true,
      data: newCar,
    });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// DELETE car by ID
app.delete("/api/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const initialLength = cars.length;

    cars = cars.filter((car) => car.id !== id);

    if (cars.length === initialLength) {
      return res.status(404).json({
        success: false,
        error: `Car with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Car with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// PUT update car
app.put("/api/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const car = cars.find((car) => car.id === id);

    if (!car) {
      return res.status(404).json({
        success: false,
        error: `Car with ID ${id} not found`,
      });
    }

    // Validate and update each field if provided
    if (req.body.make !== undefined) {
      if (typeof req.body.make !== "string") {
        return res.status(400).json({
          success: false,
          error: "Make must be a string",
        });
      }
      car.make = req.body.make.trim();
    }

    if (req.body.model !== undefined) {
      if (typeof req.body.model !== "string") {
        return res.status(400).json({
          success: false,
          error: "Model must be a string",
        });
      }
      car.model = req.body.model.trim();
    }

    if (req.body.seats !== undefined) {
      if (typeof req.body.seats !== "number") {
        return res.status(400).json({
          success: false,
          error: "Seats must be a number",
        });
      }
      car.seats = req.body.seats;
    }

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("GET    /api      - List all cars");
  console.log("POST   /api      - Add new car");
  console.log("PUT    /api/:id  - Update car");
  console.log("DELETE /api/:id  - Delete car");
});
