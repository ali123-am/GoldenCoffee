import { useState, useEffect, useRef } from "react";

export const useDebouncedAnimation = (value, delay = 300, immediate = false) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handler = useRef();

  useEffect(() => {
    if (immediate) {
      setDebouncedValue(value);
      return;
    }

    clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler.current);
  }, [value, delay, immediate]);

  return debouncedValue;
};
