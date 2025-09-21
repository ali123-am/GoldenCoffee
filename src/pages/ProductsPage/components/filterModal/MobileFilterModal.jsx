import { useUI } from "../../context/UIContext";
import SelectedFilters from "./../selectedFilters/SelectedFilters";
import ToggleSwitches from "./ToggleSwitches";
import CollapsibleSections from "./CollapsibleSections/CollapsibleSections";
import FooterModal from "./FooterModal";
import HeaderModal from "./HeaderModal";
import PriceRangeAccordion from "../PriceRangeAccordion/PriceRangeAccordion";
export default function MobileFilterModal() {
  const { setShowFilters } = useUI();
  return (
    <div
      onClick={() => setShowFilters(false)}
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end md:hidden pb-20 xs:pb-18"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-700 h-full w-full
      overflow-auto shadow-xl transition-all duration-300 ease-out transform translate-y-0 "
      >
        <HeaderModal setShowFilters={setShowFilters} />
        <SelectedFilters />
        <ToggleSwitches />
        <PriceRangeAccordion />
        <CollapsibleSections />
      </div>
      <FooterModal />
    </div>
  );
}
