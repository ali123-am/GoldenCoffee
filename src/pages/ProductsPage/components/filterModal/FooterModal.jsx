import { useFilteredProducts } from "./../../hooks/useFilteredProducts";
import DeleteAllFilterBtn from "./DeleteAllFilterBtn";

export default function FooterModal() {
  const filteredProducts = useFilteredProducts();
  return (
    <div
      className="fixed bottom-0 flex w-full justify-evenly border-t border-gray-200
       dark:border-gray-500 px-4  gap-5 bg-white dark:bg-zinc-700 h-1/9 py-4"
    >
      <div
        className=" bg-green-500 text-white flex items-center
          justify-center gap-1 p-3 rounded-lg w-1/2 cursor-pointer"
      >
        <span>مشاهده</span>
        <span>{filteredProducts.length}</span>
        <span>محصول</span>
      </div>
      <DeleteAllFilterBtn />
    </div>
  );
}
