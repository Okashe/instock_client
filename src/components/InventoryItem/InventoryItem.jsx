import React from "react";
import "./InventoryItem.scss";
import { Link, useNavigate } from "react-router-dom";
import editIcon from "../../assets/Icons/edit-24px.svg";
import deleteicon from "../../assets/Icons/delete_outline-24px.svg";
import ChevronRightIcon from "../../assets/Icons/chevron_right-24px.svg";

function InventoryItem({ inventory, handleOpenInventoryModal }) {
  const statusClass =
    inventory.status.toLowerCase() === "in stock" ? "in-stock" : "out-of-stock";
  const navigate = useNavigate();

  return (
    <div className="inventory-item">
      <div className="inventory-item__main-container">
        <div className="inventory-item__details-container">
          <div className="inventory-item__name-container">
            <p className="inventory-item__label-mobile">INVENTORY ITEM</p>
            <Link
              to={`/inventories/${inventory.id}`}
              className="inventory-item__name-sub-container"
            >
              <p className="inventory-item__name">{inventory.item_name}</p>
              <img
                src={ChevronRightIcon}
                alt="More details"
                className="inventory-item__chevron"
              />
            </Link>
          </div>
          <div className="inventory-item__category-container">
            <p className="inventory-item__label-mobile">CATEGORY</p>
            <p className="inventory-item__category">{inventory.category}</p>
          </div>
        </div>
        <div className="inventory-item__info-container">
          <div className="inventory-item__status-container">
            <p className="inventory-item__label-mobile">STATUS</p>
            <p className={`inventory-item__status ${statusClass}`}>
              {inventory.status}
            </p>
          </div>
          <div className="inventory-item__quantity-container">
            <p className="inventory-item__label-mobile">QTY</p>
            <p className="inventory-item__quantity">{inventory.quantity}</p>
          </div>
          <div className="inventory-item__warehouse-container inventory-item__warehouse-container-warehouse">
            <p className="inventory-item__label-mobile">WAREHOUSE</p>
            <p className="inventory-item__warehouse">
              {inventory.warehouse_name}
            </p>
          </div>
        </div>
      </div>
      <div className="inventory-item__actions">
        <button className="inventory-item__delete">
          <img
            src={deleteicon}
            id={inventory.id}
            onClick={handleOpenInventoryModal}
          />
        </button>
        <button className="inventory-item__delete">
          <img
            src={editIcon}
            onClick={() => navigate(`/inventories/edit/${inventory.id}`)}
          />
        </button>
      </div>
    </div>
  );
}

export default InventoryItem;
