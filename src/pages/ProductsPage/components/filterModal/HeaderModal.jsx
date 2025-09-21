import { XCircleIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
export default memo(function HeaderModal({ setShowFilters }) {
  return (
    <div
      className="flex items-center justify-between mb-4 px-4 sm:px-8 py-5 border-b
               border-gray-200 dark:border-zinc-700 bg-gray-200/70 dark:bg-gray-600/90 "
    >
      {" "}
      <div className="flex items-center gap-1 ">
        {" "}
        <h2 className="font-DanaDemiBold text-2xl"> فیلترها</h2>{" "}
      </div>{" "}
      <XCircleIcon
        onClick={() => setShowFilters(false)}
        className="w-8 h-8 cursor-pointer"
      />{" "}
    </div>
  );
});
