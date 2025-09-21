import { useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SidebarContext } from "../../../Context/SidebarContext";

export default function OpenMenuSideBar() {
  const { dispatch } = useContext(SidebarContext);  
  return (
    <div
      onClick={() => {
        dispatch({ type: "openMenoSidebar" });
      }}
      className="rounded-full cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-200
        text-zinc-900 dark:text-white p-2 transition-colors duration-150"
    >
      <Bars3Icon className=" h-6 w-6" title="Meno" />
    </div>
  );
}
