import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useContextSelector } from "use-context-selector";
import {
  AddToBasketContext,
  BasketContext,
} from "./../../../Context/BasketContext";
import CartQuantityControl from "../../../components/CartQuantityControl";
import { Link } from "react-router-dom";
import LoaderDotsBetter from "../../../components/LoaderDotsBetter";
import { toast } from "sonner";
import { useComments } from "../hooks/useComments";
import { useState } from "react";

import img1 from "/images/products/p1.webp";
import img2 from "/images/products/p2.webp";
import img3 from "/images/products/p3.webp";
import img4 from "/images/products/p4.webp";

export default function Header({ product }) {
  const basketData = useContextSelector(BasketContext, (c) => c.basketData);
  // const {mutate:addToBasket,addLoading:} = useContextSelector(AddToBasketContext, (ctx) => ctx);
  const { mutate: addToBasket, loadingProducts: addLoading } =
    useContextSelector(AddToBasketContext, (ctx) => ctx);
  const infoProduct = basketData.find((p) => p.id === product?.id);
  const quantity = infoProduct ? infoProduct.count : null;
  const isLoadingThisProduct = addLoading[product.id];
  // const { comments } = useComments({page:1,limit:5});

  return (
    <main className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 p-6">
      <ProductGallery product={product} images={[img1, img2, img3, img4]} />

      {/* Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product?.productTitle}</h1>

        {/* <span className="text-sm text-gray-500 dark:text-gray-300">
          ({comments.length} نظر)
        </span> */}

        <p className="text-zinc-800 dark:text-gray-400 leading-relaxed">
          این قهوه ترکیبی متعادل از دانه‌های عربیکا و روبوستا است که طعمی قوی و
          عطری دلپذیر دارد. مناسب برای تهیه اسپرسو در دستگاه‌های خانگی و صنعتی.
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
            <div className="flex justify-between items-center">
              <CartQuantityControl product={product} />
              <Link
                to={"/Cart"}
                className="bg-amber-600 dark:bg-teal-500 text-white w-40 h-13.5 flex justify-center items-center
               rounded-xl text-lg "
              >
                سبد خرید
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => addToBasket(product?.id)}
                className="flex-1 bg-amber-600 text-white py-3 rounded-xl shadow-md
                 hover:bg-amber-700 cursor-pointer flex justify-center items-center"
              >
                {isLoadingThisProduct ? (
                  <LoaderDotsBetter color="white" />
                ) : (
                  "افزودن به سبد"
                )}
              </button>
              <button
                onClick={() =>
                  toast.info(
                    "تکمیل فرآیند خرید به شکل خرید سریع هنوز در دسترس نمی باشد."
                  )
                }
                className="flex-1 border border-amber-600 text-amber-600 py-3 rounded-xl hover:bg-amber-50"
              >
                خرید سریع
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}

import React, { useRef, useEffect } from "react";
import Slider from "react-slick";

// Arrow Components
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-3rem] top-1/2 -translate-y-1/2 w-14 h-14 flex items-center
     justify-center bg-white rounded-full shadow-lg z-20 text-3xl hover:bg-gray-200 
     transition text-black"
  >
    <ChevronLeftIcon className="w-7 h-7" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-3rem] top-1/2 -translate-y-1/2 w-14 h-14 flex items-center 
    justify-center bg-white text-black rounded-full shadow-lg z-20 text-3xl hover:bg-gray-200 transition"
  >
    <ChevronRightIcon className="w-7 h-7" />
  </button>
);

export function ProductGallery({ product, images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);

  // انتخاب خودکار اولین عکس هنگام باز شدن گالری
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // کنترل کیبورد برای اسلایدر مدال
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => {
          const next = Math.min(prev + 1, images.length - 1);
          sliderRef.current.slickGoTo(next);
          return next;
        });
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => {
          const prevIndex = Math.max(prev - 1, 0);
          sliderRef.current.slickGoTo(prevIndex);
          return prevIndex;
        });
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  const mainSliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    initialSlide: selectedIndex,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const thumbnailSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: Math.min(images.length, 5),
    slidesToScroll: 1,
    focusOnSelect: true,
    swipeToSlide: true,
  };

  return (
    <div className="flex flex-col items-center">
      {/* عکس اصلی */}
      <div
        className="bg-white dark:bg-zinc-700 rounded-2xl shadow-md p-6 flex items-center justify-center mb-4 cursor-pointer w-full max-w-[400px]"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={product?.img}
          alt={product.productTitle || "محصول"}
          className="w-full h-96 object-contain"
        />
      </div>

      <div className="w-full max-w-[400px]">
        <Slider {...{ ...thumbnailSettings, rtl: true }}>
          {images.map((img, index) => (
            <div key={index} className="px-1">
              <img
                src={img}
                alt={`تصویر ${index + 1}`}
                className={`w-20 h-20 object-contain rounded-lg cursor-pointer border-2 ${
                  selectedIndex === index
                    ? "border-blue-500 shadow-md"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedIndex(index)}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* مدال / گالری */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          {/* کانتینر سفید اصلی */}
          <div className="bg-white w-full max-w-4xl rounded-xl p-4 relative">
            {/* اسلایدر عکس بزرگ */}
            <div className="w-full mb-4 relative">
              <Slider
                {...mainSliderSettings}
                afterChange={(index) => setSelectedIndex(index)}
                ref={sliderRef}
              >
                {images.map((img, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={img}
                      alt={`تصویر ${index + 1}`}
                      className="max-h-[70vh] object-contain mx-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* نوار عکس‌های پایین */}
          </div>
          <div className=" flex flex-row-reverse bg-white rounded-xl mt-10 py-3">
            <Slider
              {...{
                dots: false,
                arrows: false,
                infinite: false,
                slidesToShow: Math.min(images.length, 6),
                slidesToScroll: 1,
                focusOnSelect: true,
                swipeToSlide: true,
                centerMode: true,
                centerPadding: "0px",
              }}
              ref={thumbRef}
            >
              {images.map((img, index) => (
                <div key={index} className="px-1">
                  <img
                    src={img}
                    alt={`تصویر ${index + 1}`}
                    className={`w-20 h-20 object-contain rounded-lg cursor-pointer border-2 ${
                      selectedIndex === index
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedIndex(index);
                      sliderRef.current.slickGoTo(index);
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}
