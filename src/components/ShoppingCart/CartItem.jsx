import { memo } from "react";
import { Link } from "react-router-dom";

import CartQuantityControl from "../CartQuantityControl";

function CartItem({ product, basketItem }) {
  if (!product?.img) {
    throw new Error("error");
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="flex md:gap-2.5 py-5 md:py-0 md:mt-5 md:pb-7.5 border-b border-gray-300 dark:border-gray-300/30 "
    >
      <div className="w-22.5 h-22.5 md:w-30 md:h-30">
        <Link to={`/product/${product?.id}`}>
          <img
            className="w-full h-full"
            src={product?.img}
            alt="محصول"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="font-Dana space-y-2 md:space-y-6 ">
        <h2 className="text-sm md:text-base w-32.5 md:w-auto font-medium text-zinc-700 dark:text-white line-clamp-2">
          {product?.productTitle}
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-3 md:w-60 px-1">
          <div className="hidden md:flex">
            <CartQuantityControl product={product} isCart={true} />
          </div>
          <div className="flex items-start flex-col justify-center gap-1 md:gap-0">
            {product?.offer ? (
              <div className=" text-xs md:text-sm tracking-tightest text-teal-600 dark:text-emerald-500">
                <span>
                  {(product?.offer * basketItem?.count).toLocaleString("en-US")}
                </span>
                <span className="">تخفیف</span>
              </div>
            ) : null}
            <div className="text-base tracking-tighter md:text-xl space-x-1 text-zinc-900 dark:text-white">
              <span>
                {(product?.price * basketItem?.count).toLocaleString("en-US")}
              </span>
              <span className="tracking-tightest text-sm md:text-lg">
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);
