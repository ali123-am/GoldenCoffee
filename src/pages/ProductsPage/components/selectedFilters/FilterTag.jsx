
import { XCircleIcon } from "@heroicons/react/24/outline";

export const FilterTag = ({ label, onRemove, color = "blue" }) => {
  const bgColor = color === "green" ? "bg-green-100 dark:bg-blue-900" : "bg-blue-100 dark:bg-blue-900";
  const textColor = color === "green" ? "text-blue-700 dark:text-blue-100" : "text-blue-700 dark:text-blue-100";

  return (
    <span className={`flex items-center gap-1 ${bgColor} ${textColor} px-3 py-1 rounded-full 
    text-sm shadow-sm transition-all duration-200`}>
      {label}
      <button onClick={onRemove}>
        <XCircleIcon className="w-6 h-6 cursor-pointer" />
      </button>
    </span>
  );
};
