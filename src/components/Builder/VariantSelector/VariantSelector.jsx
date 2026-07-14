import "./VariantSelector.css";
import { useBundleStore, productsData } from "../../../store/bundleStore.js";

const VariantSelector = ({ productId }) => {
  const product = productsData.products.find((p) => p.id === productId);
  const activeVariants = useBundleStore((s) => s.activeVariants);
  const getActiveVariantId = useBundleStore((s) => s.getActiveVariantId);
  const setActiveVariant = useBundleStore((s) => s.setActiveVariant);

  const selectedVariantId = activeVariants[productId] || getActiveVariantId(productId);

  return (
    <div className="variant-selector flex flex-col gap-1.5">
      <p className="variant-label text-[13px] font-medium text-gray-700 m-0">Color:</p>
      <div className="variants flex gap-2 flex-wrap">
        {product.variants.map((variant) => (
          <button
            key={variant.id}
            className={`variant ${selectedVariantId === variant.id ? "active" : ""}`}
            onClick={() => {
              if (selectedVariantId !== variant.id) {
                setActiveVariant(productId, variant.id);
              }
            }}
            type="button"
          >
            <span className="swatch" style={{ backgroundColor: variant.color }}>
              {variant.image && (
                <img src={variant.image} alt={variant.name} className="swatch-image" />
              )}
            </span>
            <span className="variant-name">{variant.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;
