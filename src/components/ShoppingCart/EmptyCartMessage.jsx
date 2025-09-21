import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function EmptyCartMessage() {
  return (
    <div className="flex justify-center items-center flex-col p-10">
      <div className="w-14 h-13.5 text-zinc-400 dark:text-white select-none">
        <ShoppingCartIcon></ShoppingCartIcon>
      </div>
      <span className="font-Dana text-base w-56 md:w-auto text-center text-zinc-900 dark:text-white mt-3 select-none cursor-auto ">
        هنوز محصولی به سبد خرید اضافه نشده
      </span>
      <Link
        to="/Store"
        className="bg-teal-600 hover:bg-teal-700 dark:bg-emerald-500
             dark:hover:bg-emerald-600 text-white w-56 md:w-64 rounded-xl h-14 
             flex justify-center items-center font-Dana text-base md:text-xl mt-11"
      >
        مشاهده محصولات فروشگاه
      </Link>
    </div>
  );
}