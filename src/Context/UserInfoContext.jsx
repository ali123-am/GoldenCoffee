import { supabase } from "../supabaseClient";
import { createContext } from "use-context-selector";
import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from "./../pages/LoginOrRegister/cookieUtils";
import { toast } from "sonner";
export const UserInfoContext = createContext();
export const UserInfoProvider = ({ children }) => {
  const queryClient = useQueryClient();
  
  const userID = useRef(null);
  // const [basket, setBasket] = useState([]);

  const updateLoginSituation = async (situation) => {
    if (userID.current) {
      const result = await supabase
        .from("Users")
        .update({ isLogin: situation })
        .eq("id", userID.current);
      if (result.status === 404) {
        toast.error("مشکلی  پیش امده !");
      }
    } else {
      return;
    }
  };
  const setUserIdFromEmail = useCallback(async (email) => {
    const { data } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email)
      .single();
    if (data?.id) {
      userID.current = data.id;
      setCookie("userID", data.id); // ذخیره در کوکی
    } else {
      toast.error("کاربر پیدا نشد");
    }
  }, []);
  const mutationForLogin = useMutation({
    mutationFn: async ({ situation }) => {
      return await updateLoginSituation(situation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const logout = useCallback(() => {
    mutationForLogin.mutate({ situation: false }); // خروج از سیستم در دیتابیس
    deleteCookie("userID");
    userID.current = null;
    queryClient.removeQueries(["userInfo"]);
  }, [mutationForLogin, queryClient]);
  useEffect(() => {
    const cookieUserID = getCookie("userID");
    if (cookieUserID) {
      userID.current = cookieUserID;
    }
  }, []);

  const addTempBasketToRealBasket = async (basket) => {
    const array = localStorage.getItem("tempBasket");
    const tempBasketID = array ? JSON.parse(array) : [];

    if (tempBasketID.length !== 0) {
      const existingIDs = basket.map((item) => item.id);
      const newIDs = tempBasketID.filter(
        (item) => !existingIDs.includes(item.id)
      );

      const updateArray = [...basket, ...newIDs];

      await supabase
        .from("Users")
        .update({ productsInBasket: updateArray })
        .eq("id", userID.current);

      localStorage.setItem("tempBasket", JSON.stringify([]));
      queryClient.setQueryData(["userInfo"], (old) => ({
        ...old,
        productsInBasket: updateArray,
      }));
    }
  };
  const fetchUser = async () => {
    if (userID.current) {
      const resulte = await supabase
        .from("Users")
        .select("*")
        .eq("id", userID.current)
        .single();
      if (resulte.status === 200) {
        addTempBasketToRealBasket(resulte.data.productsInBasket);
        return resulte.data;
      } else if (resulte.error.details === "The result contains 0 rows") {
        deleteCookie("userID");
        toast.error("حساب شما از سرور پاک شده است!");
      } else {
        toast.error("مشکلی در دریافت اطلاعات شما پیش آمده");
      }
    } else {
      return {};
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUser,
  });
  const contextValue = useMemo(
    () => ({
      data,
      isLoading,
      userName:data?.userName,
      error,
      mutationForLogin,
      isLogin: data?.isLogin || false,
      userID,
      setUserIdFromEmail,
      logout,
    }),
    [
      mutationForLogin,
      data,
      isLoading,
      error,
      userID,
      logout,
      setUserIdFromEmail,
    ]
  );
  return (
    <UserInfoContext.Provider value={contextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};
