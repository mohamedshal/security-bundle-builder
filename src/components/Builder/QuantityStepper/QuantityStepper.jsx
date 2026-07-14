import "./QuantityStepper.css";
import { useBundleStore } from "../../../store/bundleStore.js";

const QuantityStepper = ({ variantId, disabled = false }) => {
  const quantity = useBundleStore((s) => s.quantities[variantId] || 0);
  const increaseQuantity = useBundleStore((s) => s.increaseQuantity);
  const decreaseQuantity = useBundleStore((s) => s.decreaseQuantity);

  return (
    <div className="quantity-stepper flex items-center gap-2">
      <button onClick={() => decreaseQuantity(variantId)} disabled={disabled || quantity === 0} className="w-[30px] h-[30px] flex items-center justify-center" type="button">
        −
      </button>
      <span className="qty-value min-w-6 text-center font-semibold text-sm text-gray-900">{quantity}</span>
      <button onClick={() => increaseQuantity(variantId)} disabled={disabled} className="w-[30px] h-[30px] flex items-center justify-center" type="button">
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
