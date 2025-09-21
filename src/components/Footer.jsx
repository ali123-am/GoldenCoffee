import React from "react";
import { Link } from "react-router-dom";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import useStoreState from "../stors/storeState";
function Footer() {
  const access = [
    "ارتباط با ما",
    "ضمانت نامه ها",
    "فرصت های شغلی",
    "پرسش های متداول",
    "ثبت سفارش",
    "شرایط استفاده",
    "عودت کالا",
    "حریم خصوصی",
  ].reverse();
  const { isDark } = useStoreState();
  return (
    <div className=" mt-20 md:mt-30 relative bg-zinc-700 w-full flex flex-col items-center sm:px-7">
      <div className=" w-full hidden md:flex justify-center absolute top-0">
        <svg
          xmlns="./images/curve.svg"
          alt=""
          width={100}
          height={22}
          className="border-none absolute rotate-180 z-10"
        >
          <path
            d="M50 0C69 0 81 22 100 22L0 22C18.75 22 31 0 50 0Z"
            fill={isDark ? "#272727" : "#f5f3ff"}
          />
        </svg>
        <div
          className="w-7.5 h-7.5 border border-orange-300 z-20 flex justify-center items-center
        rounded-full absolute -top-5"
        >
          <ChevronUpIcon className="w-5 h-5 text-zinc-700 dark:text-white "></ChevronUpIcon>
        </div>
      </div>

      {/* top section */}
      <div
        className="flex flex-col md:flex-row pt-15.5 gap-5 lg:gap-10 2xl:gap-28 min-h-114.5 
      max-w-432 border-b border-gray-300/20 pb-10 md:pb-0 mx-5 sm:mx-0"
      >
        {/* right section */}
        <div className="">
          <div className="flex gap-5">
            <img
              src="./images/assets/logo_modified.svg"
              className="w-14.25 h-13.5"
              alt=""
            />
            <img
              className="w-34.5 h-13.5"
              src="./images/assets/logo-type.svg"
              alt=""
            />
          </div>
          <p
            className="text-gray-300 font-Dana font-normal text-base sm:text-xl md:text-base 
            xl:text-xl max-w-151.5 mt-4.5 leading-10 sm:leading-12.5"
          >
            ما برآنیم تا با پیشرو بودن در فرآیند تولید، نوع و کیفیت محصول، خدمات
            و توزیع، الگویی برای تولیدکنندگان ایرانی باشیم و به مرجع فرهنگ قهوه
            در ایران تبدیل شویم. می‌پنداریم که نظر مردم ایران و منطقه باید نسبت
            به کالای ایرانی بهبود یابد و در این راستا با اشتیاق می‌کوشیم.
          </p>
        </div>

        {/* ccenter section */}
        <div>
          <h2
            className="text-white font-Dana text-2xl font-semibold [line-height:28px]
            mb-8 md:mb-12"
          >
            دسترسی سریع
          </h2>
          <ul
            className="text-gray-300 grid grid-cols-2 gap-x-2 lg:gap-x-8 gap-y-5 text-lg md:text-sm lg:text-base xl:text-xl
            font-Dana font-normal max-w-95"
          >
            {access.map((item, index) => (
              <Link
                key={index * index - 4}
                className="flex gap-2 items-center hover:text-orange-300"
              >
                <span className="w-2.5 h-6 text-xl lg:text-3xl inline-block rounded-3xl">
                  -
                </span>
                <li>{item}</li>
              </Link>
            ))}
          </ul>
        </div>
        {/* left section */}

        <div>
          <div>
            <h2 className="text-white font-semibold font-Dana text-2xl [line-height:28px] mb-8 md:mb-10">
              در تماس باشیم
            </h2>
            <div className="text-gray-300 flex gap-3">
              <MapPinIcon className="w-7 h-7"></MapPinIcon>
              <p className="font-Dana text-base sm:text-xl md:text-base xl:text-xl font-normal [line-height:28px]">
                بلوار میرداماد، خیابان البرز، کوچه قبادیان شرقی، پلاک ۳۳
              </p>
            </div>
            <div
              className="text-base sm:text-xl md:text-base xl:text-xl font-Dana font-medium text-gray-300 flex gap-5 sm:gap-3 xl:gap-6 items-start sm:items-center md:items-start xl:items-center
              mt-6 flex-col sm:flex-row md:flex-col xl:flex-row "
            >
              <div className="flex justify-center items-center gap-3 hover:text-orange-300">
                <EnvelopeIcon className="w-7 h-7 " />
                <p className="font-Dana font-medium [line-height:24px]">
                  info@Coffee.com
                </p>
              </div>
              <span className="flex md:flex-col lg:flex-row gap-3 hover:text-orange-300">
                <span className="flex gap-3">
                  <PhoneIcon className="w-6 h-6 " />
                  <span className=" inline-block ">0902 123 6628</span>
                </span>
                <span>021 - 6789012</span>
              </span>
            </div>
          </div>
          <div className="flex flex-row md:flex-col lg:flex-row gap-1.5 sm:gap-6 md:gap-2 lg:gap-6 mt-8 lg:mt-10">
            <Link
              className="w-44 sm:w-58 lg:w-40 xl:w-62 h-12 text-orange-300 border border-orange-300 rounded-xl 
            flex justify-center items-center gap-2 hover:scale-101 shadow-brown-300
              transition-transform duration-100 ease-in-out delay-75"
            >
              <span className="font-DanaDemiBold font-medium text-base xl:text-xl pt-1">
                @golden_coffee
              </span>
            </Link>
            <Link
              className="w-44 sm:w-58 lg:w-40 xl:w-62 h-12 text-zinc-700 rounded-xl flex justify-center 
            items-center gap-2 bg-linear-to-r/srgb from-orange-100 to-orange-300
            transition-transform duration-100 ease-in-out hover:scale-101 delay-75"
            >
              <img
                src="./images/assets/telegram.svg"
                alt=""
                className="w-6 h-6 xl:w-8 xl:h-8"
              />
              <span className="font-DanaDemiBold font-medium text-base xl:text-xl pt-1">
                @golden_coffee
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* botton section */}
      <div
        className="px-5 md:mx-0 w-full mt-7 lg:mt-11 flex flex-col lg:flex-row gap-2 md:gap-5 xl:gap-20 lg:justify-between lg:items-center text-gray-300 font-Dana font-medium
      text-base mb-7 lg:mb-11"
      >
        <div className="flex gap-2.5 items-center">
          <span className="w-8 h-8 inline-flex border border-zinc-600 rounded-full justify-center items-center">
            <span className="w-5.5 h-5.5 inline-flex justify-center items-center border border-zinc-500 rounded-full">
              <span
                className="w-2 h-2 inline-block rounded-full 
                bg-linear-to-r/srgb from-orange-100 to-orange-300"
              ></span>
            </span>
          </span>
          <p className="text-xs xs:text-base">
            تمام حقوق مادی و معنوی این سایت متعلق به{" "}
            <span className="text-orange-300">گلد کافی</span> میباشد.
          </p>
        </div>

        <div className="text-end text-xs xs:text-base ">
          <p>Copyright © 2023 Golden Coffee. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Footer);
