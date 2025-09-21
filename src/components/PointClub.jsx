import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
export default function PointClub() {
  return (
    <div
      className="mt-8 md:mt-20 max-w-315 h-auto lg:h-36 flex items-center justify-around xl:mx-auto 
      rounded-2xl bg-linear-to-r/srgb from-emerald-400 to-emerald-800 p-2 lg:p-0 
      flex-wrap sm:flex-nowrap mx-4 "
    >
      <div className="w-full sm:w-auto flex justify-center items-center gap-3 lg:gap-6 my-8 lg:my-0">
        <img
          src="/images/club/diamond.png"
          className="w-20.5 h-18.5 lg:w-27.5 lg:h-24.5"
          loading="lazy"
          alt="Club"
        />
        <div className="flex flex-col gap-2 text-white">
          <h2 className="font-MorabbaBold font-bold text-3xl lg:text-5xl">کافی کلاب</h2>
          <p className="font-MorabbaLightM font-light text-lg lg:text-2xl">میدونستی میتونی با امتیاز هات قهوه بگیری ؟</p>
        </div>
      </div>
      <div className="flex gap-2 mb-8 sm:mb-0 lg:gap-5">
          <div className="w-18 h-18 lg:w-24.5 lg:h-24.5 rounded-2xl bg-white flex flex-col gap-1.5
           justify-center items-center text-emerald-500">
            <img src="/images/club/Discovery.svg" className="w-10 h-10 lg:w-12 lg:h-12" alt="" />
            <span className="font-Dana font-normal text-xs lg:text-sm ">چرخ و بخت</span>
           </div>
          <div className="w-18 h-18 lg:w-24.5 lg:h-24.5 rounded-2xl bg-white flex flex-col gap-1.5
           justify-center items-center text-emerald-500">
            <img src="/images/club/Activity.svg" className="w-10 h-10 lg:-12 lg:h-12" alt="" />
            <span className="font-Dana font-normal text-xs lg:text-sm ">ماموریت ها</span>
           </div>
          <div className="w-18 h-18 lg:w-24.5 lg:h-24.5 rounded-2xl bg-white flex flex-col gap-1.5
           justify-center items-center text-emerald-500">
            <img src="/images/club/Ticket-Star.svg" className="w-10 h-10 lg:w-12 lg:h-12" alt="" />
            <span className="font-Dana font-normal text-xs lg:text-sm ">جایزه ها</span>
           </div>
      </div>
      <div className="w-22.5 lg:w-33 flex flex-col gap-2 mb-11.5 sm:mb-0 items-center justify-center 
      text-center">
        <div className="w-full flex flex-col gap-1 text-white items-center justify-center" >
            <span className="font-Dana font-semibold text-2xl lg:text-3xl">542</span>
            <span className="font-Dana font-normal text-xs lg:text-sm">امتیـــــــاز شما</span>
        </div>
        <Link className="w-22.5 h-7 lg:w-33 lg:h-10 flex justify-center items-center rounded-full text-white
         bg-linear-to-r/srgb from-brown-300 to-orange-300">
          <span className="font-Dana font-medium text-xs lg:text-sm inline-block">دریافت جایزه</span>
          <ChevronLeftIcon className="w-5 h-5 lg:w-6 lg:h-6"/>
        </Link>
      </div>
    </div>
  );
}
