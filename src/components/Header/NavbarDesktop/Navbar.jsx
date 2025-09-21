import NavbarMenu from "./NavbarMenu";
import AuthStatusMenu from "./AuthStatusMenu";
import ThemeToggleButton from "./ThemeToggleButton";
import CartIconWithPopover from "./CartIconWithPopover";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const url = location.pathname;
  return (
    <header
      className={`${
        url === "/Cart" || url.startsWith("/product/") || url==="/Store"
          ? "w-full absolute top-0 bg-white dark:bg-zinc-700 shadow-md"
          : "backdrop-blur bg-black/50 rounded-3xl xl:w-[90%] w-[95%] top-12 fixed"
      }
      transform -translate-x-1/2 z-40 flex items-center justify-between px-3 lg:px-8 left-1/2 h-24
    `}
    >
      <div
        className={`flex items-center gap-3 lg:gap-5
        ${
          url === "/Cart" || url.startsWith("/product/") || url==="/Store"
            ? "text-zinc-800 dark:text-white"
            : "text-white"
        }`}
      >
        <img
          className="w-9 lg:w-14 h-9 lg:h-14"
          src="/images/headerImages/svgs/app-logo.svg"
          alt="Golden Coffee"
        />
        <NavbarMenu />
      </div>
      <div
        className={`${ url === "/Cart" || url.startsWith("/product/") || url==="/Store"
            ? "text-zinc-800 dark:text-brown-300"
            : "text-orange-300 md:text-brown-300"
        }
      flex items-center text-brown-300  h-1/2`}
      >
        <div className="flex gap-0 lg:gap-2 cursor-pointer">
          <CartIconWithPopover />
          <ThemeToggleButton />
        </div>
        <span
          className={`${
            url === "/Cart" || url.startsWith("/product/") || url==="/Store"
              ? "bg-zinc-900 dark:bg-brown-300"
              : "bg-brown-300"
          }
          block w-px h-full mr-2 ml-2 xl:mr-7 xl:ml-2`}
        ></span>
        <AuthStatusMenu />
      </div>
    </header>
  );
}
