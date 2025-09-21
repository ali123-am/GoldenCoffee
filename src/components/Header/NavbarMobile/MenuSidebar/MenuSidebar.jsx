import MenuList from "./MenuList";
import MenuHeader from "./MenuHeader";
import { useContext } from "react";
import AccountOptions from "./AccountOptions";
import { SidebarContext } from "../../../../Context/SidebarContext";
import { SubMenuContext } from "../../../../Context/SubMenuContext";
export default function MenuSidebar() {
  const {setOpenSubMenuId} = useContext(SubMenuContext);
  const {activeSidebar}  = useContext(SidebarContext);

  return (
    <div
      onClick={() => setOpenSubMenuId(null)}
      className={` bg-white dark:bg-zinc-700 h-screen w-68 px-4 py-3 overflow-y-auto 
        overflow-x-hidden fixed top-0 right-0 transition-transform duration-200 z-30
        ${activeSidebar.menoSidebar ? "translate-x-0" : "translate-x-full"}`}
    >
      <MenuHeader />
      <MenuList />
      <AccountOptions />
    </div>
  );
}
