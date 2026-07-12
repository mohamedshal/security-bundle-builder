import { useMemo } from "react";
import "./ReviewPanel.css";
import { useBundleStore, calcSelectedItems, calcTotal, calcTotalCompare, calcSavings } from "../../store/bundleStore.js";
import QuantityStepper from "../Builder/QuantityStepper/QuantityStepper.jsx";

const ReviewPanel = () => {
  const quantities = useBundleStore((s) => s.quantities);
  const increaseQuantity = useBundleStore((s) => s.increaseQuantity);
  const decreaseQuantity = useBundleStore((s) => s.decreaseQuantity);
  const saveSystem = useBundleStore((s) => s.saveSystem);

  const selectedItems = useMemo(() => calcSelectedItems(quantities), [quantities]);
  const total = useMemo(() => calcTotal(quantities), [quantities]);
  const totalCompare = useMemo(() => calcTotalCompare(quantities), [quantities]);
  const savings = useMemo(() => calcSavings(quantities), [quantities]);

  const groupedItems = useMemo(() => {
    const groups = {};
    selectedItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [selectedItems]);

  const handleSave = (e) => {
    e.preventDefault();
    saveSystem();
    alert("Your system has been saved! You can return anytime and it will be restored.");
  };

  const handleCheckout = () => {
    alert("Checkout coming soon! Your system total is $" + total.toFixed(2));
  };

  const hasItems = selectedItems.length > 0;

  return (
    <aside className="review-panel">
      <div className="review-header">
        <h2>Your security system</h2>
      </div>

      <div className="review-body">
        {!hasItems && (
          <p className="review-empty">Add items from the builder to see your system summary.</p>
        )}

        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="review-group">
            <h4 className="review-group-title">{category}</h4>
            {items.map((item) => (
              <div key={item.variantId} className="review-item">
                <img src={item.image} alt={item.name} className="review-item-image" />
                <div className="review-item-info">
                  <span className="review-item-name">
                    {item.name}
                    {item.variantName && <span className="review-item-variant"> ({item.variantName})</span>}
                  </span>
                  <div className="review-item-price-row">
                    <QuantityStepper
                      quantity={item.quantity}
                      onIncrease={() => increaseQuantity(item.variantId)}
                      onDecrease={() => decreaseQuantity(item.variantId)}
                    />
                    <span className="review-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {hasItems && (
          <>
            <div className="review-divider" />

            <div className="review-row shipping-row">
              <span className="review-row-label">Shipping</span>
              <span className="review-row-value free">FREE</span>
            </div>

            <div className="review-guarantee">
              <span className="guarantee-icon">&#10003;</span>
              <span className="guarantee-text">30-Day Money-Back Guarantee</span>
            </div>

            <div className="review-row financing-row">
              <span className="review-row-label">Or 4 interest-free payments</span>
              <span className="review-row-value">${(total / 4).toFixed(2)}/mo</span>
            </div>

            <div className="review-divider" />

            <div className="review-total">
              <span className="total-label">Total</span>
              <div className="total-prices">
                {totalCompare > total && (
                  <span className="total-compare">${totalCompare.toFixed(2)}</span>
                )}
                <span className="total-amount">${total.toFixed(2)}</span>
              </div>
            </div>

            {savings > 0 && (
              <div className="review-savings">
                You&apos;re saving ${savings.toFixed(2)}!
              </div>
            )}

            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>

            <button className="save-btn" onClick={handleSave}>
              Save my system for later
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default ReviewPanel;
