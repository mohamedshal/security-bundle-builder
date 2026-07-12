import "./VariantSelector.css";

const VariantSelector = ({ variants, selectedVariantId, onSelectVariant, quantities }) => {
  return (
    <div className="variant-selector">
      <p className="variant-label">Color:</p>
      <div className="variants">
        {variants.map((variant) => {
          const isActive = selectedVariantId === variant.id;
          const qty = quantities?.[variant.id] || 0;
          return (
            <button
              key={variant.id}
              className={`variant ${isActive ? "active" : ""}`}
              onClick={() => onSelectVariant(variant)}
              type="button"
            >
              <span
                className="swatch"
                style={{ backgroundColor: variant.color }}
              />
              <span className="variant-name">{variant.name}</span>
              {qty > 0 && <span className="variant-qty">{qty}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantSelector;
