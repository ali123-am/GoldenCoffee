import { BarsArrowDownIcon } from "@heroicons/react/24/outline";
import { sortData } from "./SortData";
import { useSort } from "../context/SortContext";
import { useURLSearchParams } from "../hooks/useURLSearchParams";
const SortBar = () => {
  const { sort, setSort } = useSort();
  const { updateParam } = useURLSearchParams();
  return (
    <div className="hidden md:inline col-span-12 ls:col-span-9 order-3 ls:order-2">
      <div className="flex items-center gap-4 bg-white dark:bg-zinc-700 rounded-lg h-13 px-3">
        <div className="flex gap-1 items-center">
          <BarsArrowDownIcon className="w-5 h-5 text-gray-500 dark:text-white" />
          <h2>مرتب سازی براساس:</h2>
        </div>
        <div className="flex gap-2 h-full">
          {sortData.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                if (sort === option.value) return;
                updateParam("sort", option.value);
                setSort(option.value);
              }}
              className={`px-3 h-full transition-colors duration-200 cursor-pointer ${
                sort === option.value
                  ? "text-amber-600 dark:text-orange-300 border-b-2"
                  : "dark:text-white text-gray-700 hover:text-amber-600 dark:hover:text-orange-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SortBar;
