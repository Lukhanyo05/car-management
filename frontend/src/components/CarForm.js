import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCar, updateCar } from "../services/api";
import "./CarForm.css";

/**
 * CarForm component for adding and editing cars
 * @param {Object} props - Component props
 * @param {boolean} props.isEditing - Whether we're editing an existing car
 * @param {Object} props.carData - The car data to edit (if isEditing is true)
 */
const CarForm = ({ isEditing = false, carData = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    seats: 5,
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (isEditing && carData) {
      setFormData({
        make: carData.make || "",
        model: carData.model || "",
        seats: carData.seats || 5,
        imageUrl: carData.imageUrl || "",
      });
    }
  }, [isEditing, carData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "seats" ? parseInt(value) || "" : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.make.trim()) newErrors.make = "Make is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.seats || formData.seats < 1 || formData.seats > 20) {
      newErrors.seats = "Please enter a valid number of seats (1-20)";
    }
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isEditing && carData) {
        await updateCar(carData.id, formData);
        alert("Car updated successfully!");
      } else {
        await addCar(formData);
        alert("Car added successfully!");
      }

      // Redirect to cars list
      navigate("/cars");
    } catch (error) {
      console.error("Error saving car:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/cars");
  };

  return (
    <div className="car-form-container">
      <h2>{isEditing ? "Edit Car" : "Add New Car"}</h2>

      <form onSubmit={handleSubmit} className="car-form">
        <div className="form-group">
          <label htmlFor="make">Make *</label>
          <input
            type="text"
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            className={errors.make ? "error" : ""}
            placeholder="e.g., Toyota, Mercedes-Benz"
            disabled={loading}
          />
          {errors.make && <span className="error-text">{errors.make}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="model">Model *</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className={errors.model ? "error" : ""}
            placeholder="e.g., Corolla, A-class"
            disabled={loading}
          />
          {errors.model && <span className="error-text">{errors.model}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="seats">Seats *</label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            min="1"
            max="20"
            className={errors.seats ? "error" : ""}
            disabled={loading}
          />
          {errors.seats && <span className="error-text">{errors.seats}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={errors.imageUrl ? "error" : ""}
            placeholder="https://example.com/car-image.jpg"
            disabled={loading}
          />
          {errors.imageUrl && (
            <span className="error-text">{errors.imageUrl}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Car" : "Add Car"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
