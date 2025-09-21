import { ChevronUpIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function PriceRangeHeader({ isOpen, toggle }) {
  return (
    <button
      className="w-full flex justify-between items-center mb-5 rounded-lg font-DanaDemiBold"
      onClick={toggle}
    >
      <div className="flex items-center gap-1">
        <CurrencyDollarIcon className="w-8 h-8 hidden md:inline" />
        <span>محدوده قیمت</span>
      </div>
      <ChevronUpIcon
        className={`transition-transform w-7 h-7 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
}
