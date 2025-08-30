import React from "react";
import "./CarCard.css";

/**
 * CarCard component - Displays individual car information
 * @param {Object} props - Component props
 * @param {Object} props.car - The car object to display
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 */
const CarCard = ({ car, onEdit, onDelete }) => {
  return (
    <div className="car-card">
      <div className="car-details">
        <h3>
          {car.make} {car.model}
        </h3>
        <p>Seats: {car.seats}</p>
        <p>ID: {car.id}</p>
        <div className="car-actions">
          <button className="btn-edit" onClick={() => onEdit(car)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(car.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
