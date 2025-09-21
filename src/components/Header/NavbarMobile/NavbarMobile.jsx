import CloseAllSide from "./CloseAllSide";
import BasketSidebar from "./BasketSidebar";
import OpenMenuButton from "./OpenMenuButton";
import OpenBasketButton from "./OpenBasketButton";
import MenuSidebar from "./MenuSidebar/MenuSidebar";
import { SubMenuProvider } from "../../../Context/SubMenuContext";
export default function NavbarMobile() {
  return (
    <div
      className="w-full h-15 absolute top-0 flex items-center justify-between px-4 
       bg-white dark:bg-zinc-700 shadow-md"
    >
      <OpenMenuButton />
      <SubMenuProvider>
        <MenuSidebar />
      </SubMenuProvider>
      <img src="/images/headerImages/svgs/app-logo-type.svg" />
      <OpenBasketButton />
      <BasketSidebar />
      <CloseAllSide />
    </div>
  );
}
