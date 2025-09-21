import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  lazy,
  useContext,
} from "react";
import { useParams, useLocation } from "react-router-dom";
import LoaderDotsBetter from "../../components/LoaderDotsBetter";
import Header from "./components/Header";
import StickyTabs from "./components/StickyTabs";
import useScrollSpy from "../../Hooks/useScrollSpy";
import { ProductsContext } from "../../Context/ProductsContext";
import { useComments } from "./hooks/useComments";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { UserInfoContext } from "../../Context/UserInfoContext";
import { useContextSelector } from "use-context-selector";

// Lazy imports
const Specs = lazy(() => import("./components/Specs"));
const CommentsLayout = lazy(() => import("./components/CommentsLayout")); // 👈 بازنویسی Comments
const Questions = lazy(() => import("./components/Questions"));
// const RelatedProducts = lazy(() => import("./components/RelatedProducts"));
const PopularProducts = lazy(() => import("../../components/PopularProducts"));
const Footer = lazy(() => import("../../components/Footer"));

// Smooth scroll
const smoothScrollToId = (id, offset = 35) => {
  const el = document.getElementById(id);
  if (!el) return;
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { products } = useContext(ProductsContext);
  const { avgRating, total, mutationAddComment } = useComments({
    page: 1,
    limit: 5,
    productID: id,
  });
  const [product, setProduct] = useState(() =>
    products.find((item) => item.id == id)
  );
  const [questions, setQuestions] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Tabs
  const tabIds = useMemo(() => ["specs", "comments", "questions"], []);
  const activeTab = useScrollSpy(tabIds);
  const userName = useContextSelector(UserInfoContext, (ctx) => ctx.userName);

  const handleTabClick = useCallback((id) => {
    smoothScrollToId(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  // Hash scroll on mount
  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash && tabIds.includes(hash)) {
      setTimeout(() => smoothScrollToId(hash), 0);
    }
  }, [location.hash, tabIds]);

  // Loader for not-found product
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderDotsBetter />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20  md:mt-30 font-Dana text-zinc-800 dark:text-white">
      {/* Header */}
      <Header product={product} />
      <ScrollToTopButton />
      <div id="details-section" className="relative">
        <StickyTabs active={activeTab} onClick={handleTabClick} />

        {/* Specs */}
        <Section id="specs">
          <Specs product={product} />
        </Section>

        {/* Comments (لیوت ثابت + لیست جداگانه) */}
        <Section id="comments">
          <CommentsLayout
            productID={product.id}
            avgRating={avgRating}
            userName={userName}
            total={total}
            mutationAddComment={mutationAddComment}
          />
        </Section>

        {/* Questions */}
        <Section id="questions">
          <Questions questions={questions} setQuestions={setQuestions} />
        </Section>
      </div>

      <Section padding={0}>
        <PopularProducts />
      </Section>
    </div>
  );
}

/* Helper wrapper for lazy sections */
function Section({ id, children, padding = 24 }) {
  return (
    <section
      id={id}
      className="max-w-7xl mx-auto scroll-mt-24"
      style={{
        padding: `${padding}px`,
      }}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <LoaderDotsBetter />
          </div>
        }
      >
        {children}
      </Suspense>
    </section>
  );
}
