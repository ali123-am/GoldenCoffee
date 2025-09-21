import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsContext } from "../../../Context/ProductsContext";
import { useUI } from "./UIContext";
import { useDebouncedAnimation } from "../hooks/useDebouncedAnimation";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children, searchParams }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setOpenSection } = useUI();
  const { categories, brands, defaultMaxPrice, defaultMinPrice } =
    useContext(ProductsContext);
  const [, setSearchParams] = useSearchParams();

  const getCategoriesFromURL = useCallback(() => {
    const catParam = searchParams.get("categories")?.split(",") || [];
    const mapFa = Object.fromEntries(categories.map((c) => [c.en, c.fa]));
    return catParam.map((en) => ({ en, fa: mapFa[en] || en }));
  }, [searchParams, categories]);

  const getBrandsFromURL = useCallback(() => {
    const brandParam = searchParams.get("brands")?.split(",") || [];
    const mapFa = Object.fromEntries(brands.map((b) => [b.en, b.fa]));
    return brandParam.map((en) => ({ en, fa: mapFa[en] || en }));
  }, [searchParams, brands]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [freeShipping, setFreeShipping] = useState(
    searchParams.get("freeShipping") === "true"
  );
  const [inStock, setInStock] = useState(
    searchParams.get("inStock") === "true"
  );
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    if (categories.length) setSelectedCategories(getCategoriesFromURL());
  }, [categories, getCategoriesFromURL]);

  useEffect(() => {
    if (brands.length) setSelectedBrands(getBrandsFromURL());
  }, [brands, getBrandsFromURL]);

  const removeFilter = useCallback(
    (valueEn) => {
      if (selectedCategories.some((c) => c.en === valueEn)) {
        const updated = selectedCategories.filter((c) => c.en !== valueEn);
        setSelectedCategories(updated);
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          if (updated.length) {
            newParams.set("categories", updated.map((c) => c.en).join(","));
          } else {
            newParams.delete("categories");
          }
          return newParams;
        });
        return;
      }
      if (selectedBrands.some((b) => b.en === valueEn)) {
        const updated = selectedBrands.filter((b) => b.en !== valueEn);
        setSelectedBrands(updated);
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          if (updated.length) {
            newParams.set("brands", updated.map((b) => b.en).join(","));
          } else {
            newParams.delete("brands");
          }
          return newParams;
        });
        return;
      }
    },
    [selectedCategories, selectedBrands, setSearchParams]
  );

  // =======================
  // رنج قیمت
  // =======================
  const [minPrice, setMinPrice] = useState(defaultMinPrice);
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);

  // اضافه کردن دیبانس برای رنج قیمت
  const debouncedMinPrice = useDebouncedAnimation(minPrice, 300);
  const debouncedMaxPrice = useDebouncedAnimation(maxPrice, 300);

  // بار اول از URL بخوان
  useEffect(() => {
    const urlMin = searchParams.get("minPrice");
    const urlMax = searchParams.get("maxPrice");

    if (urlMin !== null) setMinPrice(Number(urlMin));
    else setMinPrice(defaultMinPrice);

    if (urlMax !== null) setMaxPrice(Number(urlMax));
    else setMaxPrice(defaultMaxPrice);
  }, [searchParams, defaultMaxPrice, defaultMinPrice]);

  // هر بار تغییر کرد sync با URL
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    const isDefaultMin = minPrice === defaultMinPrice;
    const isDefaultMax = maxPrice === defaultMaxPrice;

    if (isDefaultMin) newParams.delete("minPrice");
    else newParams.set("minPrice", minPrice);

    if (isDefaultMax) newParams.delete("maxPrice");
    else newParams.set("maxPrice", maxPrice);

    setSearchParams(newParams);
  }, [minPrice, maxPrice, searchParams, setSearchParams, defaultMaxPrice, defaultMinPrice]);

  // =======================
  // clear all
  // =======================
  const clearAllFilters = useCallback(() => {
    setFreeShipping(false);
    setInStock(false);
    setIsOpen(false);
    setOpenSection(false);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("categories");
      newParams.delete("brands");
      newParams.delete("freeShipping");
      newParams.delete("inStock");
      newParams.delete("minPrice");
      newParams.delete("maxPrice");
      return newParams;
    });
  }, [setSearchParams, setOpenSection]);

  const value = useMemo(
    () => ({
      selectedCategories,
      setSelectedCategories,
      selectedBrands,
      setSelectedBrands,
      freeShipping,
      setFreeShipping,
      inStock,
      setInStock,
      filterSearch,
      setFilterSearch,
      clearAllFilters,
      removeFilter,
      lengthCategories: selectedCategories.length,
      lengthBrands: selectedBrands.length,
      maxPrice,
      minPrice,
      debouncedMinPrice,
      debouncedMaxPrice,
      setMaxPrice,
      setMinPrice,
      setIsOpen,
      isOpen,
    }),
    [
      selectedCategories,
      selectedBrands,
      freeShipping,
      inStock,
      filterSearch,
      clearAllFilters,
      removeFilter,
      maxPrice,
      minPrice,
      debouncedMinPrice,
      debouncedMaxPrice,
      setMaxPrice,
      setMinPrice,
      isOpen,
    ]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);

