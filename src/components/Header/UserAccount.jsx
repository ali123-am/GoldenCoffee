import { memo } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { UserInfoContext } from "../../Context/UserInfoContext";
import { useContextSelector } from "use-context-selector";
export default memo(function UserAccount({ hovered }) {
  const logout = useContextSelector(UserInfoContext, (ctx) => ctx.logout);
  return (
    <div
      className={`absolute -top-24 left-5 lg:left-18 ${hovered} transition-all duration-200 delay-75
      w-52 h-56 rounded-2xl bg-white dark:bg-zinc-700 shadow-2xl mt-40 py-4
      px-3.5 text-zinc-800 dark:text-white font-Dana font-normal text-base
      border-t-3 border-brown-200 `}
    >
      <span className="absolute -top-5 -left-17 inline-block w-38 h-10 "></span>
      <div
        className=" flex flex-col gap-1.5 w-45 *:hover:bg-orange-300/20 
       *:hover:text-orange-300 *:p-2 *:rounded-md *:transition-colors *:duration-150"
      >
        <Link to={"/Dashbord"} className="flex gap-2.5 items-center">
          <ShoppingBagIcon className="w-5 h-5" />
          <span>سفارشات من</span>
        </Link>
        <Link to={"/Dashbord"} className="flex gap-2.5 items-center">
          <EnvelopeIcon className="w-5 h-5" />
          <span>لیست پیام ها</span>
        </Link>
        <Link to={"/Dashbord"} className="flex gap-2.5 items-center">
          <Cog6ToothIcon className="w-5 h-5" />
          <span>اطلاعات کاربری</span>
        </Link>
      </div>
      <span className="inline-block w-42 h-0.25 bg-gray-200 dark:bg-gray-600 mt-3 mb-.5"></span>
      <button
        className="flex gap-2.5 items-center w-45 hover:bg-red-400/10 
        hover:text-red-400 p-2 rounded-md transition-colors xduration-150 cursor-pointer"
        onClick={logout}
      >
        <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
        <span>خروج از حساب</span>
      </button>
    </div>
  );
});
