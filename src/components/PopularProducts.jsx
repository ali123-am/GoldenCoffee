import Product from "./Product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useContext, useRef, useMemo } from "react";
import "slick-carousel/slick/slick-theme.css";
import { ProductsContext } from "../Context/ProductsContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function PopularProducts() {
  const sliderRef = useRef(null);
  const { products } = useContext(ProductsContext);
  const popularProducts = useMemo(() => {
    return products.filter((product) => product.count > 1);
  }, [products]);

  if (popularProducts.length === 0) {
    return <div className="text-center py-10">هیچ محصول پر فروشی یافت نشد</div>;
  }

  // تنظیمات اسلایدر

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="max-w-315 mx-auto mt-10 sm:mt-12 md:mt-20 px-4 xl:px-0">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-MorabbaMedium font-medium text-2xl xs:text-4xl md:text-5xl text-zinc-800 dark:text-white">
            محصولات پر فروش
          </h2>
          <span className="font-MorabbaLight font-light text-lg xs:text-xl md:text-3xl text-zinc-800 dark:text-white">
            پیشنهاد قهوه‌خورها ...
          </span>
        </div>
        <div className="flex gap-3 xs:gap-4.5">
          <button
            onClick={handleNext}
            className="w-9 h-9 xs:w-11 xs:h-11 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-white dark:hover:text-zinc-800 transition-colors flex justify-center items-center"
          >
            <ChevronRightIcon className="w-5 h-5 xs:w-6.5 xs:h-6.5" />
          </button>
          <button
            onClick={handlePrev}
            className="w-9 h-9 xs:w-11 xs:h-11 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-white dark:hover:text-zinc-800 transition-colors flex justify-center items-center"
          >
            <ChevronLeftIcon className="w-5 h-5 xs:w-6.5 xs:h-6.5" />
          </button>
        </div>
      </div>

      <div
        className="xl:w-315 lg:w-235 sm:w-155 w-80 mx-auto mt-5 sm:mt-12"
        onMouseDown={(e) => e.currentTarget.classList.add("cursor-grabbing")}
        onMouseUp={(e) => e.currentTarget.classList.remove("cursor-grabbing")}
        onMouseLeave={(e) =>e.currentTarget.classList.remove("cursor-grabbing")}
      >
        <Slider {...settings} ref={sliderRef} className="mt-5 sm:mt-12">
          {popularProducts.map((product, index) => (
            <div key={index * Math.random()} className="px-2">
              <div className="w-full h-116.75">
                <Product product={product} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
