import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCars, deleteCar } from "../services/api";
import CarCard from "./CarCard";
import "./CarList.css";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError("");
      const carData = await getCars();
      setCars(carData);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Failed to load cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) {
      return;
    }

    try {
      await deleteCar(id);
      fetchCars(); // Refresh the list
    } catch (error) {
      console.error("Error deleting car:", error);
      setError("Failed to delete car. Please try again.");
    }
  };

  const handleEditCar = (car) => {
    // Navigate to edit page
    navigate(`/edit-car/${car.id}`, { state: { car } });
  };

  const handleAddCar = () => {
    navigate("/add-car");
  };

  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={fetchCars}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="car-list-container">
      <div className="car-list-header">
        <h1>Car Inventory</h1>
        <button className="btn btn-primary" onClick={handleAddCar}>
          Add New Car
        </button>
      </div>

      <div className="cars-grid">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onEdit={handleEditCar}
            onDelete={handleDeleteCar}
          />
        ))}
      </div>
    </div>
  );
};

export default CarList;
