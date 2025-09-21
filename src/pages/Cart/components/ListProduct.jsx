import { useContextSelector } from "use-context-selector";
import { BasketContext } from "../../../Context/BasketContext";
import { CartItemProduct } from "./CartItemProduct";

export default function ListProduct() {
  const basket = useContextSelector(BasketContext, (c) => c.basket);
  const basketIds = useContextSelector(BasketContext, (c) => c.basketID);
  return (
    <div>
      {basket.map((product) => {
        const basketItem = basketIds.find((item) => item.id == product.id);
        return (
          <CartItemProduct
            key={Number(product?.id) * 111}
            product={product}
            basketItem={basketItem}
          />
        );
      })}
    </div>
  );
}