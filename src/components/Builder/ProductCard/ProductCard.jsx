/* eslint-disable no-useless-assignment */
import "./ProductCard.css";
import Badge from "../../UI/Badge.jsx";
import VariantSelector from "../VariantSelector/VariantSelector.jsx";
import QuantityStepper from "../QuantityStepper/QuantityStepper.jsx";
import { useBundleStore, productsData } from "../../../store/bundleStore.js";

const ProductCard = ({ productId }) => {
  const product = productsData.products.find((p) => p.id === productId);
  let proCam = false;
  if(product.id == "cam-pro"){
    proCam = true;
  }else{
    proCam = false;
  }

  const quantities = useBundleStore((s) => s.quantities);
  const activeVariants = useBundleStore((s) => s.activeVariants);
  const getActiveVariantId = useBundleStore((s) => s.getActiveVariantId);

  const activeVariantId = product.hasVariants
    ? activeVariants[product.id] || getActiveVariantId(product.id)
    : null;
  const activeVariant = product.hasVariants
    ? product.variants.find((v) => v.id === activeVariantId) || product.variants[0]
    : null;

  const totalQty = product.hasVariants && product.variants.length > 0
    ? product.variants.reduce((sum, v) => sum + (quantities[v.id] || 0), 0)
    : quantities[product.id] || 0;

  const isSelected = totalQty > 0;
  const stepperVariantId = product.hasVariants && activeVariant
    ? activeVariant.id
    : product.id;

  return (
    <article className={proCam? `procam product-card group ${isSelected ? "selected" : ""}`:`product-card group ${isSelected ? "selected" : ""}`}>
      <div className="product-image-wrapper">
        {product.badge && (
          <Badge variant={product.badge === "Most Popular" ? "popular" : "discount"}>
            {product.badge}
          </Badge>
        )}
        <img src={product.image} alt={product.name} className="product-image group-hover:scale-105" />
      </div>

      <div className="product-card-body">
        <div className="product-card-top">
          <div className="product-card-head">
            <h3 className="product-name text-[16px] font-semibold text-[#1F1F1F]">{product.name}</h3>
          </div>
          <p className="product-description text-gray-500 text-xs font-medium leading-[1.4]">{product.description}</p>
        </div>

        {product.hasVariants && product.variants.length > 0 && (
          <VariantSelector productId={product.id} />
        )}

        <div className="product-card-bottom">
          <QuantityStepper variantId={stepperVariantId} />

          <div className="price">
            {product.comparePrice && (
              <span className="old-price">${product.comparePrice.toFixed(2)}</span>
            )}
            <span className="current-price">
              {product.price === 0 ? "FREE" : `$${product.price.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
