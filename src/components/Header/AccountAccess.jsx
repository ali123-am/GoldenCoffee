import { Link, useLocation } from "react-router-dom";
import {
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { UserInfoContext } from "../../Context/UserInfoContext";
import { useContextSelector } from "use-context-selector";
export default function AccountAccess() {
    const isLogin = useContextSelector(UserInfoContext, (ctx) => ctx.isLogin);
    const location = useLocation();
  const url = location.pathname;
  return (
      <Link
        to={isLogin ? "" : "/Auth"} replace
        className={`flex gap-1.5 font-Dana tracking-tightest md:px-2 lg:px-5 py-2 
        lg:py-3 md:text-lg md:rounded-full cursor-pointer rounded-md
        text-base transition-colors ease-in-out duration-150 font-normal
        text-orange-300 md:text-brown-300 
        ${ url === "/Cart" || url.startsWith("/product/")|| url==="/Store"?("md:text-zinc-800 md:dark:text-brown-300 hover:bg-orange-100 dark:hover:bg-orange-200/10 md:hover:bg-stone-300 md:dark:hover:bg-stone-500")
          :("hover:bg-orange-100 dark:hover:bg-orange-200/10 md:dark:hover:bg-stone-700 md:group-hover:bg-stone-700")}`}
      >
        {isLogin ? (
          <UserIcon className="w-5 h-5 md:w-7 md:h-7" />
        ) : (
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5  md:w-7 md:h-7 rotate-180" />
        )}
        <span className="inline md:hidden lg:inline">
          {isLogin ? "حساب کاربری" : "ورود | ثبت نام"}
        </span>
      </Link>
  );
}
