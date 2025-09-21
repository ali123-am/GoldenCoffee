import { useLocation } from "react-router-dom";
import useStoreState from "../../../stors/storeState.js";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
export default function ThemeToggleButton() {
  const { isDark, changeTheme } = useStoreState();
  const location = useLocation();
  const url = location.pathname;
  return (
    <div
      onClick={changeTheme}
      className={`flex items-center text-base gap-1.5 md:gap-2 py-2 md:py-0 transition-colors
      ease-in-out duration-150 *:font-Dana  rounded-md
      md:rounded-full cursor-pointer  text-orange-300
       md:text-brown-300 
      ${
        url === "/Cart" || url.startsWith("/product/") || url==="/Store"
          ? `md:text-zinc-800 md:dark:text-brown-300 hover:bg-orange-100 
            dark:hover:bg-orange-200/10 md:hover:bg-stone-300 md:dark:hover:bg-stone-500`
          : `hover:bg-orange-100 dark:hover:bg-orange-200/10 md:dark:hover:bg-stone-700
          md:group-hover:bg-stone-700 md:hover:bg-stone-700`
      }`}
    >
      <span className="w-6 h-6 md:w-12 md:h-12 md:p-2">
        {isDark ? <SunIcon></SunIcon> : <MoonIcon></MoonIcon>}
      </span>
      <span className="inline md:hidden">
        {isDark ? (
          <span className="inline md:hidden">تم روشن</span>
        ) : (
          <span>تم تیره</span>
        )}
      </span>
    </div>
  );
}
