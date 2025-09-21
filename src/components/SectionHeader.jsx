import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
export default function SectionHeader({
  title,
  describe = "",
  linkTitle = [],
  href=""
}) {
  return (
    <div className="w-full flex items-center justify-between px-0 sm:px-2">
      <div className="text-zinc-800 dark:text-white space-y-2">
        <h2 className="font-MorabbaMedium font-medium text-2xl sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {describe && (
          <span className="font-Dana font-light md:text-lg text-sm sm:text-xl">
            {describe}
          </span>
        )}
      </div>
      <Link  to={href}
        className="text-orange-300 flex items-center justify-center gap-1 p-3 bg-transparent
            hover:bg-orange-200/30 rounded-xl">
        <span className="font-Dana font-normal text-base sm:text-lg md:text-xl tracking-tightest">
          {linkTitle[0]}
        </span>
        <span className="hidden sm:inline font-Dana font-normal text-base sm:text-lg md:text-xl">
          {linkTitle[1]}
        </span>
        <ChevronLeftIcon className="w-5 h-5" />
      </Link>
    </div>
  );
}
