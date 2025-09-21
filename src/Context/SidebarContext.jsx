import { createContext, useMemo, useReducer } from "react";
export const SidebarContext = createContext();

const initialState = {
  menoSidebar: false,
  basketSidebar: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openMenoSidebar":
      return { ...state, menoSidebar: true };
    case "closeMenoSidebar":
      return { ...state, menoSidebar: false };
    case "openBasketSidebar":
      return { ...state, basketSidebar: true };
    case "closeBasketSidebar":
      return { ...state, basketSidebar: false };
    case "closeAllSidebar":
      return initialState;
    default:
      return state;
  }
};

export function SidebarProvider({ children }) {
  const [activeSidebar, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(
    () => ({
      activeSidebar,
      dispatch,
    }),
    [activeSidebar, dispatch]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
