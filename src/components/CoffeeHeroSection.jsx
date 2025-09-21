import React from "react";
import { Link } from "react-router-dom";
import { PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";
export default function CoffeeHeroSection() {
  return (
    <div
      className="w-89.5 sm:w-150 md:w-209 lg:w-259 xl:w-315 mx-auto mt-7 md:mt-28 flex sm:flex-row
       flex-col items-center gap-5"
    >
      <img
        src="/images/contact.png"
        className="w-74 h-76.25 sm:w-50 sm:h-52.25 lg:w-60 
        lg:h-62.25 xl:w-74 xl:h-76.25 mb-8 sm:mb-0 mx-0 sm:mx-0"
      />
      <div className="flex flex-col text-zinc-800 dark:text-white">
        <div className="flex flex-col gap-1">
          <h2 className="font-MorabbaBold font-medium text-2xl sm:text-3xl xl:text-5xl">
            یکی از بهترین قهوه ها !
          </h2>
          <span className="font-MorabbaLight font-light text-lg sm:text-xl xl:text-3xl mt-5">
            کیفیت قهوه را از ما بخواهید ...
          </span>
        </div>
        <span
          className="flex items-center text-lg sm:text-2xl xl:text-4xl 
           tracking-tight text-center mb-3 sm:mt-1 sm:mb-6"
        >
          . . .
        </span>
        <p className="w-80 sm:w-90 md:w-130 lg:w-180 xl:w-236 font-DanaMedium font-normal text-lg
         xl:text-2xl tracking-tight">
          فضای گرم و دنج ما را احساس کنید، جایی که همه می توانند قهوه معطری پیدا
          کنند و دسرهای خوشمزه ما را که کاملاً با قهوه داغ همراه شده است، امتحان
          کنند. فضای داخلی شیک و کارکنان خوش برخورد ما روز شما را می سازد!
        </p>
        <Link
          className="mt-5 sm:mt-6 w-45 h-12.5 sm:w-55  lg:w-64 sm:h-15 border border-orange-300 
          rounded-full text-orange-300 flex justify-center items-center gap-2 bg-transparent
          hover:bg-orange-200/30 dark:hover:bg-orange-200/10"
        >
          <PhoneArrowUpRightIcon className="w-3.75 h-3.75 sm:w-8 sm:h-8" />
          <span className="font-Dana font-normal text-base xl:text-xl tracking-tightest">
            ثبت سفارش تلفنی
          </span>
        </Link>
      </div>
    </div>
  );
}
