import { Link } from "react-router-dom";
import useStoreState from "../stors/storeState";

export default function Page404() {
  const { isDark } = useStoreState();
  const src = isDark
    ? "./images/404/404_no_bg.png"
    : "./images/404/Error404.png";
  return (
    <div className="w-full h-screen flex flex-col sm:flex-row justify-center items-center gap-10">
      <div className="order-2 sm:order-1 flex flex-col justify-center items-center gap-10 text-brown-900 dark:text-white">
        <h1 className="mr-2 font-DanaDemiBold text-lg md:text-2xl lg:text-4xl 2xl:text-5xl ">
          متاسفانه صفحه مورد نظر یافت نشد.
        </h1>
        <Link
          to={"/"}
          className="p-3 lg:p-4 2xl:p-5 text-sm md:text-base lg:text-xl 2xl:text-2xl text-white
        bg-brown-900/95 hover:bg-brown-900 dark:bg-amber-600 dark:hover:bg-amber-700 rounded-xl font-Dana"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <div className="w-80 h-80 sm:w-90 sm:h-90 md:w-100 md:h-100 lg:w-120 lg:h-130 xl:w-180 xl:h-180 order-1 sm:orer-2">
        <img
          className="w-full h-full"
          src={src}
          alt="صفحه یافت نشد"
          loading="lazy"
        />
      </div>
    </div>
  );
}
