import { useContextSelector } from "use-context-selector";
import ShopingCart from "../../ShoppingCart/ShoppingCart.jsx";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { BasketContext } from "../../../Context/BasketContext.jsx";
import { Link, useLocation } from "react-router-dom";

export default function CartIconWithPopover() {
  const location = useLocation();
  const url = location.pathname;
  const hovered =
    location.pathname === "/Cart"
      ? "hidden"
      : "invisible opacity-0 group-hover:opacity-100 group-hover:visible";

  const countProduct = useContextSelector(BasketContext, (c) => c.countProduct);
  return (
    <div className="group relative">
      <Link to={"/Cart"}>
        <ShoppingCartIcon
          className={`w-12 h-12 p-2 relative rounded-full text-orange-300
       md:text-brown-300 
         ${
           url === "/Cart" || url.startsWith("/product/") || url==="/Store"
             ? `md:text-zinc-800 md:dark:text-brown-300 hover:bg-orange-100 
            dark:hover:bg-orange-200/10 md:hover:bg-stone-300 md:dark:hover:bg-stone-500`
             : `hover:bg-orange-100 dark:hover:bg-orange-200/10 md:dark:hover:bg-stone-700
          md:group-hover:bg-stone-700`
         }`}
        />
        {countProduct !== 0 ? (
          <span
            className="w-6 h-6 inline-block text-center absolute border-2 border-white
          -top-1 -right-1.5 bg-brown-300 text-white  font-Dana text-xl rounded-full"
          >
            {countProduct}
          </span>
        ) : null}
      </Link>
      <ShopingCart hovered={hovered} />
    </div>
  );
}
