import Header from "../../components/Header/Header";
import LazyWrapper from "../../components/LazyWrapper";
import Products from "../../components/Products";
import ErrorBoundary from "../../components/ErrorHndlers/ErrorBoundary";
// import ContactPage from "../../components/ContactPage";
export default function MainPage() {
  return (
    <div>
      <Header />
      <main>
        <ErrorBoundary>
          <Products />
        </ErrorBoundary>
        <LazyWrapper
          importFunc={() => import("../../components/HighlightBox")}
        />
        <LazyWrapper importFunc={() => import("../../components/Categories")} />
        <LazyWrapper
          importFunc={() => import("../../components/PopularProducts")}
        />
        <LazyWrapper importFunc={() => import("../../components/PointClub")} />
        <LazyWrapper
          importFunc={() => import("../../components/Articles/Articles")}
        />
        <LazyWrapper
          importFunc={() => import("../../components/CoffeeHeroSection")}
        />
        <LazyWrapper
          importFunc={() => import("../../components/ServiceFeatures")}
        />
      </main>
    </div>
  );
}
