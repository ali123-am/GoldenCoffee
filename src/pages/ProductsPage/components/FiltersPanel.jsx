import ToggleSwitches from "./filterModal/ToggleSwitches";
import SelectedFilters from "./selectedFilters/SelectedFilters";
import CollapsibleSections from "./filterModal/CollapsibleSections/CollapsibleSections";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import PriceRangeAccordion from "./PriceRangeAccordion/PriceRangeAccordion";
const FiltersPanel = () => {
  return (
    <aside
      className="hidden md:inline col-span-12 ls:col-span-3 bg-white dark:bg-zinc-700 
      rounded-2xl px-5 pt-5 pb-1 shadow space-y-6 order-2 ls:order-3 h-min"
    >
      <h2
        className="font-bold text-lg flex items-center gap-2 border-b border-gray-300
       dark:border-gray-400 pb-2"
      >
        <AdjustmentsHorizontalIcon className="w-5 h-5" />
        فیلترها
      </h2>
      <ToggleSwitches />
      <SelectedFilters />
      <PriceRangeAccordion />
      <CollapsibleSections />
    </aside>
  );
};

export default FiltersPanel;
