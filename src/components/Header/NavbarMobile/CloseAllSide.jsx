import { useContext } from "react";
import { SidebarContext } from "../../../Context/SidebarContext";
export default function CloseAllSide() {
  const { activeSidebar, dispatch } = useContext(SidebarContext);
  return (
    <>
      {(activeSidebar.menoSidebar || activeSidebar.basketSidebar) && (
        <div
          onClick={() => dispatch({ type: "closeAllSidebar" })}
          className="fixed top-0 right-0 bg-black/40 w-full h-full z-20"
        ></div>
      )}
    </>
  );
}