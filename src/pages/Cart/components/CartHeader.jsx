import { useContextSelector } from "use-context-selector";
import { BasketContext } from "../../../Context/BasketContext";

export default function CartHeader() {
  const countProduct = useContextSelector(BasketContext, (c) => c.countProduct);
  return (
    <div className="">
      <div className="border-b-3 border-b-gray-400 dark:border-b-gray-500 ">
        <h2
          className="text-lg md:text-2xl font-Dana w-35 md:w-40 md:h-14 pb-4 text-black dark:text-white
           flex justify-center gap-2 items-center relative"
        >
          سبد خرید
          <span
            className="w-7 md:w-9 h-7 md:h-9 text-white px-1 rounded-full dark:bg-brown-300/70
          bg-orange-400/80 text-base md:text-xl flex justify-center items-center"
          >
            {countProduct}
          </span>
          <span
            className="w-full h-1.5 inline-block bg-orange-400 dark:bg-brown-300 absolute 
          -bottom-[3px] rounded-t-lg"
          ></span>
        </h2>
      </div>
      <span className="w-full inline-block "></span>
    </div>
  );
}