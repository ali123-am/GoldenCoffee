import { useFilteredProducts } from "./../hooks/useFilteredProducts";

export default function Header() {
  const filteredProducts = useFilteredProducts();
  return (
    <div className="flex  items-center  justify-between">
      <h2 className="text-xl  font-MorabbaBold">همه کالاها</h2>
      <span className="text-gray-500 dark:text-gray-400">
        {filteredProducts.length} محصول{" "}
      </span>
    </div>
  );
}
