// CommentsList.js
import { useContext, useRef, useState } from "react";
import { useComments } from "../hooks/useComments";
import LoaderDotsBetter from "../../../components/LoaderDotsBetter";
import { persianMonths, toJalali } from "../../../Hooks/useCalendar";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { StarIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import ErrorFallback from "./ErrorFallback";
import ReviewModal from "./ReviewModal";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../../Context/UserInfoContext";
import { useContextSelector } from "use-context-selector";

export default function CommentsList({ productID }) {
  const [page, setPage] = useState(1);
  const limit = 5;
  // const [userReactions, setUserReactions] = useState(null);
  const commentsRef = useRef(null);
  const navigate = useNavigate();
  const isLogin = useContextSelector(UserInfoContext, (ctx) => ctx.isLogin);
  const {
    comments,
    totalPages,
    isLoading,
    isError,
    showPageLoading,
    mutationReact,
    userReactions,
  } = useComments({ page, limit, userID: 6, productID });

  // تابع برای اسکرول
  const scrollToTop = () => {
    if (commentsRef.current) {
      const top =
        commentsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 45, behavior: "smooth" }); // 20px بیشتر
    }
  };
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 4;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };
  const pageNumbers = generatePageNumbers();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-100 py-40">
        <LoaderDotsBetter size={8} />
      </div>
    );
  }

  if (isError) return <ErrorFallback />;

  return (
    <>
      <div
        ref={commentsRef}
        className="md:col-span-9 divide-y-1 divide-gray-400/80 dark:divide-gray-500/80"
      >
        {showPageLoading
          ? Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="py-7 px-5 animate-pulse">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-zinc-600 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <div className="w-32 h-4 bg-gray-300 dark:bg-zinc-600 rounded" />
                      <div className="w-20 h-3 bg-gray-200 dark:bg-zinc-500 rounded" />
                    </div>
                  </div>
                  <div className="w-24 h-3 bg-gray-300 dark:bg-zinc-600 rounded" />
                </div>
                <div className="w-full h-4 bg-gray-200 dark:bg-zinc-500 rounded mb-2" />
                <div className="w-full h-4 bg-gray-200 dark:bg-zinc-500 rounded mb-2" />
                <div className="w-3/4 h-4 bg-gray-200 dark:bg-zinc-500 rounded" />
              </div>
            ))
          : comments.map((c) => {
              const date = new Date(c.created_at);
              const { year, month, day } = toJalali(
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
              );

              return (
                <div key={c.id} className="py-7 px-5 transition duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="w-12 h-12 text-gray-400 dark:text-zinc-500" />
                      <div className="flex flex-col">
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {c.author || "کاربر ناشناس"}
                        </p>
                        <span className="text-xs text-gray-400 dark:text-zinc-500" />
                      </div>
                    </div>
                    <div className="text-sm sm:text-base text-zinc-500 dark:text-gray-300">
                      {day} {persianMonths[month - 1]} {year}
                    </div>
                  </div>

                  <p className="text-zinc-800 dark:text-white my-7 w-fit break-word">
                    {c.text}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const progress = Math.min(Math.max(c.rating - i, 0), 1);
                        return (
                          <div key={i} className="relative w-5 h-5">
                            <StarIcon className="w-5 h-5 text-gray-300 dark:text-zinc-600" />
                            <div
                              className="absolute top-0 left-0 h-full overflow-hidden"
                              style={{ width: `${progress * 100}%` }}
                            >
                              <StarIcon className="w-5 h-5 text-amber-400" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <button
                        onClick={() => {
                          if (!isLogin)
                            return navigate("/Auth", {
                              state: { from: location.pathname },
                            });
                          mutationReact.mutate({
                            commentID: c.id,
                            type: "like",
                          });
                        }}
                        className={`flex items-center gap-1 cursor-pointer transition ${
                          userReactions[c.id] === "like"
                            ? "text-green-500 scale-110"
                            : "text-gray-400 hover:scale-110"
                        }`}
                      >
                        <HandThumbUpIcon className="w-5 h-5" /> {c.likes || 0}
                      </button>

                      <button
                        onClick={() => {
                          if (!isLogin)
                            return navigate("/Auth", {
                              state: { from: location.pathname },
                            });
                          mutationReact.mutate({
                            commentID: c.id,
                            type: "dislike",
                          });
                        }}
                        className={`flex items-center gap-1 cursor-pointer transition ${
                          userReactions[c.id] === "dislike"
                            ? "text-red-500 scale-110"
                            : "text-gray-400 hover:scale-110"
                        }`}
                      >
                        <HandThumbDownIcon className="w-5 h-5" />{" "}
                        {c.dislikes || 0}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Pagination */}
      {comments.length !== 0 && (
        <div className="flex gap-2 mt-8 justify-center">
          <button
            onClick={() => {
              scrollToTop();
              setPage((p) => Math.max(p - 1, 1));
            }}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 disabled:opacity-50
             hover:bg-gray-300 dark:hover:bg-zinc-600 transition cursor-pointer"
          >
            قبلی
          </button>
          {pageNumbers.map((num, idx) =>
            num === "..." ? (
              <span key={idx} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => {
                  scrollToTop();
                  setPage(num);
                }}
                className={`px-3 py-1 rounded cursor-pointer ${
                  num === page
                    ? "bg-amber-500 text-white"
                    : "bg-gray-200 dark:bg-zinc-700"
                }`}
              >
                {num}
              </button>
            )
          )}

          <button
            onClick={() => {
              scrollToTop();
              setPage((p) => Math.min(p + 1, totalPages));
            }}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 disabled:opacity-50 
            hover:bg-gray-300 dark:hover:bg-zinc-600 transition cursor-pointer"
          >
            بعدی
          </button>
        </div>
      )}
    </>
  );
}
