import React, { useState } from "react";
import "./AddNewWarehouse.scss";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormError from "../FormError/FormError";

function AddNewWarehouse() {
  const [error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = (data) => {
    const newErrors = {};
    const phoneRegex = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
    const emailRegex = /^\w+@\w+\.\w+$/;

    if (!data.warehouse_name)
      newErrors.warehouse_name = "Warehouse name is required.";
    if (!data.address) newErrors.address = "Address is required.";
    if (!data.city) newErrors.city = "City is required.";
    if (!data.country) newErrors.country = "Country is required.";
    if (!data.contact_name)
      newErrors.contact_name = "Contact name is required.";
    if (!data.contact_position)
      newErrors.contact_position = "Contact position is required.";
    if (!data.contact_phone || !phoneRegex.test(data.contact_phone)) {
      newErrors.contact_phone =
        "Please provide a valid phone number in the format: +1 (###) ###-####.";
    }
    if (!data.contact_email || !emailRegex.test(data.contact_email)) {
      newErrors.contact_email =
        "Please provide a valid email address in the format: example@mail.com.";
    }

    return newErrors;
  };

  async function postWarehouse(event) {
    event.preventDefault();

    const newWarehouse = {
      warehouse_name: event.target.warehouse_name.value,
      address: event.target.address.value,
      city: event.target.city.value,
      country: event.target.country.value,
      contact_name: event.target.contact_name.value,
      contact_position: event.target.contact_position.value,
      contact_phone: event.target.contact_phone.value,
      contact_email: event.target.contact_email.value,
    };

    const validationErrors = validateForm(newWarehouse);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setError(true);
      return;
    } else {
      setFormErrors({});
      setError(false);
    }

    try {
      const response = await axios.post(
        "https://instock-api-d37f38c9d716.herokuapp.com/warehouses",
        newWarehouse
      );
      if (response) {
        event.target.reset();
        navigate("/warehouses");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="addWarehouse">
      <div className="addWarehouse__empty"></div>
      <div className="addWarehouse__header">
        <Link to={"/warehouses"}>
          <img
            className="addWarehouse__header-icon"
            src={arrowBack}
            alt="arrowBack"
          ></img>
        </Link>

        <h1 className="addWarehouse__header-itle">Add New Warehouse</h1>
      </div>
      <div className="addWarehouse__formWrapper">
        <form onSubmit={postWarehouse} className="addwarehouse__form">
          <div className="addWarehouse__form-sections">
            <div className="addWarehouse__form-section addWarehouse__form-warehouse">
              <h2 className="addWarehouse__form-details">Warehouse Details</h2>

              <label
                className="addWarehouse__form-label"
                htmlFor="warehouse_name"
              >
                Warehouse Name
              </label>
              <input
                className={`addWarehouse__form-input ${
                  formErrors.warehouse_name
                    ? "addWarehouse__form-input--error"
                    : ""
                }`}
                name="warehouse_name"
                id="warehouse_name"
                placeholder="Warehouse Name"
              />
              <FormError errorState={formErrors.warehouse_name}>
                {formErrors.warehouse_name}
              </FormError>

              <label className="addWarehouse__form-label" htmlFor="address">
                Street Name
              </label>
              <input
                className={`addWarehouse__form-input ${
                  formErrors.address ? "addWarehouse__form-input--error" : ""
                }`}
                name="address"
                id="address"
                placeholder="Street Name"
              />
              <FormError errorState={formErrors.address}>
                {formErrors.address}
              </FormError>

              <label className="addWarehouse__form-label" htmlFor="city">
                City
              </label>
              <input
                className={`addWarehouse__form-input ${
                  formErrors.city ? "addWarehouse__form-input--error" : ""
                }`}
                name="city"
                id="city"
                placeholder="City"
              />
              <FormError errorState={formErrors.city}>
                {formErrors.city}
              </FormError>

              <label className="addWarehouse__form-label" htmlFor="country">
                Country
              </label>
              <input
                className={`addWarehouse__form-input ${
                  formErrors.country ? "addWarehouse__form-input--error" : ""
                }`}
                name="country"
                id="country"
                placeholder="Country"
              />
              <FormError errorState={formErrors.country}>
                {formErrors.country}
              </FormError>
            </div>

            <div className="addWarehouse__form-section addWarehouse__form-contactDetails">
              <h2 className="addWarehouse__form-details">Contact Details</h2>

              <label
                className="addWarehouse__form-label"
                htmlFor="contact_name"
              >
                Contact Name
              </label>
              <input
                className={`addWarehouse__form-input ${
                  formErrors.contact_name
                    ? "addWarehouse__form-input--error"
                    : ""
                }`}
                name="contact_name"
                id="contact_name"
                placeholder="Contact Name"
              />
              <FormError errorState={formErrors.contact_name}>
                {formErrors.contact_name}
              </FormError>

              <label
                className="addWarehouse__form-label"
                htmlFor="contact_position"
              >
                Position
              </label>
              <input
                className={`addWarehouse__form-input ${
                  formErrors.contact_position
                    ? "addWarehouse__form-input--error"
                    : ""
                }`}
                name="contact_position"
                id="contact_position"
                placeholder="Position"
              />
              <FormError errorState={formErrors.contact_position}>
                {formErrors.contact_position}
              </FormError>

              <label
                className="addWarehouse__form-label"
                htmlFor="contact_phone"
              >
                Phone Number
              </label>
              <input
                className={`addWarehouse__form-input ${
                  formErrors.contact_phone
                    ? "addWarehouse__form-input--error"
                    : ""
                }`}
                name="contact_phone"
                id="contact_phone"
                placeholder="Phone Number"
              />
              <FormError errorState={formErrors.contact_phone}>
                {formErrors.contact_phone}
              </FormError>

              <label
                className="addWarehouse__form-label"
                htmlFor="contact_email"
              >
                Email
              </label>
              <input
                className={`addWarehouse__form-input ${
                  formErrors.contact_email
                    ? "addWarehouse__form-input--error"
                    : ""
                }`}
                name="contact_email"
                id="contact_email"
                placeholder="Email"
              />
              <FormError errorState={formErrors.contact_email}>
                {formErrors.contact_email}
              </FormError>
            </div>
          </div>

          <div className="addWarehouse__form-buttons">
            <button
              className="addWarehouse__form-button addWarehouse__form-cancel"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button
              className="addWarehouse__form-button addWarehouse__form-add"
              type="submit"
            >
              + Add Warehouse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewWarehouse;
