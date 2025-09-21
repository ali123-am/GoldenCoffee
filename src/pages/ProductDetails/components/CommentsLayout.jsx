// CommentsLayout.js
import { useContext, useState } from "react";
import CommentsList from "./CommentsList";
import ReviewModal from "./ReviewModal";
import { StarIcon } from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { UserInfoContext } from "../../../Context/UserInfoContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";

export default function CommentsLayout({
  productID,
  userName ,
  avgRating,
  total,
  mutationAddComment,
}) {
  const [showModal, setShowModal] = useState(false);
  const isLogin = useContextSelector(UserInfoContext, (ctx) => ctx.isLogin)
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 lg:gap-6 relative font-Dana">
      {total !== 0 ? (
        <>
          <div className="col-span-full md:col-span-3">
            <div className="sticky top-11 space-y-4 px-4 pb-1 pt-4">
              <div>
                <h3 className="w-fit text-lg sm:text-base lg:text-lg font-semibold">
                  امتیاز و دیدگاه کاربران
                </h3>
                <span className="bg-orange-500 h-0.5 w-1/5 inline-block"></span>
              </div>
              <span className="text-xl font-bold text-zinc-800 dark:text-gray-300">
                {avgRating.toFixed(1)}
                <span className="text-sm font-light"> از </span>
                <span className="text-sm font-light">5</span>
                <span className="lg:hidden sm:inline hidden text-sm mt-2 mr-2 font-medium text-gray-500 dark:text-gray-300">
                  ({total} نظر)
                </span>
              </span>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const progress = Math.min(Math.max(avgRating - i, 0), 1);
                  return (
                    <div key={i} className="relative w-6 h-6">
                      <StarIcon className="absolute top-0 left-0 w-6 h-6 text-gray-300 dark:text-zinc-600" />
                      {progress > 0 && (
                        <div
                          className="absolute top-0 right-0 h-6 overflow-hidden"
                          style={{ width: `${progress * 100}%` }}
                        >
                          <StarIcon className="w-6 h-6 text-amber-500" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <span className="inline sm:hidden lg:inline text-sm mt-2 text-gray-500 dark:text-gray-300">
                  ({total} نظر)
                </span>
              </div>
              <button
                onClick={() => {
                  if (!isLogin) {
                    navigate("/Auth", { state: { from: location.pathname } });
                  } else {
                    setShowModal(true);
                  }
                }}
                className="w-full mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
              >
                ثبت دیدگاه جدید
              </button>
            </div>
          </div>

          {/* بخش متغیر */}
          <div className="md:col-span-9">
            <CommentsList productID={productID} />
          </div>
        </>
      ) : (
        <div className="col-span-12 flex flex-col items-center justify-center gap-4 rounded-2xl border-dashed border py-8 border-gray-400">
          <ChatBubbleOvalLeftEllipsisIcon className="h-16 w-16 text-gray-500 animate-pulse" />
          <p className="text-lg md:text-2xl font-bold text-gray-800 dark:text-zinc-100 text-center">
            هنوز دیدگاهی ثبت نشده است
          </p>
          <p className="text-sm md:text-lg text-gray-500 dark:text-zinc-400 text-center">
            اولین نفری باشید که دیگاه خود را ثبت می‌کنید
          </p>
          <button
            onClick={() => {
              if (!isLogin) {
               navigate("/Auth", { state: { from: location.pathname } });
              } else {
                setShowModal(true);
              }
            }}
            className="w-fit mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            ثبت دیدگاه جدید
          </button>
        </div>
      )}
      {/* مودال */}
      <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(payload) => {
          mutationAddComment.mutate(payload);
          setShowModal(false);
        }}
        userName={userName}
      />
    </div>
  );
}
