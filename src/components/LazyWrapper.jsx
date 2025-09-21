import { useInView } from "react-intersection-observer";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorHndlers/ErrorBoundary";
import LoaderDotsBetter from "./LoaderDotsBetter";

export default function LazyWrapper({ importFunc }) {
  const LazyComponent = lazy(importFunc);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-40">
                <LoaderDotsBetter />
              </div>
            }
          >
            <LazyComponent />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <div style={{ height: "300px" }} /> // فضای خالی تا لود شدن
      )}
    </div>
  );
}
