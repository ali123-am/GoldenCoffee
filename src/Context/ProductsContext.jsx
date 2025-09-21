import React, {
  createContext,
  useState,
  useEffect,
} from "react";
import { useFetchGet } from "../Hooks/useFetchGet";
import LoaderDotsBetter from "../components/LoaderDotsBetter";

export const ProductsContext = createContext();

function createSetFromArray(arr) {
  const set = new Set();
  arr.forEach((obj) => set.add(JSON.stringify(obj)));
  return Array.from(set).map((item) => JSON.parse(item));
}

export function ProductsProvider({ children }) {
  const { products, loading, error } = useFetchGet("Products");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [defaultMaxPrice, setDefaultMaxPrice] = useState(0);
  const [defaultMinPrice, setDefaultMinPrice] = useState(0);
  // وقتی products تغییر کرد، دسته بندی و برندها رو آماده کن
  useEffect(() => {
    if (products?.length > 0) {
      setCategories(createSetFromArray(products.map((p) => p.category)));
      setBrands(createSetFromArray(products.map((p) => p.brand)));
      const prices = products.map((p) => p.price || 0);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setDefaultMinPrice(min);
      setDefaultMaxPrice(max);
    }
  }, [products]);

  // اگر هنوز لودینگ یا خطا داریم، فقط Loader نشون بده
  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoaderDotsBetter size={10} />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-400">
        <p>{error}</p>
      </div>
    );

  return (
    <ProductsContext.Provider
      value={{ products, categories, brands, defaultMinPrice, defaultMaxPrice }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

// export const useProducts = () => useContext(ProductsContext);
