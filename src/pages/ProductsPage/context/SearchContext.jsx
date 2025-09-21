import { createContext, useContext, useState, useMemo } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children, initialSearch = "" }) => {
  const [productSearch, setProductSearch] = useState(initialSearch);

  const value = useMemo(() => ({ productSearch, setProductSearch }), [productSearch]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = () => useContext(SearchContext);
