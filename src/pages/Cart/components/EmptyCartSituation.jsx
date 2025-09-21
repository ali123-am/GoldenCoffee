import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import PopularProducts from "../../../components/PopularProducts";

export default function EmptyCartSituation() {
  return (
    <div className="flex flex-col items-center justify-center text-center font-Dana py-16 mt-15 md:mt-25">
      {/* آیکون */}
      <ShoppingCartIcon className="w-20 h-20 text-gray-400 mb-6" />

      {/* متن */}
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
        سبد خرید شما خالی است
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        برای شروع خرید، محصولات خوشمزه قهوه را به سبد خود اضافه کنید ☕
      </p>

      {/* دکمه رفتن به فروشگاه */}
      <Link
        to="/Store"
        className="mt-6 px-6 py-3 bg-orange-500 dark:bg-emerald-500 dark:hover:bg-emerald-600 
        text-white rounded-xl shadow hover:bg-orange-600 transition-colors font-medium mb-10 md:mb-0"
      >
        مشاهده محصولات
      </Link>

      <PopularProducts/>
    </div>
  );
}
