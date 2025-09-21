import {
  AdjustmentsHorizontalIcon,
  BarsArrowDownIcon,
} from "@heroicons/react/24/outline";
import { sortData } from "./SortData";
import { useUI } from "../context/UIContext";
import { useSort } from "../context/SortContext";

export default function BtnMobileMonde() {
  const { setShowFilters,setShowSort } = useUI();
  const {sort}=useSort()
  return (
    <div className="col-span-12 flex gap-2 md:hidden">
      <button
        className="w-1/2 flex justify-center items-center gap-2 bg-white dark:bg-zinc-700
             p-2 rounded-lg"
        onClick={() => setShowFilters(true)}
      >
        <AdjustmentsHorizontalIcon className="w-5 h-5" />
        فیلترها
      </button>
      <button
        className="w-1/2 flex justify-center items-center bg-white dark:bg-zinc-700
             p-3.5 rounded-lg gap-2"
        onClick={() => setShowSort(true)}
      >
        <BarsArrowDownIcon className="w-6 h-6" />

        {sortData.find((o) => o.value === sort)?.label || "مرتب‌سازی"}
      </button>
    </div>
  );
}
