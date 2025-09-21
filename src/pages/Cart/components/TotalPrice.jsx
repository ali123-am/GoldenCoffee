import { useContextSelector } from "use-context-selector";
import { BasketContext } from "../../../Context/BasketContext";
import OfferBox from "./OfferBox";

export default function TotalPrice() {
  const totalPrice = useContextSelector(BasketContext, (ctx) => ctx.totalPrice);
  const totalOffer = useContextSelector(BasketContext, (ctx) => ctx.totalOffer);
  return (
    <div className="flex flex-col gap-5 text-white mt-5 sm:mt-0">
      <div
        className="flex flex-col items-center gap-7 border bg-white dark:bg-zinc-700
        dark:border-zinc-900 border-gray-300
        rounded-lg sm:rounded-xl text-black dark:text-white font-Dana text-base lg:text-xl p-4 lg:p-5 xl:p-8"
      >
        <h2 className="font-DanaDemiBold">اطلاعات پرداخت</h2>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between w-full tracking-tighter">
            <span>قیمت کل: </span>
            <div className="space-x-1">
              <span>{totalPrice.toLocaleString()}</span>
              <span className="text-sm">تومان</span>
            </div>
          </div>
          <div className="flex justify-between w-full tracking-tighter">
            <span>
              <span>سود شما</span>
              <span className="inline md:hidden lg:inline"> از خرید </span>
              <span>:</span>
            </span>
            <div className="space-x-1">
              <span>{totalOffer.toLocaleString()}</span>
              <span className="text-sm">تومان</span>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <span>هزینه ارسال : </span>
            <span className="text-emerald-500">وابسته به آدرس</span>
          </div>
        </div>
        <span className="bg-zinc-400 dark:bg-gray-500 h-0.5 w-full inline-block"></span>
        <div className="flex justify-between w-full font-bold">
          <span>مبلغ پرداختی : </span>
          <div className="space-x-1">
            <span>{(totalPrice - totalOffer).toLocaleString()}</span>
            <span className="text-sm">تومان</span>
          </div>
        </div>
        <button
          className="bg-teal-700 w-[95%] py-3 rounded-2xl text-white  
        cursor-pointer hover:bg-teal-800"
        >
          تکمیل فرایند خرید
        </button>
      </div>
      <p className="font-Dana w-full text-zinc-800 dark:text-white  text-base md:text-sm lg:text-base">
        هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد
        حذف می‌شوند
      </p>
      <OfferBox />
    </div>
  );
}
