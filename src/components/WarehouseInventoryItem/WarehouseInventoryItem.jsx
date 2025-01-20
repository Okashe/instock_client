import { Link, useNavigate } from "react-router-dom";
import editIcon from "../../assets/Icons/edit-24px.svg";
import deleteicon from "../../assets/Icons/delete_outline-24px.svg";
import ChevronRightIcon from "../../assets/Icons/chevron_right-24px.svg";
import "./WarehouseInventoryItem.scss";

function WarehouseInventoryItem({ item, handleOpenInventoryModal }) {
  const statusClass =
    item.status.toLowerCase() === "in stock" ? "in-stock" : "out-of-stock";
  const navigate = useNavigate();

  return (
    <div className="warehouse-item">
      <div className="warehouse-item__main-container">
        <div className="warehouse-item__details-container">
          <div className="warehouse-item__name-container">
            <p className="warehouse-item__label-mobile">Inventory Item</p>
            <Link
              to={`/inventories/${item.id}`}
              className="warehouse-item__name-sub-container"
            >
              <p className="warehouse-item__name">{item.item_name}</p>
              <img
                src={ChevronRightIcon}
                alt="More details"
                className="warehouse-item__chevron"
              />
            </Link>
          </div>
          <div className="warehouse-item__category-container warehouse-item__category-container">
            <p className="warehouse-item__label-mobile">Category</p>
            <p className="warehouse-item__category">{item.category}</p>
          </div>
        </div>
        <div className="warehouse-item__info-container">
          <div className="warehouse-item__status-container">
            <p className="warehouse-item__label-mobile">Status</p>
            <p className={`warehouse-item__status ${statusClass}`}>
              {item.status}
            </p>
          </div>
          <div className="warehouse-item__quantity-container">
            <p className="warehouse-item__label-mobile">Qty</p>
            <p className="warehouse-item__quantity">{item.quantity}</p>
          </div>
        </div>
      </div>
      <div className="warehouse-item__actions">
        <button aria-label="Delete item" className="warehouse-item__delete">
          <img
            src={deleteicon}
            id={item.id}
            onClick={handleOpenInventoryModal}
          />
        </button>
        <button aria-label="edit item" className="warehouse-item__edit">
          <img
            src={editIcon}
            onClick={() => navigate(`/inventories/edit/${item.id}`)}
          />
        </button>
      </div>
    </div>
  );
}

export default WarehouseInventoryItem;
