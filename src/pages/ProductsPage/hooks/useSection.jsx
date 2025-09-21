import { useContext } from "react";
import { useFilters } from "../context/FiltersContext";
import { ProductsContext } from "../../../Context/ProductsContext";
import { CubeTransparentIcon, FolderIcon } from "@heroicons/react/24/outline";

export function useSection() {
  const { categories, brands } = useContext(ProductsContext);
  const {
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
  } = useFilters();

  return [
    {
      type: "دسته‌بندی",
      data: categories,
      state: selectedCategories,
      setState: setSelectedCategories,
      paramKey: "categories",
      icon: <FolderIcon className="w-7 h-7 hidden md:inline" />,
    },
    {
      type: "برند",
      data: brands || [],
      state: selectedBrands,
      setState: setSelectedBrands,
      paramKey: "brands",
      icon: <CubeTransparentIcon className="w-7 h-7 hidden md:inline" />,
    },
  ];
}
