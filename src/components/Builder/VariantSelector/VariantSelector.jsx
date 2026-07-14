import "./VariantSelector.css";

const VariantSelector = ({ variants, selectedVariantId, onSelectVariant }) => {
  return (
    <div className="variant-selector">
      <p className="variant-label">Color:</p>
      <div className="variants">
        {variants.map((variant) => {
          const isActive = selectedVariantId === variant.id;
         
          return (
            <button
              key={variant.id}
              className={`variant ${isActive ? "active" : ""}`}
              onClick={() => onSelectVariant(variant)}
              type="button"
            >
              <span className="swatch" style={{ backgroundColor: variant.color }}>
                {variant.image && (
                  <img src={variant.image} alt={variant.name} className="swatch-image" />
                )}
              </span>
              <span className="variant-name">{variant.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantSelector;
