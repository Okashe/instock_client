import "./EditWarehouseItem.scss";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import FormError from "../FormError/FormError";

function EditWarehouseItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [warehouseName, setWarehouseName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPosition, setContactPosition] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const response = await axios.get(
          `https://instock-api-d37f38c9d716.herokuapp.com/warehouses/${id}`
        );
        const warehouseData = response.data;
        setWarehouseName(warehouseData.warehouse_name);
        setAddress(warehouseData.address);
        setCity(warehouseData.city);
        setCountry(warehouseData.country);
        setContactName(warehouseData.contact_name);
        setContactPosition(warehouseData.contact_position);
        setContactPhone(warehouseData.contact_phone);
        setContactEmail(warehouseData.contact_email);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchWarehouseData();
  }, [id]);

  const handleChangeWarehouseName = (event) =>
    setWarehouseName(event.target.value);
  const handleChangeAddress = (event) => setAddress(event.target.value);
  const handleChangeCity = (event) => setCity(event.target.value);
  const handleChangeCountry = (event) => setCountry(event.target.value);
  const handleChangeContactName = (event) => setContactName(event.target.value);
  const handleChangeContactPosition = (event) =>
    setContactPosition(event.target.value);
  const handleChangeContactPhone = (event) =>
    setContactPhone(event.target.value);
  const handleChangeContactEmail = (event) =>
    setContactEmail(event.target.value);

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (warehouseName.trim() === "")
      newErrors.warehouseName = "Warehouse name is required.";
    if (address.trim() === "") newErrors.address = "Address is required.";
    if (city.trim() === "") newErrors.city = "City is required.";
    if (country.trim() === "") newErrors.country = "Country is required.";
    if (contactName.trim() === "")
      newErrors.contactName = "Contact name is required.";
    if (contactPosition.trim() === "")
      newErrors.contactPosition = "Contact position is required.";
    if (!phoneRegex.test(contactPhone)) {
      newErrors.contactPhone =
        "Please provide a valid phone number in the format: +1 (###) ###-####.";
    }
    if (!emailRegex.test(contactEmail)) {
      newErrors.contactEmail = "Please provide a valid email address.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setError(true);
      return;
    }

    try {
      const requestBody = {
        warehouse_name: warehouseName,
        address: address,
        city: city,
        country: country,
        contact_name: contactName,
        contact_position: contactPosition,
        contact_phone: contactPhone,
        contact_email: contactEmail,
      };

      await axios.put(
        `https://instock-api-d37f38c9d716.herokuapp.com/warehouses/${id}`,
        requestBody
      );
      navigate(-1);
    } catch (error) {
      console.error("Unable to update warehouse:", error);
      setError(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editWarehouse">
      <div className="editWarehouse__empty"></div>
      <div className="editWarehouse__header">
        <Link to={"/warehouses"}>
          <img
            className="editWarehouse__header-icon"
            src={arrowBack}
            alt="arrowBack"
          ></img>
        </Link>

        <h1 className="editWarehouse__header-itle">Edit Warehouse</h1>
      </div>
      <div className="editWarehouse__formWrapper">
        <form className="editWarehouse__form" onSubmit={handleSubmit}>
          <div className="editWarehouse__form-sections">
            <div className="editWarehouse__form-section editWarehouse__form-warehouse">
              <h2 className="editWarehouse__form-details">Warehouse Details</h2>

              <label
                className="editWarehouse__form-label"
                htmlFor="warehouse_name"
              >
                Warehouse Name
              </label>
              <input
                className={`editWarehouse__form-input ${
                  formErrors.warehouseName
                    ? "editWarehouse__form-input--error"
                    : ""
                }`}
                name="warehouse_name"
                id="warehouse_name"
                placeholder="Warehouse Name"
                onChange={handleChangeWarehouseName}
                value={warehouseName}
              />
              <FormError errorState={formErrors.warehouseName}>
                {formErrors.warehouseName}
              </FormError>

              <label className="editWarehouse__form-label" htmlFor="address">
                Street Name
              </label>
              <input
                className={`editWarehouse__form-input ${
                  formErrors.address ? "editWarehouse__form-input--error" : ""
                }`}
                name="address"
                id="address"
                placeholder="Street Name"
                onChange={handleChangeAddress}
                value={address}
              />
              <FormError errorState={formErrors.address}>
                {formErrors.address}
              </FormError>

              <label className="editWarehouse__form-label" htmlFor="city">
                City
              </label>
              <input
                className={`editWarehouse__form-input ${
                  formErrors.city ? "editWarehouse__form-input--error" : ""
                }`}
                name="city"
                id="city"
                placeholder="City"
                onChange={handleChangeCity}
                value={city}
              />
              <FormError errorState={formErrors.city}>
                {formErrors.city}
              </FormError>

              <label className="editWarehouse__form-label" htmlFor="country">
                Country
              </label>
              <input
                className={`editWarehouse__form-input ${
                  formErrors.country ? "editWarehouse__form-input--error" : ""
                }`}
                name="country"
                id="country"
                onChange={handleChangeCountry}
                placeholder="Country"
                value={country}
              />
              <FormError errorState={formErrors.country}>
                {formErrors.country}
              </FormError>
            </div>

            <div className="editWarehouse__form-section editWarehouse__form-contactDetails">
              <h2 className="editWarehouse__form-details">Contact Details</h2>

              <label
                className="editWarehouse__form-label"
                htmlFor="contact_name"
              >
                Contact Name
              </label>
              <input
                className={`editWarehouse__form-input ${
                  formErrors.contactName
                    ? "editWarehouse__form-input--error"
                    : ""
                }`}
                name="contact_name"
                id="contact_name"
                placeholder="Contact Name"
                onChange={handleChangeContactName}
                value={contactName}
              />
              <FormError errorState={formErrors.contactName}>
                {formErrors.contactName}
              </FormError>

              <label
                className="editWarehouse__form-label"
                htmlFor="contact_position"
              >
                Position
              </label>
              <input
                className={`editWarehouse__form-input ${
                  formErrors.contactPosition
                    ? "editWarehouse__form-input--error"
                    : ""
                }`}
                name="contact_position"
                id="contact_position"
                placeholder="Position"
                onChange={handleChangeContactPosition}
                value={contactPosition}
              />
              <FormError errorState={formErrors.contactPosition}>
                {formErrors.contactPosition}
              </FormError>

              <label
                className="editWarehouse__form-label"
                htmlFor="contact_phone"
              >
                Phone Number
              </label>
              <input
                className={`editWarehouse__form-input ${
                  formErrors.contactPhone
                    ? "editWarehouse__form-input--error"
                    : ""
                }`}
                name="contact_phone"
                id="contact_phone"
                placeholder="Phone Number"
                onChange={handleChangeContactPhone}
                value={contactPhone}
              />
              <FormError errorState={formErrors.contactPhone}>
                {formErrors.contactPhone}
              </FormError>

              <label
                className="editWarehouse__form-label"
                htmlFor="contact_email"
              >
                Email
              </label>
              <input
                className={`editWarehouse__form-input ${
                  formErrors.contactEmail
                    ? "editWarehouse__form-input--error"
                    : ""
                }`}
                name="contact_email"
                id="contact_email"
                placeholder="Email"
                onChange={handleChangeContactEmail}
                value={contactEmail}
              />
              <FormError errorState={formErrors.contactEmail}>
                {formErrors.contactEmail}
              </FormError>
            </div>
          </div>

          <div className="editWarehouse__form-buttons">
            <button
              className="editWarehouse__form-button editWarehouse__form-cancel"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button
              className="editWarehouse__form-button editWarehouse__form-add"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditWarehouseItem;
