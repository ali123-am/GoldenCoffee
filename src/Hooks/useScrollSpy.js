// src/hooks/useScrollSpy.js
import { useEffect, useState } from "react";

export default function useScrollSpy(ids, offset = 45) {
  const [active, setActive] = useState(ids?.[0] || null);

  useEffect(() => {
    const onScroll = () => {
      let current = ids?.[0] || null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // بار اول هم اجرا بشه
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return active;
}
