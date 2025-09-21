import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { SidebarContext } from "../../../Context/SidebarContext";
export default function BasketSidebar() {
  const { activeSidebar, dispatch } = useContext(SidebarContext);
  return (
    <div
      className={`bg-white dark:bg-zinc-700 h-screen w-64 px-4 pt-5 pb-8
      ${activeSidebar.basketSidebar ? "translate-x-0" : "-translate-x-full"}
      fixed top-0 left-0 transition-transform duration-200 z-30`}
    >
      <div
        className="flex items-center justify-between pb-5 border-b border-gray-300
       dark:border-gray-500/90"
      >
        <div
          onClick={() => dispatch({ type: "closeBasketSidebar" })}
          className="rounded-full p-1  dark:hover:bg-gray-600 hover:bg-gray-200 
          transition-colors duration-150 delay-150"
        >
         <XMarkIcon className="text-zinc-900 dark:text-white h-5 w-5 cursor-pointer" />
        </div>
        <span className="text-zinc-900 dark:text-white font-Dana">
          سبد خرید
        </span>
      </div>
      <ShoppingCart />
    </div>
  );
}
