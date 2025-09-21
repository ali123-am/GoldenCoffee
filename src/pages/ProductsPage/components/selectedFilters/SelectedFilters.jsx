import { useContext } from "react";
import { FilterSection } from "./FilterSection";
import { PriceFilterTag } from "./PriceFilterTag";
import { useFilters } from "../../context/FiltersContext";
import { ProductsContext } from "../../../../Context/ProductsContext";
import DeleteAllFilterBtn from "../filterModal/DeleteAllFilterBtn";

export default function SelectedFilters() {
  const {
    selectedCategories,
    selectedBrands,
    removeFilter,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
  } = useFilters();
  const { defaultMinPrice, defaultMaxPrice } = useContext(ProductsContext);
  const handleResetPrice = () => {
    setMinPrice(defaultMinPrice);
    setMaxPrice(defaultMaxPrice);
  };
  if (
    selectedCategories.length === 0 &&
    selectedBrands.length === 0 &&
    minPrice === defaultMinPrice &&
    maxPrice === defaultMaxPrice
  )
    return null;

  return (
    <div
      className="flex flex-col gap-4 mb-4 md:mb-5 px-4 md:px-0 py-4 font-Dana
    md:border-y border-gray-300 dark:border-gray-400 pb-0 md:pb-4 "
    >
      <FilterSection
        title="برندها"
        items={selectedBrands}
        onRemove={removeFilter}
      />
      <FilterSection
        title="دسته‌بندی‌ها"
        items={selectedCategories}
        onRemove={removeFilter}
      />
      <PriceFilterTag
        minPrice={minPrice}
        maxPrice={maxPrice}
        defaultMinPrice={defaultMinPrice}
        defaultMaxPrice={defaultMaxPrice}
        onReset={handleResetPrice}
      />
      <div className="hidden md:inline">
        <DeleteAllFilterBtn />
      </div>
    </div>
  );
}
