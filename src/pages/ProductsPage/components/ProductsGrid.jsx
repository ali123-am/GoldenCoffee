import Product from "../../../components/Product";
import { useFilteredProducts } from "./../hooks/useFilteredProducts";
import LoaderDotsBetter from "../../../components/LoaderDotsBetter";
import NoProductsFound from "./NoProductsFound";
import { useState } from "react";
const ProductsGrid = ({ loading }) => {
  const filteredProducts = useFilteredProducts();
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const allLoaded = visibleCount >= filteredProducts.length;
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, filteredProducts.length));
  };
  return (
    <main className="col-span-12 ls:col-span-9 order-4">
      {loading ? (
        <div className="w-full flex justify-center items-center h-full my-10 md:my-0">
          <LoaderDotsBetter />
        </div>
      ) : filteredProducts.length === 0 ? (
        <NoProductsFound />
      ) : (
        <div>
          <div
            className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5
            *:justify-self-center"
          >
            {visibleProducts.map((product) => (
              <Product
                key={product?.id}
                product={product}
                isResponsive={true}
              />
            ))}
          </div>
          {!allLoaded && (
            <div className="col-span-12 flex justify-center mt-8">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 
                transition-colors"
                onClick={handleLoadMore}
              >
                نمایش محصولات بیشتر
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
};
export default ProductsGrid;
