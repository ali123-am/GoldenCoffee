import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.body.scrollHeight * 0.55; // 55% از کل ارتفاع
      setVisible(scrollPosition > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-10 transition-all duration-500 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <button
        onClick={handleClick}
        className="
          flex items-center gap-2 bg-blue-500 text-white shadow-xl rounded-full  w-14 h-14
          justify-center overflow-hidden transition-transform duration-300 cursor-pointer group"
      >
        <ArrowUpCircleIcon className="w-8 h-8 group-hover:animate-bounce " />
      </button>
    </div>
  );
}
