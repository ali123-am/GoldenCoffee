export default function SectionSearch({ type, value, onChange }) {
  return (
    <div className="sticky top-0 z-10 bg-gray-50 dark:bg-zinc-600 pb-2 mb-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`جستجو ${type}`}
        className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm dark:bg-zinc-700 dark:border-gray-500 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
      />
    </div>
  );
}
