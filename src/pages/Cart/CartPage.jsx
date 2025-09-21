import { useContextSelector } from "use-context-selector";
import PopularProducts from "../../components/PopularProducts";
import CartHeader from "./components/CartHeader";
import ListProduct from "./components/ListProduct";
import TotalPrice from "./components/TotalPrice";
import EmptyCartSituation from "./components/EmptyCartSituation";
import { BasketContext } from "../../Context/BasketContext";
export default function CartPage() {
  const basket = useContextSelector(BasketContext, (ctx) => ctx.basket);
  return (
    <div>
      {basket.length !== 0 ? (
        <div className=" w-[93%] sm:w-140 md:w-190 lg:w-255 xl:w-315 mt-20 md:mt-35 mx-auto relative">
          <CartHeader />
          <div className="w-full mt-5 grid grid-cols-1 md:gap-[5%] md:grid-cols-[65%_30%]">
            <ListProduct />
            <TotalPrice />
          </div>
          <PopularProducts />
        </div>
      ) : (
        <EmptyCartSituation />
      )}
    </div>
  );
}
