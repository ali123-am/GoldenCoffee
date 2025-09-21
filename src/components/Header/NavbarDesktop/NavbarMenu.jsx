import SubMenu from "../SubMenu.jsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { menuOptions } from "../dataSubMenu.jsx";
export default function NavbarMenu() {
  const path = useLocation();
  const url = path.pathname;
  return (
    <ul
      className=" *:hover:text-hoverMeno tracking-tightest *:font-Dana 
        *:text-xl flex gap-4.5 ls:gap-5"
    >
      {menuOptions.map((menu) => (
        <li
          key={menu.id * 124}
          className={`${menu.isSubMenu ? "relative" : ""} z-10
             group cursor-pointer`}
        >
          {menu.isSubMenu && (
            <>
              <span
                className="absolute top-5 hidden cursor-auto group-hover:inline-block
                     w-20 h-6"
              ></span>
              <SubMenu
                hovered={
                  "invisible opacity-0 group-hover:opacity-100 group-hover:visible"
                }
                subMenus={menu.subMenus}
              />
            </>
          )}
          <NavLink
            to={menu?.href}
            className={({ isActive }) =>
              `${
                isActive
                  ? url === "/Store"
                    ? "text-orange-400 dark:text-brown-300"
                    : "text-brown-300"
                  : ""
              } text-lg ls:text-xl`
            }
          >
            {menu.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
