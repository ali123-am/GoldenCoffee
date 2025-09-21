import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import CartQuantityControl from "../../../components/CartQuantityControl";
export function CartItemProduct({ product, basketItem }) {
  return (
    <div
      className="w-full grid grid-cols-[30%_70%] items-center mb-5 sm:mb-10 border-b-1 sm:border-1
      min-h-70 px-0 2xl:px-0 border-gray-300 dark:border-zinc-900 rounded-lg sm:rounded-xl
       bg-white dark:bg-zinc-700"
    >
      <Link
        to={`/product/${product?.id}`}
        className="w-full h-[65%] xs:h-[80%]"
      >
        <img
          className="w-full h-full"
          src={product?.img}
          alt="محصول"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-col gap-3 xs:gap-7 sm:gap-9 pl-3 lg:pl-5">
        <Link
          to={`/product/${product?.id}`}
          className="text-lg md:text-base lg:text-xl font-Dana font-bold text-zinc-700
         dark:text-white line-clamp-2"
        >
          {product?.productTitle}
        </Link>
        <div className="space-y-3 text-xs sm:text-sm md:text-xs lg:text-sm font-Dana">
          <div className="flex items-center gap-1 dark:text-gray-300/90 text-gray-500">
            <ShieldCheckIcon className="w-6 md:w-5 lg:w-6 h-6 md:h-5" />
            <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
          </div>
          <div className="flex items-center gap-1 dark:text-gray-300/90 text-gray-500">
            <CarIcon />
            <span>ارسال از ۲ روز کاری دیگر</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-0 sm:justify-between h-28  xs:h-auto">
          <CartQuantityControl product={product} />
          <ProductInfo product={product} basketItem={basketItem} />
        </div>
      </div>
    </div>
  );
}

function CarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v2h3.5a1 1 0 0 1 .7.3l2.3 2.3a1 1 0 0 1 .3.7V17a2 2 0 0 1-2 2h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H5a2 2 0 0 1-2-2V7z" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
      <path d="M15 9v3h5" />
    </svg>
  );
}
function ProductInfo({ product, basketItem }) {
  return (
    <div
      className="text-xs xs:text-base md:text-xs lg:text-base flex items-end sm:items-center flex-col h-20 xs:h-auto  
          justify-center gap-1 font-Dana"
    >
      {product?.offer ? (
        <span
          className="font-semibold tracking-tight text-gray-500
             dark:text-gray-400 line-through mr-20"
        >
          {(product?.price * basketItem?.count).toLocaleString("en-US")}
          <span className=" ">تومان </span>
        </span>
      ) : null}
      <div
        className="flex items-center gap-2 text-lg md:text-base lg:text-xl xl:text-2xl font-bold space-x-1 text-zinc-800
             dark:text-white"
      >
        {product?.offer ? (
          <div className="text-sm md:text-xs lg:text-sm tracking-tightest text-teal-600 dark:text-emerald-500">
            <span>
              {(product?.offer * basketItem?.count).toLocaleString("en-US")}
            </span>
            <span>تومان </span>
            <span className="hidden xs:inline">تخفیف</span>
          </div>
        ) : null}
        <div>
          <span>
            {(
              product?.price * basketItem?.count -
              basketItem?.count * product.offer
            ).toLocaleString("en-US")}
          </span>
          <span className="tracking-tightest">تومان</span>
        </div>
      </div>
    </div>
  );
}
