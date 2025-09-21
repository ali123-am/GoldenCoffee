import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useFilters } from "../../context/FiltersContext";
import { useContext } from "react";
import { ProductsContext } from "../../../../Context/ProductsContext";

export default function DeleteAllFilterBtn() {
  const { getParamArray } = useURLSearchParams();
  const { clearAllFilters, minPrice, maxPrice, freeShipping, inStock } =
    useFilters();
  const { defaultMinPrice, defaultMaxPrice } = useContext(ProductsContext);

  const isDisabled =
    getParamArray("categories").length === 0 &&
    getParamArray("brands").length === 0 &&
    minPrice === defaultMinPrice &&
    maxPrice === defaultMaxPrice &&
    !inStock &&
    !freeShipping;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={(e) => {
        e.stopPropagation();
        clearAllFilters();
      }}
      className={`flex items-center justify-center rounded-lg border gap-1 w-1/2 md:w-full md:py-2
      border-b border-gray-300
    ${
      isDisabled
        ? "bg-gray-300 text-gray-400 cursor-not-allowed"
        : "bg-transparent cursor-pointer dark:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
    }`}
    >
      <TrashIcon className="w-5 h-5" /> حذف فیلترها
    </button>
  );
}
