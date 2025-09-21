import { memo } from "react";
import { menuOptions } from "../../dataSubMenu";
import MenuItem from "./MenuItem";
export default memo(function MenuList() {
  return (
    <ul
      className="flex flex-col gap-6 mt-6 border-b pb-6 *:font-Dana *:flex *:gap-2 w-58
      dark:border-gray-500 *:cursor-pointer dark:text-white border-gray-300
      *:hover:text-orange-300 *:text-base *:font-normal"
    >
      {menuOptions.map((menu) => (
        <MenuItem key={menu.id * 73} menu={menu} />
      ))}
    </ul>
  );
});


