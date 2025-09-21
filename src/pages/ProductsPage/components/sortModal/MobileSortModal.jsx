import Header from "./Header";
import { OptionSort } from "./OptionSort";
import { useUI } from "../../context/UIContext";

export default function MobileSortModal() {
  const { setShowSort } = useUI();

  return (
    <div
      onClick={() => setShowSort(false)}
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end md:hidden 
      font-DanaDemiBold"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-700 w-full rounded-t-2xl overflow-hidden text-xl "
      >
        <Header setShowSort={setShowSort} />
        <OptionSort setShowSort={setShowSort} />
      </div>
    </div>
  );
}
