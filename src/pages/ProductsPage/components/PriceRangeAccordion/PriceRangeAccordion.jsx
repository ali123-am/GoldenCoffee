import { useContext } from "react";
import { useFilters } from "../../context/FiltersContext.jsx";
import { ProductsContext } from "../../../../Context/ProductsContext";
import PriceRangeHeader from "./PriceRangeHeader.jsx";
import PriceRangeSlider from "./PriceRangeSlider.jsx";
import PriceRangeLabels from "./PriceRangeLabels.jsx";

export default function PriceRangeAccordion() {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice, isOpen, setIsOpen } =
    useFilters();
  const { defaultMaxPrice, defaultMinPrice } = useContext(ProductsContext);

  return (
    <div className="px-4 sm:px-8 md:px-0">
      <PriceRangeHeader isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <>
          <PriceRangeLabels minPrice={minPrice} maxPrice={maxPrice} />
          <PriceRangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            defaultMinPrice={defaultMinPrice}
            defaultMaxPrice={defaultMaxPrice}
          />
        </>
      )}
    </div>
  );
}
