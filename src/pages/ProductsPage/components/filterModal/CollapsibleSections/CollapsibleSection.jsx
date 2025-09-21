import SectionSearch from "./SectionSearch.jsx";
import SectionItem from "./SectionItem.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function CollapsibleSection({
  section,
  open,
  searchValue,
  setLocalSearch,
  filteredData,
  updateParam,
}) {
  const { type, state, setState, paramKey, icon } = section;

  return (
    <div className="mb-4 px-4 sm:px-8 md:px-0">
      <SectionHeader icon={icon} type={type} />
      {open && (
        <div className="mt-3 max-h-80 overflow-auto rounded-lg px-4 py-2 shadow-inner bg-gray-50
         dark:bg-zinc-600 divide-y divide-gray-300 dark:divide-gray-400">
          <SectionSearch
            type={type}
            value={searchValue}
            onChange={(val) =>
              setLocalSearch((prev) => ({ ...prev, [type]: val }))
            }
          />
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <SectionItem
                key={item.en}
                item={item}
                state={state}
                setState={setState}
                paramKey={paramKey}
                updateParam={updateParam}
              />
            ))
          ) : (
            <p className="text-center text-sm text-gray-500 dark:text-gray-300 py-4">
              نتیجه‌ای یافت نشد.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
