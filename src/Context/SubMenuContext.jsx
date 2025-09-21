import { createContext, useMemo, useState} from "react";

export const SubMenuContext = createContext();

export function SubMenuProvider({ children }) {
  const [openSubMenuId, setOpenSubMenuId] = useState(null);
  const contextValue = useMemo(
    () => ({
      openSubMenuId,
      setOpenSubMenuId
    }),
    [openSubMenuId,setOpenSubMenuId]
  );
  return <SubMenuContext value={contextValue}>{children}</SubMenuContext>;
}
