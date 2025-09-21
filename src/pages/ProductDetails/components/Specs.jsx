export default function Specs({ product }) {
  return (
    <>
      <div className="w-fit">
        <h2 className="text-xl font-bold mb-0">ویژگی‌های محصول</h2>
        <span className="bg-orange-500 h-0.25 w-1/3 inline-block"></span>
      </div>
      <ul className=" mt-4 grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
        {product?.specifications?.length > 0 &&
          Object.entries(product.specifications[0]).map(([key, value]) => (
            <li
              key={key}
              className="p-3 border rounded-lg bg-gray-50 dark:bg-zinc-700"
            >
              <span className="font-semibold">{key} : </span>
              <span>{value}</span>
            </li>
          ))}
      </ul>
    </>
  );
}
