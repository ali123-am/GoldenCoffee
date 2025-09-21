import { XCircleIcon} from "@heroicons/react/24/outline";
export default function Header({ setShowSort }) {
  return (
    <div
      className="flex justify-between items-center px-4 sm:px-8 py-7 border-b 
        border-gray-300 dark:border-zinc-700 bg-gray-300/90 dark:bg-gray-600/90"
    >
      <h2 className="font-DanaDemiBold text-2xl">مرتب سازی بر اساس</h2>
      <XCircleIcon
        onClick={() => setShowSort(false)}
        className="w-8 h-8 cursor-pointer"
      />
    </div>
  );
}
