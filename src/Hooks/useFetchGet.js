import React from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient"; // مسیر فایل supabaseClient.js خودت

export function useFetchGet() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("Products") // نام جدول شما
          .select("*");     // همه ستون‌ها

        if (error) {
          throw error;
        }
        setProducts(data);
      } catch (err) {
        setError(err.message || "خطا در دریافت اطلاعات از Supabase");
      } finally {
        setLoading(false);
      }
    };

    if (currentPath !== "/Auth") {
      fetchProducts();
    }
  }, [currentPath]);

  return { products, loading, error };
}
