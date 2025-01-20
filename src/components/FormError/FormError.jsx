import "./FormError.scss";
import ErrorIcon from "../../assets/Icons/error-24px.svg";

function FormError({ errorState, field, children }) {
  return (
    <>
      {errorState && !field && (
        <span className="input-error">
          <img
            className="input-error__icon"
            src={ErrorIcon}
            alt="ErrorIcon"
          ></img>
          <p className="input-error__message">{children}</p>
        </span>
      )}
    </>
  );
}

export default FormError;
