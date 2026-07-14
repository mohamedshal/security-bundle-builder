import { useMemo } from "react";
import "./ReviewPanel.css";
import { useBundleStore, calcSelectedItems, calcTotal, calcTotalCompare, calcSavings } from "../../store/bundleStore.js";
import QuantityStepper from "../Builder/QuantityStepper/QuantityStepper.jsx";

const ReviewPanel = () => {
  const quantities = useBundleStore((s) => s.quantities);
  const saveSystem = useBundleStore((s) => s.saveSystem);
  const clearAll = useBundleStore((s) => s.clearAll);

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
    clearAll();
  };

  const hasItems = selectedItems.length > 0;

  return (
    <aside className="review-panel sticky top-5">
      <div className="review-header border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Your security system</h2>
      </div>

      <div className="review-body flex flex-col gap-1">
        {!hasItems && (
          <p className="review-empty text-gray-400 text-sm text-center py-6">Add items from the builder to see your system summary.</p>
        )}

        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="review-group mb-3">
            <h4 className="review-group-title text-[11px] font-semibold text-gray-400 uppercase tracking-[0.5px] m-0 mb-2 pb-1 border-b border-gray-100">{category}</h4>
            {items.map((item) => (
              <div key={item.variantId} className="review-item flex items-center gap-[10px] py-2">
                <div className="review-item-image-wrap relative w-11 h-11 shrink-0">
                  <img src={item.image} alt={item.name} className="review-item-image w-11 h-11 object-contain rounded-lg bg-gray-50 border border-gray-100" />
                  {item.variantColor && (
                    <span className="review-item-color absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: item.variantColor }} />
                  )}
                </div>
                <div className="review-item-info flex-1 min-w-0">
                  <span className="review-item-name text-[13px] font-medium text-gray-900 block">
                    {item.name}
                    {item.variantName && <span className="review-item-variant text-gray-500 font-normal"> ({item.variantName})</span>}
                  </span>
                  <div className="review-item-price-row flex items-center justify-between gap-2 mt-1">
                    <QuantityStepper variantId={item.variantId} />
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
            <div className="review-divider h-px bg-gray-200 my-3" />

            <div className="review-row shipping-row flex justify-between items-center py-1">
              <span className="review-row-value free text-emerald-600 inline-flex items-center gap-1.5">
                <img src="/images/shipping.png" alt="Shipping" className="review-row-icon w-[41px] h-[41px] object-contain" />
                Fast Shipping
              </span>
              <span className="review-row-label text-[13px] text-gray-500">
                <div className="old-price shipp text-gray-400 line-through">$5.99</div>
                <div className="price text-[#4E2FD2]">FREE</div>
              </span>
            </div>

            <div className="review-row review-satis-row py-2">
              <div className="review-satis-content w-full flex items-center justify-between gap-2">
                <img src="/images/wyze-satis.png" alt="Wyze satisfaction" className="review-satis-icon w-[78px] h-[78px] object-contain" />
                <div className="review-satis-text flex flex-col items-end gap-1">
                  <div className="badge bg-violet-700 text-white rounded-[10px] px-[10px] py-1 text-xs font-semibold">as low as ${(total / 4).toFixed(2)}/mo</div>
                  <div className="review-satis-label flex items-center gap-[5px] font-bold">
                    <div className="old-price shipp text-lg text-gray-400 line-through">${totalCompare.toFixed(2)}</div>
                    <div className="price text-2xl text-violet-700">${total.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="review-guarantee flex items-center gap-2 px-3 py-[10px] bg-emerald-50 rounded-lg my-2">
              <span className="guarantee-icon text-emerald-600 font-bold text-sm">&#10003;</span>
              <span className="guarantee-text text-xs font-medium text-emerald-800">30-Day Money-Back Guarantee</span>
            </div>

            <div className="review-row financing-row flex justify-between items-center py-1">
              <span className="review-row-label text-[13px] text-gray-500">Or 4 interest-free payments</span>
              <span className="review-row-value text-[13px] font-semibold text-gray-900">${(total / 4).toFixed(2)}/mo</span>
            </div>

            <div className="review-divider h-px bg-gray-200 my-3" />

            {savings > 0 && (
              <div className="review-savings bg-amber-100 text-amber-800 text-xs font-semibold text-center py-1.5 px-3 rounded-md my-2">
                You&apos;re saving ${savings.toFixed(2)}!
              </div>
            )}

            <button className="checkout-btn w-full py-[14px] bg-violet-600 text-white rounded-[10px] text-base font-bold mt-2 transition-colors hover:bg-violet-700" onClick={handleCheckout}>
              Checkout
            </button>
          </>
        )}
        <button className="save-btn w-full py-[10px] text-violet-600 text-[13px] font-medium underline underline-offset-2 mt-1 hover:text-violet-700" onClick={handleSave}>
          Save my system for later
        </button>
      </div>
    </aside>
  );
};

export default ReviewPanel;
