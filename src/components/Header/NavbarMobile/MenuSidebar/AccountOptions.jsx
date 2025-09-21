import {
  MoonIcon,
  ShoppingCartIcon,
  SunIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import AccountAccess from "../../AccountAccess";
import ThemeToggleButton from "../../NavbarDesktop/ThemeToggleButton";
import { Link } from "react-router-dom";
export default function AccountOptions() {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <AccountAccess />
      <ThemeToggleButton />
      <Link to={"/Cart"}
        className="flex gap-2 text-base items-center font-Dana text-orange-300 py-2 
        cursor-pointer rounded-md hover:bg-orange-100  dark:hover:bg-orange-200/10"
      >
        <ShoppingCartIcon className="w-5 h-5"></ShoppingCartIcon>
        <span>سبد خرید</span>
      </Link>
    </div>
  );
}
