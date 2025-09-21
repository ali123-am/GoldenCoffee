import { Outlet } from "react-router-dom";
import UseNavbar from "./components/Header/UseNavbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <UseNavbar />

      <main className="flex-1">
        <Outlet /> {/* اینجا صفحات داخلی رندر می‌شن */}
      </main>

      <Footer />
    </div>
  );
}
