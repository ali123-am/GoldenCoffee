import { useSort } from "../../context/SortContext";
import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { sortData } from "../SortData";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export function OptionSort({ setShowSort }) {
  const { sort, setSort } = useSort();
  const { updateParam } = useURLSearchParams();
  return (
    <div className="flex flex-col px-5 sm:px-10">
      {sortData.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            if (sort === option.value) return;
            setSort(option.value);
            updateParam("sort", option.value);
            setShowSort(false);
          }}
          className={`flex justify-between items-center px-4 py-7 text-right border-b
             border-gray-300 dark:border-gray-500 last:border-none cursor-pointer ${
            sort === option.value
              ? "text-emerald-600 dark:text-green-400 font-bold"
              : ""
          }`}
        >
          {option.label}
          {sort === option.value && <CheckCircleIcon className="w-8 h-8" />}
        </button>
      ))}
    </div>
  );
}
