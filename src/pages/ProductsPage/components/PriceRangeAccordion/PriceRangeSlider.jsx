import { useEffect, useRef } from "react";

export default function PriceRangeSlider({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  defaultMinPrice,
  defaultMaxPrice,
}) {
  const containerRef = useRef(null);

  // درصد برای نمایش نوار
  const minPercent =
    ((minPrice - defaultMinPrice) / (defaultMaxPrice - defaultMinPrice)) * 100;
  const maxPercent =
    ((maxPrice - defaultMinPrice) / (defaultMaxPrice - defaultMinPrice)) * 100;

  const clamp = (value) =>
    Math.min(Math.max(value, defaultMinPrice), defaultMaxPrice);

  const handleClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    const value = Math.round(
      defaultMinPrice + percent * (defaultMaxPrice - defaultMinPrice)
    );

    if (Math.abs(value - minPrice) < Math.abs(value - maxPrice)) {
      setMinPrice(Math.min(clamp(value), maxPrice));
    } else {
      setMaxPrice(Math.max(clamp(value), minPrice));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const url = new URL(window.location);
      url.searchParams.set("minPrice", minPrice);
      url.searchParams.set("maxPrice", maxPrice);
      window.history.replaceState({}, "", url);
    }, 500); // debounce
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  return (
    <>
      <div
        className="relative w-full h-3 cursor-pointer [direction:ltr]"
        ref={containerRef}
        onClick={handleClick}
      >
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full -translate-y-1/2" />
        <div
          className="absolute top-1/2 h-1 bg-cyan-500 rounded-full -translate-y-1/2"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          min={defaultMinPrice}
          max={defaultMaxPrice}
          value={minPrice}
          onChange={(e) =>
            setMinPrice(Math.min(Number(e.target.value), maxPrice))
          }
          className="absolute w-full h-3 bg-transparent appearance-none pointer-events-none"
        />
        <input
          type="range"
          min={defaultMinPrice}
          max={defaultMaxPrice}
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Math.max(Number(e.target.value), minPrice))
          }
          className="absolute w-full h-3 bg-transparent appearance-none pointer-events-none"
        />
        <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: #06b6d4;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          pointer-events: auto;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #06b6d4;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          pointer-events: auto;
        }
      `}</style>
      </div>
      <div
        className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400 
      [direction:ltr] "
      >
        <span>ارزان‌ترین</span>
        <span>گران‌ترین</span>
      </div>
    </>
  );
}
