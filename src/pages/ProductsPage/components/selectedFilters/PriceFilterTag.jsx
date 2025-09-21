// components/Filters/PriceFilterTag.jsx
import { FilterTag } from "./FilterTag";

export const PriceFilterTag = ({ minPrice, maxPrice, defaultMinPrice, defaultMaxPrice, onReset }) => {
  const hasPriceFilter = minPrice !== defaultMinPrice || maxPrice !== defaultMaxPrice;
  if (!hasPriceFilter) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">بازه قیمت</span>
      <div className="flex flex-wrap gap-2">
        <FilterTag
          label={`از ${minPrice.toLocaleString("en-US")} تا ${maxPrice.toLocaleString("en-US")}`}
          onRemove={onReset}
          color="blue"
        />
      </div>
    </div>
  );
};
