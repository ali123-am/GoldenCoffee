import axios from "axios";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams, useLocation } from "react-router-dom";
import UseNavbar from "../Header/UseNavbar";
import Footer from "../Footer";
import PopularProducts from "../PopularProducts";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  RemoveFromBasketContext,
  IncreaseProductContext,
  DecreaseProductContext,
} from "../../Context/BasketContext";
import { useContextSelector } from "use-context-selector";
import { AddToBasketContext, BasketContext } from "../../Context/BasketContext";

/* ------------------------------ Utilities ------------------------------ */

const cls = (...xs) => xs.filter(Boolean).join(" ");

const smoothScrollToId = (id, offset = 45) => {
  const el = document.getElementById(id);
  if (!el) return;
  
  // موقعیت عمودی المنت نسبت به صفحه
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  
  // محاسبه موقعیت با offset
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};
const useScrollSpy = (
  ids,
  offset = 45 // چند پیکسل قبل از رسیدن سکشن فعال بشه
) => {
  const [active, setActive] = useState(ids?.[0] || null);

  useEffect(() => {
    const onScroll = () => {
      let current = ids?.[0] || null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;

        // وقتی بالای سکشن از offset رد شد، اون سکشن active میشه
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
};

async function aiSummarizeReviews(comments = []) {
  const texts = comments.map((c) => c.text).filter(Boolean);
  if (texts.length === 0) return null;

  // 1) بک‌اند خودت (ترجیحی برای امنیت کلید)
  try {
    // TODO: روی سرور routeی شبیه این بساز: POST /api/reviews/summary {texts:string[]}
    const r = await fetch("/api/reviews/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts }),
    });
    if (r.ok) {
      const data = await r.json();
      if (data?.summary) return data.summary;
    }
  } catch {}

  // 2) مستقیم OpenAI (اگر واقعا مجبور شدی – ترجیحا نکن!)
  try {
    // EXPECT: Vite/CRA => import.meta.env / process.env
    const key =
      import.meta?.env?.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    if (key) {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a Persian assistant. Summarize user product reviews briefly in Persian with 2-3 bullets. Emphasize pros/cons and sentiment.",
            },
            {
              role: "user",
              content:
                "خلاصه‌ی تحلیلی و فشرده از این نظرات بنویس (۲ تا ۳ بولت):\n" +
                texts.map((t, i) => `${i + 1}. ${t}`).join("\n"),
            },
          ],
          temperature: 0.3,
          max_tokens: 160,
        }),
      });
      if (r.ok) {
        const data = await r.json();
        const content = data?.choices?.[0]?.message?.content?.trim();
        if (content) return content;
      }
    }
  } catch {}

  // 3) Fallback ساده (بدون AI)
  const joined = texts.join(" ").toLowerCase();
  const pros = [];
  const cons = [];
  if (/(عطر|بو|رایحه)/.test(joined))
    pros.push("عطر و رایحه برای بسیاری از خریداران مطلوب بوده است.");
  if (/(طعم|مزه|غلیظ|اسپرسو)/.test(joined))
    pros.push("طعم/غلظت قهوه مورد توجه کاربران قرار گرفته است.");
  if (/(بسته|ارسال|تاخیر|معیوب)/.test(joined))
    cons.push("چند مورد نارضایتی از بسته‌بندی یا زمان ارسال گزارش شده است.");
  const lines = [];
  if (pros.length) lines.push("✅ نقاط قوت: " + pros.join("، "));
  if (cons.length) lines.push("⚠️ نقاط قابل بهبود: " + cons.join("، "));
  if (!lines.length) lines.push("ارزیابی کلی مثبت و مطابق انتظار کاربران است.");
  return lines.join("\n");
}
/* ------------------------------ Review Modal ------------------------------ */
function ReviewModal({ open, onClose, onSubmit }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(4);

  useEffect(() => {
    if (open) {
      setText("");
      setRating(4);
    }
  }, [open]);

  if (!open) return null;

  // Esc to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className="absolute left-1/2 top-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200/70 dark:border-zinc-700">
          <h3 className="text-lg font-bold">ثبت دیدگاه شما</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <label className="block text-sm">امتیاز شما</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className={cls(
                  "px-3 py-1 rounded-full border",
                  rating >= n
                    ? "bg-amber-500 text-white border-amber-500"
                    : "border-zinc-300 dark:border-zinc-600"
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <textarea
            rows={5}
            className="w-full rounded-xl border border-zinc-300 dark:border-zinc-600 p-3 outline-none focus:ring-2 focus:ring-amber-500/60"
            placeholder="تجربه‌ات از این محصول را بنویس..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600"
            >
              انصراف
            </button>
            <button
              onClick={() => {
                if (!text.trim()) return;
                onSubmit?.({
                  text: text.trim(),
                  rating,
                  date: new Date().toLocaleString("fa-IR"),
                });
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700"
            >
              ثبت دیدگاه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ------------------------------ Sticky Tabs ------------------------------ */
function StickyTabs({ active, onClick }) {
  const items = useMemo(
    () => [
      { id: "specs", label: "مشخصات" },
      { id: "comments", label: "دیدگاه‌ها" },
      { id: "questions", label: "پرسش‌ها" },
    ],
    []
  );

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => onClick?.(it.id)}
              className={cls(
                "relative px-4 py-3 text-sm md:text-base transition",
                active === it.id
                  ? "text-amber-600 font-bold"
                  : "text-zinc-600 dark:text-zinc-300 hover:text-amber-600"
              )}
            >
              {it.label}
              {active === it.id && (
                <span className="absolute inset-x-3 -bottom-[1px] h-[3px] rounded-full bg-amber-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
/* ------------------------------ Main Page ------------------------------ */
export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const addToBasket = useContextSelector(AddToBasketContext, (ctx) => ctx);
  const basketData = useContextSelector(BasketContext, (c) => c.basketData);
  const removeFromBasket = useContextSelector(
    RemoveFromBasketContext,
    (ctx) => ctx
  );
  const increaseMutate = useContextSelector(
    IncreaseProductContext,
    (ctx) => ctx
  );
  const decreaseMutate = useContextSelector(
    DecreaseProductContext,
    (ctx) => ctx
  );

  // Q&A + Comments
  const [comments, setComments] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Modal
  const [showReviewModal, setShowReviewModal] = useState(false);

  // AI Summary
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Related (placeholder)
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await axios.get(
        `https://67b48d6b392f4aa94fab58e9.mockapi.io/Products/${id}`
      );
      if (cancelled) return;
      setProduct(res.data);
      // TODO: در صورت داشتن API برای دیدگاه‌ها/سوالات، اینجا fetch کن
      setComments([]); // ← جایگزین با داده‌های واقعی
      setQuestions([]);
      setRelatedProducts([]); // ← محصولات پیشنهادی
    })();
    return () => (cancelled = true);
  }, [id]);

  // Basket qty
  useEffect(() => {
    const infoProduct = basketData.find((p) => p.id === product?.id);
    setQuantity(infoProduct ? infoProduct.count : null);
  }, [basketData, product]);

  // AI summary when comments change
  useEffect(() => {
    let cancelled = false;
    if (!comments.length) {
      setSummary(null);
      return;
    }
    setSummaryLoading(true);
    aiSummarizeReviews(comments)
      .then((s) => !cancelled && setSummary(s))
      .finally(() => !cancelled && setSummaryLoading(false));
    return () => (cancelled = true);
  }, [comments]);

  // Tabs / ScrollSpy
  const tabIds = useMemo(() => ["specs", "comments", "questions"], []);
  const activeTab = useScrollSpy(tabIds);
  const handleTabClick = useCallback((id) => {
    smoothScrollToId(id);
    // hash sync (اختیاری)
    history.replaceState(null, "", `#${id}`);
  }, []);

  // Handle hash on mount
  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash && tabIds.includes(hash)) {
      setTimeout(() => smoothScrollToId(hash), 0);
    }
  }, [location.hash, tabIds]);

  if (!product) {
    return (
      <p
        className="w-full h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white
       text-center pt-36"
      >
        Loading…
      </p>
    );
  }

  return (
    <div className="min-h-screen mt-24 font-Dana text-zinc-800 dark:text-white">
      <UseNavbar />

      {/* Header (hero) */}
      <main className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 p-6">
        {/* Image */}
        <div className="bg-white dark:bg-zinc-700 rounded-2xl shadow-md p-6 flex items-center justify-center">
          <img
            src={product?.img}
            alt={product?.productTitle || "محصول"}
            className="w-80 h-80 object-contain"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product?.productTitle}</h1>

          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-800 dark:text-gray-400">
              (۴۲ نظر)
            </span>
          </div>

          <p className="text-zinc-800 dark:text-gray-400 leading-relaxed">
            این قهوه ترکیبی متعادل از دانه‌های عربیکا و روبوستا است که طعمی قوی
            و عطری دلپذیر دارد. مناسب برای تهیه اسپرسو در دستگاه‌های خانگی و
            صنعتی.
          </p>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-amber-600 dark:text-teal-500">
              {(product?.price - product?.offer).toLocaleString("en-US")} تومان
            </span>
            {product?.offer ? (
              <span className="line-through text-gray-400">
                {product?.price.toLocaleString("en-US")} تومان
              </span>
            ) : null}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 font-Dana">
            {product?.count > 0 ? (
              <span className="text-green-600 dark:text-emerald-500 text-lg flex gap-2 items-center">
                <CheckCircleIcon className="w-6 h-6" />
                موجود در انبار | ارسال سریع
              </span>
            ) : (
              <span className="text-red-400 font-semibold text-xl flex gap-2 items-center bg-red-300/20 py-3 px-8 rounded-xl">
                <InformationCircleIcon className="w-6 h-6" />
                فعلاً موجود نیست
              </span>
            )}
          </div>

          {/* Basket controls */}
          {product?.count > 0 &&
            (quantity ? (
              <div className="w-40 flex justify-evenly items-center shadow-normal text-orange-300 h-12 rounded-full border-2 border-orange-300/50 dark:text-brown-300/90 dark:border-brown-300/70">
                <PlusIcon
                  onClick={() => increaseMutate(product.id)}
                  className={cls(
                    "w-6 h-6 cursor-pointer",
                    quantity === product?.count &&
                      "pointer-events-none text-gray-500"
                  )}
                />
                <span className="text-xl font-medium select-none">
                  {quantity}
                </span>
                {quantity === 1 ? (
                  <TrashIcon
                    onClick={() => {
                      removeFromBasket(product.id);
                    }}
                    className="w-6 h-6 cursor-pointer"
                  />
                ) : (
                  <MinusIcon
                    onClick={() => decreaseMutate(product.id)}
                    className="w-6 h-6 cursor-pointer"
                  />
                )}
              </div>
            ) : (
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => addToBasket(product?.id)}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-xl shadow-md hover:bg-amber-700"
                >
                  افزودن به سبد
                </button>
                <button className="flex-1 border border-amber-600 text-amber-600 py-3 rounded-xl hover:bg-amber-50">
                  خرید سریع
                </button>
              </div>
            ))}
        </div>
      </main>

      
      <div id="details-section" className="relative">
        <div className="sticky top-0 bg-white z-10">
          <StickyTabs active={activeTab} onClick={handleTabClick}/>
        </div>
        {/* Specs */}
        <section
          id="specs"
          data-tab="specs"
          className="max-w-7xl mx-auto p-6 scroll-mt-24"
        >
          <h2 className="text-xl font-bold mb-4">ویژگی‌های محصول</h2>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
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
        </section>

        {/* Comments */}
        <section
          id="comments"
          data-tab="comments"
          className="max-w-7xl mx-auto p-6 scroll-mt-24"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">دیدگاه‌های کاربران</h2>
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
            >
              ثبت دیدگاه
            </button>
          </div>

          {/* AI summary panel */}
          <div className="rounded-xl border bg-gray-50 dark:bg-zinc-800/60 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="font-bold">خلاصه دیدگاه‌ها (توسط هوش مصنوعی)</div>
              {summaryLoading && (
                <span className="text-xs text-zinc-500">در حال تحلیل…</span>
              )}
            </div>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              {summary || "هنوز دیدگاهی ثبت نشده است."}
            </p>
          </div>

          {/* List */}
          {comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-3 border rounded-lg bg-gray-50 dark:bg-zinc-700"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm">
                      امتیاز: {"⭐".repeat(c.rating || 4)}
                    </div>
                    <span className="text-xs text-gray-500">{c.date}</span>
                  </div>
                  <p className="text-gray-800 dark:text-white">{c.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">هنوز نظری ثبت نشده است.</p>
          )}
        </section>

        {/* Q&A */}
        <section
          id="questions"
          data-tab="questions"
          className="max-w-7xl mx-auto p-6 scroll-mt-24"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">پرسش و پاسخ</h2>
            <AskInline onAdd={(q) => setQuestions((s) => [q, ...s])} />
          </div>

          {questions.length > 0 ? (
            <div className="space-y-3">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-3 border rounded-lg bg-gray-50 dark:bg-zinc-700"
                >
                  <p className="font-medium">❓ {q.question}</p>
                  {q.answer ? (
                    <p className="text-green-700 mt-1">💬 {q.answer}</p>
                  ) : (
                    <p className="text-gray-400 mt-1">در انتظار پاسخ…</p>
                  )}
                  <span className="text-xs text-gray-500">{q.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">هنوز سوالی ثبت نشده است.</p>
          )}
        </section>
      </div>

      
      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto p-6">
          <h2 className="text-xl font-bold mb-4">محصولات پیشنهادی</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={rp.img}
                  alt={rp.productTitle}
                  className="w-32 h-32 object-contain"
                />
                <h3 className="mt-2 text-sm text-gray-700">
                  {rp.productTitle}
                </h3>
                <span className="text-amber-600 font-bold">
                  {rp.price.toLocaleString("en-US")} تومان
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mb-10">
        <PopularProducts />
      </div>
      <Footer />

      {/* Review Modal */}
      <ReviewModal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={(payload) => {
          // TODO: اگر API داری، اینجا POST کن؛ بعد state را sync کن
          const newItem = { id: Date.now(), ...payload };
          setComments((s) => [newItem, ...s]);
        }}
      />
    </div>
  );
}
/* ------------------------- Inline Ask (Q&A composer) ------------------------- */
function AskInline({ onAdd }) {
  const [newQuestion, setNewQuestion] = useState("");
  return (
    <div className="flex gap-2 w-full md:w-2/3">
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="سوال خود را وارد کنید..."
        className="flex-1 border rounded-lg p-2 text-gray-700 dark:text-white dark:bg-zinc-800 dark:border-zinc-700"
      />
      <button
        onClick={() => {
          if (!newQuestion.trim()) return;
          const newQ = {
            id: Date.now(),
            question: newQuestion.trim(),
            answer: null,
            date: new Date().toLocaleString("fa-IR"),
          };
          onAdd?.(newQ);
          setNewQuestion("");
        }}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
      >
        ارسال
      </button>
    </div>
  );
}