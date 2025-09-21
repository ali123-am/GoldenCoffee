import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useStoreState from "../../stors/storeState.js"
export default function HeaderDecoration() {
  const { isDark } = useStoreState();
  return (
    <div className="w-screen hidden md:flex justify-center absolute bottom-0 z-[1]">
      <div className="w-51 flex flex-col justify-center items-center relative ">
        <div className="w-51 h-25.5 overflow-y-hidden absolute -top-26 z-10">
          <div className="border rounded-full w-51 h-51 flex justify-center items-center border-white/30">
            <div className="rounded-full w-37 h-37 border  flex justify-center items-center border-white/50">
              <div className="rounded-full block w-24 h-24 border border-white/70 "></div>
            </div>
          </div>
        </div>
        <svg 
          xmlns="public/images/curve.svg"
          alt=""
          width={100}
          height={22}
          className="border-none absolute -top-[21px]"
        >
          <path
            d="M50 0C69 0 81 22 100 22L0 22C18.75 22 31 0 50 0Z"
            fill={isDark ? "#27272A" : "#f5f3ff"}
          />
        </svg>
        <span className="z-10 rounded-full border border-orange-300 text-zinc-700 dark:text-white
            absolute -bottom-3"
        >
          <ChevronDownIcon className="w-5 h-5"></ChevronDownIcon>
        </span>
      </div>
    </div>
  );
}
