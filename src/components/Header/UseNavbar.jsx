import React, { lazy, Suspense, useEffect, useState } from "react";

import ErrorBoundary from "../ErrorHndlers/ErrorBoundary";
const Navbar = lazy(() => import("./NavbarDesktop/Navbar"));
const NavbarMobile = lazy(() => import("./NavbarMobile/NavbarMobile"));

export default function UseNavbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>درحال بارگذاری</p>}>
        <div>{isMobile ? <NavbarMobile /> : <Navbar />}</div>
      </Suspense>
    </ErrorBoundary>
  );
}
