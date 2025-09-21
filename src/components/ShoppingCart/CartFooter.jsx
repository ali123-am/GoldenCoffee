import { Link } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { BasketContext } from "../../Context/BasketContext";  
export default function CartFooter() {
  const totalPrice = useContextSelector(BasketContext, (ctx) => ctx.totalPrice);
  return (
    <div className="fixed left-3 bottom-8 md:static md:mt-5 flex gap-3 md:gap-0 justify-between items-center">
      <div className="flex flex-col font-Dana order-2 md:order-0">
        <span className="text-gray-300 text-xs md:text-sm tracking-tightest">
          مبلغ قابل پرداخت
        </span>
        <div className="space-x-1 text-base md:text-xl text-gray-900 dark:text-white">
          <span>{totalPrice.toLocaleString("en-US")}</span>
          <span className="tracking-tightest">تومان</span>
        </div>
      </div>
      <Link to={"/Cart"}
      className=" md:ml-0 font-Dana text-base md:text-xl w-28 h-11 md:w-36 md:h-14 flex 
      justify-center items-center bg-teal-600 hover:bg-teal-700 dark:bg-emerald-500
       dark:hover:bg-emerald-600 rounded-xl text-white">
        ثبت سفارش
      </Link>
    </div>
  );
}