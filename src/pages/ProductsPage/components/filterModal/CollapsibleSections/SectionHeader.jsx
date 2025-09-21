import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useUI } from "../../../context/UIContext";

export default function SectionHeader({ type, icon }) {
  const { openSection, setOpenSection } = useUI();
  return (
    <button
      onClick={() => setOpenSection((prev) => (prev === type ? null : type))}
      className={`w-full flex justify-between items-center font-DanaDemiBold text-lg py-2 ${
        openSection === type
          ? "border-b border-gray-300 dark:border-gray-400"
          : ""
      }`}
    >
      <div className="flex items-center gap-2">
        {icon} {type}
      </div>
      <ChevronUpIcon
        className={`transform transition-transform w-7 h-7 ${
          openSection === type ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}
