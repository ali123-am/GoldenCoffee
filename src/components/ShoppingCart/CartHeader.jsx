import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
export default memo(function CartHeader({ countProduct }) {
 
  return (
    <div className="hidden md:flex justify-between tracking-tightest">
      <div className="font-Dana flex gap-1 text-gray-300 dark:text-white select-none">
        {countProduct}
        <span>محصول</span>
      </div>
      <div>
        <Link to={"/Cart"} 
        className="flex items-center font-Dana text-orange-300">
          <span>مشاهده سبد خرید</span>
          <ChevronLeftIcon className="w-5 h-5"></ChevronLeftIcon>
        </Link>
      </div>
    </div>
  );
});
