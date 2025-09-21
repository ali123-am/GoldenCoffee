import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import BtnMobileModal from "./components/BtnMobileModal";
import SortBar from "./components/SortBar";
import FiltersPanel from "./components/FiltersPanel";
import ProductsGrid from "./components/ProductsGrid";
import MobileFilterModal from "./components/filterModal/MobileFilterModal";
import MobileSortModal from "./components/sortModal/MobileSortModal";
import { useUI } from "./context/UIContext";
import { useFilteredProducts } from "./hooks/useFilteredProducts";

const ProductsPage = () => {
  const { showFilters = false, showSort } = useUI();
  const filteredProducts = useFilteredProducts();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (filteredProducts.length !== 0) setLoading(false);
  }, [filteredProducts]);
  return (
    <div
      className="max-w-[1300px] mx-auto p-4 md:p-6 mt-18 md:mt-25 text-zinc-800 
    dark:text-white font-Dana grid gap-6"
    >
      <Header />
      <div className="grid grid-cols-12 gap-6">
        <SearchBar />
        <BtnMobileModal />
        <SortBar />
        <FiltersPanel />
        <ProductsGrid filteredProducts={filteredProducts} loading={loading} />
        {showFilters && <MobileFilterModal />}
        {showSort && <MobileSortModal />}
      </div>
    </div>
  );
};

export default ProductsPage;
