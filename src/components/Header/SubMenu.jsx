import {memo} from "react";
import { Link } from "react-router-dom";
export default memo(function SubMenu({subMenus,hovered}) {
  return (
    <div
      className={`bg-white dark:bg-zinc-700 md:shadow-normal md:absolute mt-3 md:mt-0
         md:top-9 z-50  *:text-gray-900 ${hovered} w-[100%] md:w-52 max-h-100 md:overflow-hidden
         md:rounded-2xl md:border-t-4 border-brown-200`}
    >
      <div
        className={`w-[99%] max-h-100 md:py-5 *:text-base flex flex-col space-y-6 md:space-y-4
         text-zinc-700 dark:text-white -tracking-normal font-Dana *:hover:text-orange-300 
          overflow-y-auto`} 
      >
        {subMenus.map((menu,index) => (
          <Link key={index*23} to={menu.path} className="md:px-5 w-full">
            {menu.subMenuTitle}
          </Link>
        ))}
      </div>
    </div>
  );
})


