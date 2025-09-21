const tabs = [
  { key: "specs", label: "ویژگی‌ها", target: "specs-section" },
  { key: "comments", label: "دیدگاه‌ها", target: "comments-section" },
  { key: "questions", label: "پرسش‌ها", target: "questions-section" },
];

export default function StickyTabs({ active, onClick }) {
  return (
    <div className="sticky top-0 bg-[#f5f3ff] dark:bg-[#272727]  border-gray-400 max-w-315 w-full 
    mx-auto text-red-500 dark:text-white z-10">
      <div className="max-w-7xl mx-auto flex gap-0 md:gap-6 px-4 pt-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onClick(tab.key)}
            className={`relative px-4 pb-3 pt-1 text-sm md:text-base transition overflow-clip cursor-pointer
               ${
                 active === tab.key
                   ? "text-amber-600 font-bold"
                   : "text-zinc-600 dark:text-zinc-300 hover:text-amber-600"
               }`}
          >
            {tab.label}
            {active === tab.key && (
              <span className="absolute inset-x-2 -bottom-[1px] h-1 rounded-full bg-amber-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
