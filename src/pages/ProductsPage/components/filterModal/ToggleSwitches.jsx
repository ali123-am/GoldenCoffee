import { useFilters } from "../../context/FiltersContext";
import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { ToggleSwitch } from "./ToggleSwitch"; 
export default function ToggleSwitches() {
  const { updateParam } = useURLSearchParams();
  const { setInStock, freeShipping, setFreeShipping, inStock } = useFilters();
  return (
    <div className="mb-4 px-1 sm:px-8 md:px-0 flex flex-col gap-3 text-zinc-800 dark:text-white font-DanaDemiBold">
      <ToggleSwitch
        label="ارسال رایگان"
        value={freeShipping}
        onToggle={() => {
          updateParam("freeShipping", "", { toggle: true });
          setFreeShipping((p) => !p);
        }}
      />
      <ToggleSwitch
        label="فقط کالاهای موجود"
        value={inStock}
        onToggle={() => {
          updateParam("inStock", "", { toggle: true });
          setInStock((p) => !p);
        }}
      />
    </div>
  );
}
