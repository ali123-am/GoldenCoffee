import CartItem from "./CartItem.jsx";
import { useContextSelector } from "use-context-selector";
import { BasketContext } from "../../Context/BasketContext.jsx";

export default function CartItemList() {
  const basket = useContextSelector(BasketContext, (ctx) => ctx.basket);
  const basketIds = useContextSelector(BasketContext, (ctx) => ctx.basketID);
  return (
    <div
      className="max-h-100 md:max-h-85.5 overflow-y-auto md:mt-2 [direction:ltr]
       *:[direction:rtl]"
    >
      {basket.map((product) => {
        const basketItem = basketIds.find((item) => item.id == product.id);
        return (
          <CartItem
            key={Number(product?.id) * 111}
            product={product}
            basketItem={basketItem}
          />
        );
      })}
    </div>
  );
}
