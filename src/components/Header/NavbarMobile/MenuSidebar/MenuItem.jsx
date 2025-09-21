import { useContext } from "react";
import SubMenu from "../../SubMenu";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { SubMenuContext } from "../../../../Context/SubMenuContext";
import { Link, NavLink } from "react-router-dom";
export default function MenuItem({ menu }) {
  const { openSubMenuId, setOpenSubMenuId } = useContext(SubMenuContext);
  return (
    <li
      className={`w-58 relative flex flex-col overflow-hidden [interpolate-size:allow-keywords] transition-[height] duration-100 delay-75
      ${openSubMenuId === menu.id && menu.isSubMenu ? "h-auto" : ""} `}
    >
      <NavLink
        to={menu?.href}
        className={({ isActive }) =>
          `${
            isActive
              ? "text-orange-300 bg-orange-100 dark:bg-orange-200/20 h-10 flex items-center px-2.5 rounded-md "
              : ""
          } flex justify-between `
        }
      >
        <div className="flex gap-2">
          {menu.icon}
          <span>{menu.title}</span>
        </div>
      </NavLink>
        {menu.isSubMenu && (
          <ChevronUpIcon
            onClick={(e) => {
              e.stopPropagation();
              setOpenSubMenuId((prev) => (prev === menu.id ? null : menu.id));
            }} 
            className={`transition-transform duration-300 w-4.5 h-4.5 absolute left-0 top-0
                ${openSubMenuId === menu.id ? "rotate-180" : ""}`}
          />
        )}
      {openSubMenuId === menu.id && menu.isSubMenu && (
        <SubMenu subMenus={menu.subMenus} />
      )}
    </li>
  );
}
