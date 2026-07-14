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
                <div className="review-item-image-wrap">
                  <img src={item.image} alt={item.name} className="review-item-image" />
                  {item.variantColor && (
                    <span className="review-item-color" style={{ backgroundColor: item.variantColor }} />
                  )}
                </div>
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
                    <div className="prices">
                      {item.comparePrice && (
                      <span className="review-item-compare-price old-price shipp">
                        ${(item.comparePrice * item.quantity).toFixed(2)}
                      </span>
                    )}
                    <span className="review-item-price">
                      {item.price === 0 ? "FREE" : `$${(item.price * item.quantity).toFixed(2)}`}
                    </span>
                    </div>
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
              <span className="review-row-value free">
                <img src="/images/shipping.png" alt="Shipping" className="review-row-icon" />
                Fast Shipping
              </span>
              <span className="review-row-label">
                <div className="old-price shipp">$5.99</div>
                <div className="price">FREE</div>
              </span>
            </div>

            <div className="review-row review-satis-row">
              <div className="review-satis-content">
                <img src="/images/wyze-satis.png" alt="Wyze satisfaction" className="review-satis-icon" />
                <div className="review-satis-text">
                  <div className="badge">as low as ${(total / 4).toFixed(2)}/mo</div>
                  <div className="review-satis-label">
                    <div className="old-price shipp">${totalCompare.toFixed(2)}</div>
                    <div className="price">${total.toFixed(2)}</div>
                  </div>
                </div>
              </div>
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
