import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const { productSearch, setProductSearch, performSearch } = useSearch();
  const [inputValue, setInputValue] = useState(productSearch || "");

  const handleSearch = () => {
    setProductSearch(inputValue);
    if (performSearch) performSearch(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="col-span-12 ls:col-span-3 md:order-1 order-0">
      <div className="flex items-center bg-white dark:bg-zinc-700 rounded-lg px-3 h-13 w-full">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="outline-none px-2 w-full"
        />
        <MagnifyingGlassIcon
          className="w-7 h-7 text-gray-500 dark:text-white cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}
