import HeroTextSection from "./HeroTextSection";
import HeaderDecoration from "./HeaderDecoration";
import ErrorBoundary from "../ErrorHndlers/ErrorBoundary";
import UseNavbar from "./UseNavbar";

export default function Header() {
  return (
    <div
      className="bg-[url(./../public/images/headerBgMobile.webp)] bg-cover bg-center bg-no-repeat
        w-screen md:bg-[url(./../public/images/headerBgDesktop.webp)] xs:aspect[2/1]  h-50 xs:h-70
        md:h-170 lg:h-screen flex mt-15 md:mt-0 z-30 static md:relative"
    >
      <HeroTextSection />
      <HeaderDecoration />
    </div>
  );
}
