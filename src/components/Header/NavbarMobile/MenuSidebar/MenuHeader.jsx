import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SidebarContext } from "../../../../Context/SidebarContext";
export default function MenuHeader() {
  const{dispatch }= useContext(SidebarContext);
  return (
    <div
      className="flex justify-between items-center w-58 border-b pb-5 border-gray-300
       dark:border-gray-500"
    >
      <div className="flex gap-3.5 h-10 w-38.75">
        <img src="/images/headerImages/svgs/app-logo.svg" alt="Golden Coffee" />
        <img
          src="/images/headerImages/svgs/app-logo-type.svg"
          alt="Golden Coffee"
        />
      </div>
      <div
        onClick={() => dispatch({ type: "closeMenoSidebar" })}
        className="rounded-full p-1  dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer
        transition-colors duration-100 text-zinc-900 dark:text-white"
      >
        <XMarkIcon className="h-6 w-6" />
      </div>
    </div>
  );
}
