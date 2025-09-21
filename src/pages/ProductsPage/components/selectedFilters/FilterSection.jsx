import { FilterTag } from "./FilterTag";

export const FilterSection = ({ title, items, color = "blue", onRemove }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{title}</span>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <FilterTag key={`${title}-${index}`} label={item.fa} onRemove={() => onRemove(item.en)} color={color} />
        ))}
      </div>
    </div>
  );
};
