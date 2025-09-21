import React from "react";

export default function NotBuilding() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="max-w-md w-full text-center rounded-2xl bg-white dark:bg-zinc-700
       shadow-lg p-8 dark:text-white font-Dana">
        {/* Heroicon: Document Text (outline) - inline SVG */}
        <div className="mx-auto h-24 w-24 rounded-full bg-indigo-50 dark:bg-gray-400 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 3h7.25a2.25 2.25 0 0 1 2.25 2.25V18.75A2.25 2.25 0 0 1 14.75 21H7.5A2.25 2.25 0 0 1 5.25 18.75V5.25A2.25 2.25 0 0 1 7.5 3z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5h6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-semibol">
          صفحه هنوز ساخته نشده
        </h1>
        <p className="mt-2 text-sm">
          این صفحه هنوز در دست ساخت است. لطفاً بعداً دوباره چک کنید یا به صفحهٔ
          اصلی بازگردید.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-indigo-600  text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          >
            {/* Heroicon: Arrow Left (outline) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            بازگشت
          </button>

          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 border border-gray-200 text-sm "
          >
            {/* Heroicon: Home (outline) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9.75L12 3l9 6.75V20.25A1.5 1.5 0 0 1 19.5 21.75H4.5A1.5 1.5 0 0 1 3 20.25V9.75z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 21.75V12.75h6v9"
              />
            </svg>
            صفحهٔ اصلی
          </a>
        </div>
      </div>
    </div>
  );
}
