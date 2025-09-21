import { useContext } from "react";
import { useContextSelector } from "use-context-selector";
import { BasketContext } from "../../../Context/BasketContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { SidebarContext } from "../../../Context/SidebarContext";

export default function OpenBasketButton() {
  const { dispatch } = useContext(SidebarContext);
  const countProduct = useContextSelector(BasketContext, (s) => s.countProduct);
  return (
    <div
      onClick={() => dispatch({ type: "openBasketSidebar" })}
      className="rounded-full p-2 relative hover:bg-gray-200 dark:hover:bg-gray-600
      transition-colors duration-150 delay-150"
    >
      <ShoppingCartIcon
        className="text-zinc-900 dark:text-white h-6 w-6 cursor-pointer"
        title="Shopping Box"
      />
      {countProduct !== 0 ? (
        <span
          className="w-5 h-5 inline-block text-center absolute border-2 border-orange-300
          dark:border-white -top-0 -right-1 bg-brown-300  text-white  font-Dana
          text-sm rounded-full"
        >
          {countProduct}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
