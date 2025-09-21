export default function NoProductsFound({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <svg
        className="w-24 h-24 mb-4 text-gray-400 dark:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-6h6v6m-6 0h6m2 0h2a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h2"
        />
      </svg>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
        {message || "هیچ محصولی یافت نشد."}
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
        لطفاً فیلترهای خود را تغییر دهید تا محصولات بیشتری ببینید.
      </p>
    </div>
  );
}
