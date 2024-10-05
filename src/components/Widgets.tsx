import { useProductStore } from "@/store/useProductStore";

export const Widgets: React.FC = () => {
  const { products } = useProductStore();

  const totalProducts = products.length;

  const totalStoreValue = products.reduce((acc, product) => {
    // Ensure product.price is a string before attempting to replace
    const priceAsString =
      typeof product.price === "string" ? product.price : `${product.price}`;
    const parsedPrice = parseFloat(priceAsString.replace("$", "")) || 0;
    return acc + parsedPrice * product.quantity;
  }, 0);

  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  ).length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      <div className="bg-green-800 p-4 rounded-md shadow">
        <p>Total Products</p>
        <h2>{totalProducts}</h2>
      </div>
      <div className="bg-blue-800 p-4 rounded-md shadow">
        <p>Total Store Value</p>
        <h2>${totalStoreValue.toFixed(2)}</h2>
      </div>
      <div className="bg-red-800 p-4 rounded-md shadow">
        <p>Out of Stock</p>
        <h2>{outOfStock}</h2>
      </div>
      <div className="bg-yellow-800 p-4 rounded-md shadow">
        <p>Categories</p>
        <h2>{categories}</h2>
      </div>
    </div>
  );
};
