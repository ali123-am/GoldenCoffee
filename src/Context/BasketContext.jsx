import { useCallback, useState, useEffect, useContext, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext } from "use-context-selector";
import { useContextSelector } from "use-context-selector";
import { toast } from "sonner";
import { supabase } from "../supabaseClient";
import { UserInfoContext } from "./UserInfoContext";
import { ProductsContext } from "./ProductsContext";

export const BasketContext = createContext();
export const AddToBasketContext = createContext();
export const RemoveFromBasketContext = createContext();
export const IncreaseProductContext = createContext();
export const DecreaseProductContext = createContext();

export const BasketProvider = ({ children }) => {
  const { products } = useContext(ProductsContext);
  const queryClient = useQueryClient();
  const data = useContextSelector(UserInfoContext, (ctx) => ctx.data);
  const userID = useContextSelector(UserInfoContext, (ctx) => ctx.userID);

  const [basket, setBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOffer, setTotalOffer] = useState(0);
  const [tempBasketID, setTempBasketID] = useState(() => {
    const array = localStorage.getItem("tempBasket");
    return array ? JSON.parse(array) : [];
  });

  const [loadingId, setLoadingId] = useState(null); // برای لودینگ هر محصول

  useEffect(() => {
    localStorage.setItem("tempBasket", JSON.stringify(tempBasketID));
  }, [tempBasketID]);

  // محاسبه basket، totalPrice و totalOffer
  useEffect(() => {
    const productIDs = data?.productsInBasket || tempBasketID;
    const newArray = productIDs
      .map((item) => products.find((p) => p.id == item.id))
      .filter(Boolean);

    let sumPrice = 0;
    let sumOffer = 0;
    newArray.forEach((product, index) => {
      sumOffer += product?.offer * productIDs[index]?.count;
      sumPrice += (product.price - product.offer) * productIDs[index]?.count;
    });

    setBasket(newArray);
    setTotalPrice(sumPrice);
    setTotalOffer(sumOffer);
  }, [products, data, tempBasketID]);

  // عملیات ها
  const addProductToBasket = useCallback(
    async (productID) => {
      if (data?.isLogin) {
        const currentBasket = data?.productsInBasket || [];
        if (currentBasket.some((p) => p.id == productID))
          toast.error("محصول در سبد خرید وجود دارد");
        const updateArray = [...currentBasket, { id: productID, count: 1 }];
        const result = await supabase
          .from("Users")
          .update({ productsInBasket: updateArray })
          .eq("id", userID.current);
        if (result.status === 200 || result.status === 204) return "success";
        else toast.error("مشکلی در اضافه کردن محصول پیش آمد");
      } else {
        if (tempBasketID.some((item) => item.id == productID))
          toast.error("محصول در سبد خرید وجود دارد");
        setTempBasketID((prev) => [...prev, { id: productID, count: 1 }]);
      }
    },
    [data, userID, tempBasketID]
  );

  const removeFromBasket = useCallback(
    async (productID) => {
      const currentBasket = data?.productsInBasket || tempBasketID;
      const newArray = currentBasket.filter((p) => p.id != productID);
      if (userID.current) {
        const result = await supabase
          .from("Users")
          .update({ productsInBasket: newArray })
          .eq("id", userID.current);
        if (result.status === 200 || result.status === 204) return "success";
        toast.error("مشکلی در حذف محصول پیش آمده");
      } else {
        setTempBasketID(newArray);
      }
    },
    [data, userID, tempBasketID]
  );

  const increaseProduct = useCallback(
    async (id) => {
      setLoadingId(id);
      try {
        const prevArray = data?.productsInBasket || tempBasketID;
        const product = prevArray.find((item) => item.id === id);
        if (!product) return;
        const updatedProduct = { ...product, count: product.count + 1 };
        const updatedBasket = prevArray.map((item) =>
          item.id == id ? updatedProduct : item
        );
        if (userID.current && data?.productsInBasket) {
          const response = await supabase
            .from("Users")
            .update({ productsInBasket: updatedBasket })
            .eq("id", userID.current);
          if (response.status === 200 || response.status === 204) return true;
          toast.error("مشکلی پیش آمده دوباره امتحان کنید");
        } else {
          setTempBasketID(updatedBasket);
        }
      } finally {
        setLoadingId(null);
      }
    },
    [data, userID, tempBasketID]
  );

  const decreaseProduct = useCallback(
    async (id) => {
      setLoadingId(id);
      try {
        const prevArray = data?.productsInBasket || tempBasketID;
        const product = prevArray.find((item) => item.id === id);
        if (!product || product.count <= 0) return;
        const updatedProduct = { ...product, count: product.count - 1 };
        const updatedBasket = prevArray.map((item) =>
          item.id == id ? updatedProduct : item
        );
        if (userID.current && data?.productsInBasket) {
          const response = await supabase
            .from("Users")
            .update({ productsInBasket: updatedBasket })
            .eq("id", userID.current);
          if (response.status === 200 || response.status === 204) return true;
          toast.error("مشکلی پیش آمده دوباره امتحان کنید");
        } else {
          setTempBasketID(updatedBasket);
        }
      } finally {
        setLoadingId(null);
      }
    },
    [data, userID, tempBasketID]
  );

  // mutations

  const addToBasket = useMutation({
    mutationFn: (id) => addProductToBasket(id),
    onMutate: (id) => {
      setLoadingProducts((prev) => ({ ...prev, [id]: true }));
    },
    onSettled: (data, error, id) => {
      // دقت کن، سومین پارامتر id هست
      setLoadingProducts((prev) => ({ ...prev, [id]: false }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      toast.success("محصول با موفقیت به سبد خرید اضافه شد.")
    },
  });
  const removeFromBasketMutate = useMutation({
    mutationFn: (id) => removeFromBasket(id),
    onMutate: (id) => {
      setLoadingProducts((prev) => ({ ...prev, [id]: true }));
    },
    onSettled: (data, error, id) => {
      // دقت کن، سومین پارامتر id هست
      setLoadingProducts((prev) => ({ ...prev, [id]: false }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] })
      toast.success("محصول با موفقیت از سبد خرید حذف شد.")
    }
  });
  const increaseMutate = useMutation({
    mutationFn: (id) => increaseProduct(id),
    onMutate: (id) => {
      setLoadingProducts((prev) => ({ ...prev, [id]: true }));
    },
    onSettled: (data, error, id) => {
      // دقت کن، سومین پارامتر id هست
      setLoadingProducts((prev) => ({ ...prev, [id]: false }));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userInfo"] }),
  });

  const decreaseMutate = useMutation({
    mutationFn: (id) => decreaseProduct(id),
    onMutate: (id) => {
      setLoadingProducts((prev) => ({ ...prev, [id]: true }));
    },
    onSettled: (data, error, id) => {
      // دقت کن، سومین پارامتر id هست
      setLoadingProducts((prev) => ({ ...prev, [id]: false }));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userInfo"] }),
  });

  const basketID = data?.isLogin ? data?.productsInBasket : tempBasketID;
  const countProduct = basketID.length;

  const basketDataContextValue = useMemo(
    () => ({
      basket,
      basketID,
      totalPrice,
      totalOffer,
      countProduct,
      basketData: basketID,
    }),
    [basket, basketID, totalPrice, totalOffer, countProduct]
  );
  // داخل BasketProvider
  const [loadingProducts, setLoadingProducts] = useState({}); // { [productId]: true/false }

  return (
    <BasketContext.Provider value={basketDataContextValue}>
      <AddToBasketContext.Provider
        value={{ mutate: addToBasket.mutate, loadingProducts }}
      >
        <RemoveFromBasketContext.Provider
          value={{ mutate: removeFromBasketMutate.mutate, loadingProducts }}
        >
          <IncreaseProductContext.Provider
            value={{ mutate: increaseMutate.mutate, loadingProducts }}
          >
            <DecreaseProductContext.Provider
              value={{ mutate: decreaseMutate.mutate, loadingProducts }}
            >
              {children}
            </DecreaseProductContext.Provider>
          </IncreaseProductContext.Provider>
        </RemoveFromBasketContext.Provider>
      </AddToBasketContext.Provider>
    </BasketContext.Provider>
  );
};
