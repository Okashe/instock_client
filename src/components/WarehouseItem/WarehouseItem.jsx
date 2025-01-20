import React from "react";
import "./WarehouseItem.scss";
import { Link, useNavigate } from "react-router-dom";
import editIcon from "../../assets/Icons/edit-24px.svg";
import deleteicon from "../../assets/Icons/delete_outline-24px.svg";
import ChevronRightIcon from "../../assets/Icons/chevron_right-24px.svg";

function WarehouseItem({ warehouse, handleOpenWarehouseModal }) {
  const navigate = useNavigate();

  return (
    <div className="warehouse">
      <div className="warehouse__main-container">
        <div className="warehouse__details-container">
          <div className="warehouse__detail-container warehouse__detail-container--warehouse">
            <p className="warehouse__label-mobile">WAREHOUSE</p>
            <Link
              to={`/warehouses/${warehouse.id}`}
              className="warehouse__name-sub-container"
            >
              <p className="warehouse__name">{warehouse.warehouse_name}</p>
              <img
                src={ChevronRightIcon}
                alt="More details"
                className="warehouse__chevron"
              />
            </Link>
          </div>
          <div className="warehouse__detail-container warehouse__detail-container--address">
            <p className="warehouse__label-mobile">ADDRESS</p>
            <p className="warehouse__detail">
              {warehouse.address}, {warehouse.city}, {warehouse.country}
            </p>
          </div>
        </div>
        <div className="warehouse__info-container">
          <div className="warehouse__detail-container warehouse__detail-container--contact-name">
            <p className="warehouse__label-mobile">CONTACT NAME</p>
            <p className="warehouse__detail">{warehouse.contact_name}</p>
          </div>
          <div className="warehouse__detail-container warehouse__detail-container--contact-info">
            <p className="warehouse__label-mobile">CONTACT INFO</p>
            <p className="warehouse__detail">{warehouse.contact_phone}</p>
            <p className="warehouse__detail">{warehouse.contact_email}</p>
          </div>
        </div>
      </div>
      <div className="warehouse__actions-container">
        <button aria-label="Delete item" className="warehouse__delete">
          <img
            src={deleteicon}
            id={warehouse.id}
            onClick={handleOpenWarehouseModal}
          />
        </button>
        <button aria-label="Delete item" className="warehouse__delete">
          <img
            src={editIcon}
            onClick={() => navigate(`/warehouses/edit/${warehouse.id}`)}
          />
        </button>
      </div>
    </div>
  );
}

export default WarehouseItem;
