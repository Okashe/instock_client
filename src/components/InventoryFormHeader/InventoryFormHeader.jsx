import "./InventoryFormHeader.scss";
import { useNavigate } from "react-router-dom";
import back from "../../assets/Icons/arrow_back-24px.svg";

export default function InventoryFormHeader({ children }) {
  const navigate = useNavigate();

  return (
    <div className="inventory-form__header">
      <img
        src={back}
        className="inventory-form__back-icon"
        alt="Go back"
        onClick={() => navigate(-1)}
      />
      <h1 className="inventory-form__title">{children}</h1>
    </div>
  );
}
