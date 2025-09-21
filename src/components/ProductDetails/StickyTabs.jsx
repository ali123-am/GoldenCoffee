import { useEffect, useMemo, useState } from "react";
const cls = (...xs) => xs.filter(Boolean).join(" ");
const smoothScrollToId = (id, offset = 45) => {
  const el = document.getElementById(id);
  if (!el) return;

  // موقعیت عمودی المنت نسبت به صفحه
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;

  // محاسبه موقعیت با offset
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
const useScrollSpy = (
  ids,
  offset = 45 // چند پیکسل قبل از رسیدن سکشن فعال بشه
) => {
  const [active, setActive] = useState(ids?.[0] || null);

  useEffect(() => {
    const onScroll = () => {
      let current = ids?.[0] || null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;

        // وقتی بالای سکشن از offset رد شد، اون سکشن active میشه
        if (top - offset <= 0) {
          current = id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // بار اول هم اجرا بشه
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return active;
};
export default function StickyTabs({ active, onClick }) {
  const items = useMemo(
    () => [
      { id: "specs", label: "مشخصات" },
      { id: "comments", label: "دیدگاه‌ها" },
      { id: "questions", label: "پرسش‌ها" },
    ],
    []
  );

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => onClick?.(it.id)}
              className={cls(
                "relative px-4 py-3 text-sm md:text-base transition",
                active === it.id
                  ? "text-amber-600 font-bold"
                  : "text-zinc-600 dark:text-zinc-300 hover:text-amber-600"
              )}
            >
              {it.label}
              {active === it.id && (
                <span className="absolute inset-x-3 -bottom-[1px] h-[3px] rounded-full bg-amber-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
