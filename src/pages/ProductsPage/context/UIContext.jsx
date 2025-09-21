import { createContext, useContext, useState, useMemo } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const value = useMemo(() => ({
    showFilters,
    setShowFilters,
    showSort,
    setShowSort,
    openSection,
    setOpenSection
  }), [showFilters, showSort, openSection]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
