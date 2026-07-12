import "./ProductCard.css";
import Badge from "../../UI/Badge.jsx";
import VariantSelector from "../VariantSelector/VariantSelector.jsx";
import QuantityStepper from "../QuantityStepper/QuantityStepper.jsx";
import { useBundleStore } from "../../../store/bundleStore.js";

const ProductCard = ({ product }) => {
  const quantities = useBundleStore((s) => s.quantities);
  const getActiveVariantId = useBundleStore((s) => s.getActiveVariantId);
  const setActiveVariant = useBundleStore((s) => s.setActiveVariant);
  const increaseProductQuantity = useBundleStore((s) => s.increaseProductQuantity);
  const decreaseProductQuantity = useBundleStore((s) => s.decreaseProductQuantity);
  const increaseQuantity = useBundleStore((s) => s.increaseQuantity);
  const decreaseQuantity = useBundleStore((s) => s.decreaseQuantity);

  const activeVariantId = product.hasVariants ? getActiveVariantId(product.id) : null;
  const activeVariant = product.hasVariants
    ? product.variants.find((v) => v.id === activeVariantId) || product.variants[0]
    : null;

  const totalQty = product.hasVariants && product.variants.length > 0
    ? product.variants.reduce((sum, v) => sum + (quantities[v.id] || 0), 0)
    : quantities[product.id] || 0;

  const stepperQty = product.hasVariants && activeVariant
    ? quantities[activeVariant.id] || 0
    : quantities[product.id] || 0;

  const isSelected = totalQty > 0;

  const handleVariantSelect = (variant) => {
    setActiveVariant(product.id, variant.id);
  };

  const handleIncrease = () => {
    if (product.hasVariants && activeVariant) {
      increaseQuantity(activeVariant.id);
    } else {
      increaseProductQuantity(product.id);
    }
  };

  const handleDecrease = () => {
    if (product.hasVariants && activeVariant) {
      decreaseQuantity(activeVariant.id);
    } else {
      decreaseProductQuantity(product.id);
    }
  };

  return (
    <article className={`product-card ${isSelected ? "selected" : ""}`}>
      {product.badge && (
        <Badge variant={product.badge === "Most Popular" ? "popular" : "discount"}>
          {product.badge}
        </Badge>
      )}

      <img src={product.image} alt={product.name} className="product-image" />

      <h3 className="product-name">{product.name}</h3>

      <p className="product-description">{product.description}</p>

      <button className="learn-more">Learn More</button>

      {product.hasVariants && product.variants.length > 0 && (
        <VariantSelector
          variants={product.variants}
          selectedVariantId={activeVariantId}
          onSelectVariant={handleVariantSelect}
          quantities={quantities}
        />
      )}

      <div className="product-card-bottom">
        <QuantityStepper
          quantity={stepperQty}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

        <div className="price">
          {product.comparePrice && (
            <span className="old-price">${product.comparePrice.toFixed(2)}</span>
          )}
          <span className="current-price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
