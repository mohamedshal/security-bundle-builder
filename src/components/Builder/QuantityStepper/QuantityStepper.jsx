import "./QuantityStepper.css";

const QuantityStepper = ({ quantity, onIncrease, onDecrease, disabled = false }) => {
  return (
    <div className="quantity-stepper">
      <button onClick={onDecrease} disabled={disabled || quantity === 0} type="button">
        −
      </button>
      <span className="qty-value">{quantity}</span>
      <button onClick={onIncrease} disabled={disabled} type="button">
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
