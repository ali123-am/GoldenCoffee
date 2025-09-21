import { createContext, useContext, useState, useMemo } from "react";

export const SortContext = createContext();

export const SortProvider = ({ children, initialSort = "default", searchParams }) => {
  const sortParam = searchParams.get("sort") || initialSort;
  const [sort, setSort] = useState(sortParam);

  const value = useMemo(() => ({ sort, setSort }), [sort]);

  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
};

export const useSort = () => useContext(SortContext);
