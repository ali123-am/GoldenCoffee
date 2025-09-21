import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ProductsContext,
  ProductsProvider,
} from "./../../../Context/ProductsContext";
import { UIProvider } from "./UIContext";
import { SortProvider } from "./SortContext";
import { FiltersProvider } from "./FiltersContext";
import { SearchProvider } from "./SearchContext";
import LoaderDotsBetter from "../../../components/LoaderDotsBetter";

const InnerStoreProvider = ({ children, searchParams }) => {
  const { categories, brands } = useContext(ProductsContext);

  // اگر هنوز categories و brands آماده نیستن، لودر نشون بده
  if (!categories || !brands)
    return (
      <div className="flex items-center justify-center h-full mt-10 md:my-0"> 
        <LoaderDotsBetter />
      </div>
    );

  return (
    <SearchProvider>
      <UIProvider>
        <SortProvider searchParams={searchParams}>
          <FiltersProvider
            initialCategories={categories}
            initialBrands={brands}
            searchParams={searchParams}
          >
            {children}
          </FiltersProvider>
        </SortProvider>
      </UIProvider>
    </SearchProvider>
  );
};

const StoreProvider = ({ children }) => {
  const [searchParams] = useSearchParams();

  return (
    <ProductsProvider>
      <InnerStoreProvider searchParams={searchParams}>
        {children}
      </InnerStoreProvider>
    </ProductsProvider>
  );
};

export default StoreProvider;
