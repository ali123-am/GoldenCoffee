import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {useJalaliDate} from "./../../Hooks/useCalendar"
export default function ArticleMeta() {
  const { year, month, day } = useJalaliDate(new Date());
  return (
    <div
      className="flex flex-row sm:flex-col items-center ml-2 font-Dana  text-teal-600
         dark:text-emerald-500 justify-between sm:justify-normal"
    >
      <div className="flex flex-row sm:flex-col gap-1 sm:gap-0 items-center font-normal text-xs sm:text-sm">
        <span className="font-semibold sm:text-2xl">{day}</span>
        <span>{month}</span>
        <span>{year}</span>
      </div>
      <Link
        className="w-17.75 h-6.5 rounded-md text-orange-300 cursor-pointer sm:hidden flex 
        justify-center items-center gap-1.5 bg-orange-200/30 dark:bg-orange-200/20"
      >
        <span className="font-Dana font-medium text-xs">مطالعه</span>
        <ArrowLeftIcon className="w-4 h-4 " />
      </Link>
    </div>
  );
}
