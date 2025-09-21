import { useContextSelector } from "use-context-selector";
import {
  BasketContext,
  DecreaseProductContext,
  IncreaseProductContext,
  RemoveFromBasketContext,
} from "../Context/BasketContext";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import LoaderDotsBetter from "./LoaderDotsBetter";

const cls = (...xs) => xs.filter(Boolean).join(" ");

export default function CartQuantityControl({ product, isCart = false }) {
  const basketIds = useContextSelector(BasketContext, (c) => c.basketID);

  const { mutate: increase, loadingProducts: increaseLoadingProducts } =
    useContextSelector(IncreaseProductContext, (ctx) => ctx);
  const { mutate: decrease, loadingProducts: decreaseLoadingProducts } =
    useContextSelector(DecreaseProductContext, (ctx) => ctx);
  const { mutate: remove, loadingProducts: removeLoadingProducts } =
    useContextSelector(RemoveFromBasketContext, (ctx) => ctx);

  const isLoadingThisProduct =
    increaseLoadingProducts[product.id] ||
    decreaseLoadingProducts[product.id] ||
    removeLoadingProducts[product.id];

  const productData = basketIds.find((item) => item?.id == product?.id);
  const quantity = productData?.count || 0;

  const location = useLocation();
  const url = location.pathname;

  return (
    <div
      className={cls(
        !isCart
          ? url !== "/Cart"
            ? "w-40 rounded-xl h-13.5"
            : "w-35 md:w-28 lg:w-35 xl:w-38 h-18 md:h-12 lg:h-15 rounded-full"
          : "w-25 h-12 rounded-full",
        "flex px-1 justify-evenly font-Dana items-center shadow-normal text-orange-300 border-2 border-orange-300/50 dark:text-brown-300/90 dark:border-brown-300/70"
      )}
    >
      <PlusIcon
        onClick={() => increase(product?.id)}
        className={cls(
          !isCart
            ? url !== "/Cart"
              ? "w-6 h-6"
              : "w-6 md:w-5 lg:w-6 h-6 md:h-5 lg:h-6 "
            : "h-5 w-5",
          isLoadingThisProduct && "pointer-events-none",
          "cursor-pointer",
          quantity === product?.count && "pointer-events-none text-orange-300/50 dark:text-brown-300/20"
        )}
      />

      <span
        className={cls(
            !isCart?"text-xl":"text-md",
          "font-Dana font-medium select-none w-8"
        )}
      >
        {isLoadingThisProduct ? (
          <LoaderDotsBetter size={6} color="orange" />
        ) : (
          <div className="flex flex-col justify-center items-center">
            {quantity}
            <span className="text-xs text-gray-400 dark:text-gray-300">
              {quantity === product?.count ? "حداکثر" : ""}
            </span>
          </div>
        )}
      </span>

      {quantity === 1 ? (
        <TrashIcon
          onClick={() => remove(product?.id)}
          className={cls(
            !isCart
              ? url !== "/Cart"
                ? "w-6 h-6"
                : "w-6 md:w-5 lg:w-6 h-6 md:h-5"
              : "h-5 w-5",

            "cursor-pointer"
          )}
        />
      ) : (
        <MinusIcon
          onClick={() => decrease(product?.id)}
          className={cls(
            !isCart
              ? url !== "/Cart"
                ? "w-6 h-6"
                : "w-6 md:w-5 lg:w-6 h-6 md:h-5 lg:h-6 "
              : "h-5 w-5",
            isLoadingThisProduct && "pointer-events-none",
            "cursor-pointer"
          )}
        />
      )}
    </div>
  );
}
