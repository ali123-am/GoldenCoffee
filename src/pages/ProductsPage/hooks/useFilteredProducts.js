import { useContext, useMemo } from "react";
import { ProductsContext } from "../../../Context/ProductsContext";
import { useFilters } from "../context/FiltersContext";
import { useSearch } from "../context/SearchContext";
import { useSort } from "../context/SortContext";

export const useFilteredProducts = () => {
  const { products } = useContext(ProductsContext);
  const { productSearch } = useSearch();
  const { sort } = useSort();
  const {
    selectedCategories,
    selectedBrands,
    inStock,
    debouncedMinPrice,
    debouncedMaxPrice,
  } = useFilters(); // اینجا از debounced استفاده کن

  return useMemo(() => {
    return products
      .filter((p) =>
        selectedCategories.length
          ? selectedCategories.some((c) => c.en === p.category.en)
          : true
      )
      .filter((p) =>
        selectedBrands.length
          ? selectedBrands.some((b) => b.en === p.brand.en)
          : true
      )
      .filter((p) => (inStock ? p.count > 0 : true))
      .filter((p) =>
        p.productTitle.toLowerCase().includes(productSearch.toLowerCase())
      )
      // 🔥 حالا از debouncedMinPrice و debouncedMaxPrice استفاده می‌کنیم
      .filter((p) => p.price >= debouncedMinPrice && p.price <= debouncedMaxPrice)
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "rank") return b.rating - a.rating;
        if (sort === "newest") return b.id - a.id;
        return 0;
      });
  }, [
    products,
    selectedCategories,
    selectedBrands,
    inStock,
    productSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    sort,
  ]);
};
