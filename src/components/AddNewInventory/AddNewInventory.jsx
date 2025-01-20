import { useState, useEffect } from "react";
import axios from "axios";
import "./AddNewInventory.scss";
import { useNavigate } from "react-router-dom";
import InventoryFormHeader from "../InventoryFormHeader/InventoryFormHeader";
import FormError from "../FormError/FormError";

function AddNewInventory() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const response = await axios.get(
          "https://instock-api-d37f38c9d716.herokuapp.com/warehouses"
        );
        setWarehouseList(response.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };
    getWarehouses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !itemName ||
      !description ||
      !category ||
      !status ||
      !quantity ||
      !warehouse
    ) {
      setError(true);
      return;
    }

    const newInventoryItem = {
      warehouse_id: Number(warehouse),
      item_name: itemName,
      description: description,
      category: category,
      status: status,
      quantity: quantity,
    };

    try {
      await axios.post(
        "https://instock-api-d37f38c9d716.herokuapp.com/inventories",
        newInventoryItem
      );
      navigate(-1);
    } catch (error) {
      console.error("Unable to add inventory item:", error);
    }
  };

  return (
    <>
      <section className="new-inventory">
        <InventoryFormHeader>Add New Inventory Item</InventoryFormHeader>
        <form className="new-inventory__form" onSubmit={handleSubmit}>
          <div className="new-inventory__item-details">
            <h2>Item Details</h2>
            <label className="new-inventory__label">Item Name</label>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              className={`new-inventory__input new-inventory__input--name ${
                error && !itemName ? "inventory-form__input--error" : ""
              } `}
              id="itemNameInput"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <FormError errorState={error} field={itemName}>
              Item is required
            </FormError>
            <label className="new-inventory__label">Description</label>
            <textarea
              type="text"
              name="description"
              placeholder="Please enter a brief item description..."
              className={`new-inventory__input new-inventory__input--description ${
                error && !description ? "inventory-form__input--error" : ""
              }`}
              id="descriptionInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormError errorState={error} field={description}>
              Description is required
            </FormError>{" "}
            <label className="new-inventory__label">Category</label>
            <div className="new-inventory__dropdown">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`inventory-form__input inventory-form__input--select
                  ${error && !category ? "inventory-form__input--error" : ""}`}
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Gear">Gear</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Health">Health</option>
              </select>
              <FormError errorState={error} field={category}>
                Category is required
              </FormError>
            </div>
          </div>

          <div className="new-inventory__item-avail">
            <h2>Item Availability</h2>
            <label className="new-inventory__label">Status</label>
            <div className="new-inventory__radio-btns">
              <input
                type="radio"
                name="status"
                value="In Stock"
                className="new-inventory__radio-btn"
                id="inStock"
                onChange={() => setStatus("In Stock")}
              />
              <label htmlFor="inStock" className="new-inventory__label">
                In stock
              </label>

              <input
                type="radio"
                name="status"
                value="Out Of Stock"
                className="new-inventory__radio-btn"
                id="outOfStock"
                onChange={() => setStatus("Out Of Stock")}
              />
              <label htmlFor="outOfStock" className="new-inventory__label">
                Out of stock
              </label>
            </div>

            <label className="new-inventory__label">Quantity</label>
            <input
              type="text"
              name="quantity"
              placeholder=" "
              className={`new-inventory__input new-inventory__input--quantity ${
                error && !quantity ? "inventory-form__input--error" : ""
              }`}
              id="quantityInput"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <FormError errorState={error && !quantity} field={quantity}>
              Quantity is required
            </FormError>

            <label className="new-inventory__label">Warehouse</label>
            <div className="new-inventory__dropdown">
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className={`inventory-form__input inventory-form__input--select
                  ${error && !warehouse ? "inventory-form__input--error" : ""}`}
              >
                <option value="" disabled>
                  Please select
                </option>
                {warehouseList.map((wh) => (
                  <option key={wh.id} value={wh.id}>
                    {wh.warehouse_name}
                  </option>
                ))}
              </select>
              <FormError errorState={error} field={warehouse}>
                Warehouse is required
              </FormError>
            </div>
          </div>

          <div className="new-inventory__btns-container">
            <button
              type="button"
              className="new-inventory__btn new-inventory__btn--cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="new-inventory__btn new-inventory__btn--add"
            >
              + Add Item
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddNewInventory;
