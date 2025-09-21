import { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
export default function OfferBox() {
  const [state, setState] = useState(false);
  const changeIconRotate = () => {
    setState((p) => !p);
  };
  return (
    <div
      className={`w-full h-16 bg-white dark:bg-zinc-700 rounded-lg md:rounded-xl font-Dana  
      flex-col gap-6 border-1 dark:border-zinc-900 border-zinc-300 overflow-hidden p-5 flex
      transition-[height] duration-300 [interpolate-size:allow-keywords]
      ${state ? "h-43" : ""} 
    `}
    >
      <div
        className="flex justify-between items-center font-DanaDemiBold text-zinc-900
       dark:text-white"
      >
        <span>کد تخفیف دارید؟</span>
        <ChevronUpIcon
          onClick={changeIconRotate}
          className={`w-5.5 h-5.5 ${
            state ? "rotate-180" : ""
          } transition-transform duration-300 cursor-pointer rotate-0`}
        />
      </div>
      <span className="inline-block w-full h-0.25 bg-zinc-400 dark:bg-gray-500"></span>
      <div className="h-13 rounded-xl bg-zinc-200 dark:bg-gray-600/80 relative">
        <input
          type="text"
          className="w-full h-full pr-4 pl-24 outline-none text-zinc-700 dark:text-white"
          placeholder="کد تخفیف را وارد کنید"
        />
        <button
          className="bg-blue-400 p-2 rounded-xl absolute top-1.5 left-2
        hover:bg-blue-500 cursor-pointer"
        >
          اعمال
        </button>
      </div>
    </div>
  );
}
