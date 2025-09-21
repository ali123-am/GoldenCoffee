import { useSearchParams } from "react-router-dom";

export const useURLSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParam = (key, value, { append = false, toggle = false } = {}) => {
    const newParams = new URLSearchParams(searchParams);

    if (toggle) {
      if (newParams.get(key) === "true") newParams.delete(key);
      else newParams.set(key, "true");
    } else {
      const existingRaw = newParams.get(key);
      const existing = existingRaw ? existingRaw.split(",") : [];

      if (existing.includes(value)) {
        const updated = existing.filter((v) => v !== value);
        updated.length
          ? newParams.set(key, updated.join(","))
          : newParams.delete(key);
      } else {
        if (append) newParams.set(key, [...existing, value].join(","));
        else newParams.set(key, value);
      }
    }

    setSearchParams(newParams);
  };

  const getParamArray = (key) => {
    const param = searchParams.get(key);
    return param ? param.split(",") : [];
  };

  return { searchParams, updateParam, getParamArray };
};
