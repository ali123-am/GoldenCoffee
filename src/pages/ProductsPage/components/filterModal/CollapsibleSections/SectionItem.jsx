export default function SectionItem({ item, state, setState, paramKey, updateParam }) {
  const isChecked = state.some((i) => i.en === item.en);

  const handleChange = () => {
    updateParam(paramKey, item.en, { append: true });
    setState((prev) =>
      isChecked ? prev.filter((i) => i.en !== item.en) : [...prev, item]
    );
  };

  return (
    <label className="flex items-center justify-between w-full text-right py-3 mb-1 cursor-pointer
     transition-all">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="w-5 h-5 text-cyan-500 border-gray-300 rounded focus:ring-cyan-400
         dark:bg-zinc-700 dark:border-gray-500"
      />
      <span className="flex-1 mx-3 text-right text-sm text-zinc-800 font-DanaMedium
       dark:text-white">
        {item.fa}
      </span>
      <span className="text-left text-sm font-medium text-gray-500 dark:text-gray-300 font-sans">
        {item.en}
      </span>
    </label>
  );
}
