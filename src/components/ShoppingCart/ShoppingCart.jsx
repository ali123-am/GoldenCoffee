import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartItemList from "./CartItemList";
import EmptyCartMessage from "./EmptyCartMessage";
import { useContextSelector } from "use-context-selector";
import { BasketContext } from "../../Context/BasketContext";
import ErrorBoundary from "../ErrorHndlers/ErrorBoundary";
import { memo } from "react";
export default memo(function ShoppingCart({ hovered }) {
  const countProduct = useContextSelector(BasketContext, (c) => c.countProduct);

  return (
    <div
      className={`bg-white dark:bg-zinc-700 md:shadow-normal md:transition-all md:duration-200
       md:delay-75 ${hovered} md:absolute md:top-12 md:left-1/3 z-50 overflow-hidden md:w-100 
       md:rounded-2xl md:border-t-4 md:border-brown-200 md:max-h-130 cursor-auto lg:shadow-2xl`}
    >
      {countProduct !== 0 ? (
        <ErrorBoundary>
          <div className="w-full max-h-130 p-0 md:p-5">
            <CartHeader countProduct={countProduct} />
            <CartItemList />
            <CartFooter />
          </div>
        </ErrorBoundary>
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  );
});
