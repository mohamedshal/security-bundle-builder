import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { productsData } from "../../../store/bundleStore.js";

const ProductGrid = ({ stepId }) => {
  const products = productsData.products.filter((p) => p.stepId === stepId);

  return (
    <div className="product-grid grid grid-cols-2 gap-4 w-full">
      {products.map((product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
    </div>
  );
};

export default ProductGrid;
