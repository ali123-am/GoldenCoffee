import { useState, useEffect } from "react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewModal({ isOpen, onClose, onSubmit, userName }) {
  const [textComment, setTextComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = () => {
    if (!textComment.trim()) return;
    const newComment = {
      text: textComment.trim(),
      rating,
      author: isAnonymous ? "کاربر ناشناس" : userName || "کاربر",
    };
    onSubmit(newComment);
    setTextComment("");
    setRating(5);
    setIsAnonymous(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                ثبت دیدگاه جدید
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                <XMarkIcon className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
              </button>
            </div>

            {/* Toggle نویسنده */}
            <div className="flex items-center gap-3 mb-4">
              <label className="text-zinc-700 dark:text-zinc-300 font-medium">
                ارسال با نام :
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAnonymous(false)}
                  className={`px-3 py-1 rounded-lg transition ${
                    !isAnonymous
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  {userName || "علی امینی"}
                </button>
                <button
                  onClick={() => setIsAnonymous(true)}
                  className={`px-3 py-1 rounded-lg transition ${
                    isAnonymous
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  ارسال ناشناس
                </button>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={textComment}
              onChange={(e) => setTextComment(e.target.value)}
              placeholder="نظر خود را وارد کنید..."
              className="w-full border rounded-xl p-3 mb-4 resize-none h-28 focus:ring-1
               focus:ring-amber-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white
                transition outline-0"
            />

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm mb-2 font-medium text-zinc-700 dark:text-zinc-300">
                امتیاز:
              </label>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(i + 1)}
                  >
                    <StarIcon
                      className={`w-8 h-8 cursor-pointer transition ${
                        i < rating
                          ? "text-amber-500"
                          : "text-gray-300 dark:text-zinc-600 hover:text-amber-400"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border dark:border-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                لغو
              </button>
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:from-amber-600 hover:to-amber-700 transition"
              >
                ثبت دیدگاه
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
