/**
 * API service module for handling all HTTP requests to the backend
 * Centralizes all API calls for easier maintenance
 */

const API_BASE =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3002";

/**
 * Fetches all cars from the backend API
 * @returns {Promise} Promise that resolves to the list of cars
 */
export const getCars = async () => {
  try {
    const response = await fetch(`${API_BASE}/api`);
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    const data = await response.json();
    return data.data; // Your server returns {success: true, data: cars}
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

/**
 * Adds a new car to the database
 * @param {Object} carData - The car object to add
 * @returns {Promise} Promise that resolves to the added car
 */
export const addCar = async (carData) => {
  try {
    const response = await fetch(`${API_BASE}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add car");
    }

    const data = await response.json();
    return data.data; // Your server returns {success: true, data: newCar}
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

/**
 * Updates an existing car
 * @param {number} id - The ID of the car to update
 * @param {Object} carData - The updated car data
 * @returns {Promise} Promise that resolves to the updated car
 */
export const updateCar = async (id, carData) => {
  try {
    const response = await fetch(`${API_BASE}/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update car");
    }

    const data = await response.json();
    return data.data; // Your server returns {success: true, data: updatedCar}
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

/**
 * Deletes a car from the database
 * @param {number} id - The ID of the car to delete
 * @returns {Promise} Promise that resolves when the car is deleted
 */
export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/api/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete car");
    }

    const data = await response.json();
    return data.data; // Your server returns {success: true, data: deletedCar}
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};
