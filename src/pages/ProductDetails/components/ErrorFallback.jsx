import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ModernError({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="flex flex-col items-center gap-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 shadow-md w-full max-w-sm text-center">
        <ExclamationTriangleIcon className="w-12 h-12 text-amber-500" />
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-gray-200">
          مشکلی در دریافت کامنت‌ها رخ داد
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          اتصال به سرور برقرار نشد. لطفاً دوباره تلاش کنید.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
          >
            تلاش دوباره
          </button>
        )}
      </div>
    </div>
  );
}
