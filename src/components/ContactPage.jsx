import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Footer from "./Footer";
import UseNavbar from "./Header/UseNavbar";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "چطور می‌تونم سفارش خودم رو ثبت کنم؟",
      a: "خیلی راحت! محصولات رو به سبد خرید اضافه کنید و مراحل پرداخت رو انجام بدید.",
    },
    {
      q: "مدت زمان ارسال سفارش چقدره؟",
      a: "ارسال سفارش‌ها معمولاً بین ۲ تا ۴ روز کاری طول می‌کشه.",
    },
    {
      q: "آیا امکان پرداخت در محل وجود داره؟",
      a: "بله، برای تهران و برخی شهرهای بزرگ امکان پرداخت در محل فراهمه.",
    },
    {
      q: "امکان بازگشت کالا وجود داره؟",
      a: "بله، در صورت آسیب‌دیدگی یا مشکل، می‌تونید تا ۷ روز مرجوع کنید.",
    },
    {
      q: "آیا می‌تونم آسیاب قهوه رو به دلخواه انتخاب کنم؟",
      a: "بله، هنگام ثبت سفارش می‌تونید درجه آسیاب موردنظر رو انتخاب کنید.",
    },
    {
      q: "آیا محصولات شما ضمانت اصالت دارن؟",
      a: "صد درصد! تمام محصولات ما با ضمانت اصالت عرضه می‌شن.",
    },
  ];

  return (
    <div className="min-h-screen font-Dana antialiased text-zinc-800 dark:text-white ">
      <div
        className="bg-[url(./../public/images/Rustic_Coffee_Delights.webp)] w-full 
        bg-cover bg-button  bg-no-repeat xs:aspect[2/1] h-50 xs:h-70
        md:h-170 lg:h-screen flex items-center justify-center mt-15 md:mt-0 z-30 "
      >
        <div className="text-white font-DanaDemiBold flex justify-center items-center flex-col gap-2 md:gap-5">
          <h2 className="text-4xl md:text-6xl">تماس با ما </h2>
          <div className="flex justify-center items-center gap-2 text-sm md:text-xl">
            <Link to={"/"} className="text-gray-300/80">خانه</Link>
            <span>/</span>
            <span>تماس با ما</span>
          </div>
        </div>
      </div>
      <main
        className="w-[95%] md:w-[80%] lg:w-[75%] mx-auto bg-white dark:bg-zinc-700
       rounded-2xl mt-5 md:mt-20  border-y-4 border-orange-300 text-zinc-800 dark:text-white
       shadow-xl overflow-hidden"
      >
        {/* Header */}
        <header className="bg-gradient-to-r pt-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            ارتباط با ما
          </h1>
          <p className="mt-2 text-lg text-gray-400 dark:text-amber-200">
            خوشحال می‌شویم با ما در تماس باشید
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-17 space-y-16">
          {/* Contact Info */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-10">راه‌های ارتباطی</h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div
                className="border flex flex-col items-center justify-center py-8 rounded-2xl 
              hover:shadow-lg transition border-gray-400"
              >
                <MapPinIcon className="h-10 w-10 mb-4" />
                <p className="text-gray-400 break-words p-2 dark:text-gray-300">
                  تهران، خیابان ولیعصر، کوچه قهوه‌دوست
                </p>
              </div>
              <div
                className="border flex flex-col items-center justify-center py-8  rounded-2xl 
               hover:shadow-lg transition border-gray-400"
              >
                <PhoneIcon className="h-10 w-10 mb-4" />
                <p className="text-gray-400 break-words p-2 dark:text-gray-300">
                  021-12345678
                </p>
              </div>
              <div
                className="border flex flex-col items-center justify-center  py-8 rounded-2xl 
               hover:shadow-lg transition border-gray-400"
              >
                <EnvelopeIcon className="h-10 w-10 mb-4" />
                <p className="w-full break-words p-2 text-gray-400 dark:text-gray-300">
                  GoldenCoffeeShop@gmail.com
                </p>
              </div>
            </div>
          </section>

          {/* Google Maps Section */}
          <section>
            <h2 className="text-3xl font-bold mb-10 text-center">
              مکان ما روی نقشه
            </h2>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-400">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.4757058264054!2d51.41193082507126!3d35.739110772568594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e060ddacbb909%3A0x2297707295d2278b!2z2KfYs9iq2KfZhiDYqtmH2LHYp9mG2Iwg4oCr2K7bjNin2KjYp9mGINmI2YTbjCDYudi12LHYjCDYp9uM2LHYp9mG!5e0!3m2!1sfa!2s!4v1756133018019!5m2!1sfa!2s"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <h2 className="text-3xl font-bold mb-10 text-center">ارسال پیام</h2>
            <div className=" rounded-3xl p-10 max-w-3xl mx-auto border border-gray-400">
              <form className="grid gap-6 ">
                <div className="grid gap-2 ">
                  <label className="text-right text-sm font-medium">نام</label>
                  <input
                    type="text"
                    placeholder="نام شما"
                    required
                    className="rounded-xl border border-gray-400 px-4 py-3 outline-none focus:ring-2
                focus:ring-gray-900 dark:placeholder:text-gray-300"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-right text-sm font-medium">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    placeholder="ایمیل شما"
                    required
                    className="rounded-xl border border-gray-400 px-4 py-3 outline-none focus:ring-2
                focus:ring-gray-900 dark:placeholder:text-gray-300"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-right text-sm font-medium">پیام</label>
                  <textarea
                    rows="6"
                    placeholder="پیام شما"
                    required
                    className="rounded-xl border border-gray-400 px-4 py-3 outline-none focus:ring-2
                focus:ring-gray-900 dark:placeholder:text-gray-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gray-900 dark:bg-gray-200 hover:bg-gray-950
                dark:hover:bg-gray-300 text-white dark:text-zinc-800 transition shadow"
                >
                  ارسال پیام
                </button>
              </form>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold mb-10 text-center">
              سوالات متداول
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className={`border border-gray-400 rounded-xl py-4 px-2 md:px-4 cursor-pointer hover:shadow-md 
                transition-[height] duration-150 ease-in-out max-h-40 [interpolate-size:allow-keywords] 
                 overflow-hidden
                ${openIndex === idx ? "h-min" : "h-14"}
                `}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm md:text-lg font-medium">{item.q}</h3>
                    <ChevronDownIcon
                      className={`h-6 w-6  transform transition ${
                        openIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <p className="text-sm md:text-lg  mt-4 text-gray-400 dark:text-amber-200 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Social Links */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8">ما را دنبال کنید</h2>
            <p className="text-gray-400 dark:text-amber-200 mb-6">
              از طریق شبکه‌های اجتماعی با ما در ارتباط باشید
            </p>
            <div className="flex justify-center gap-8 text-lg font-medium">
              <a
                href="#"
                className="dark:hover:text-brown-300 hover:text-amber-900 transition transform
                 hover:scale-110"
              >
                اینستاگرام
              </a>
              <a
                href="#"
                className="dark:hover:text-brown-300 hover:text-amber-900 transition transform
                 hover:scale-110"
              >
                تلگرام
              </a>
              <a
                href="#"
                className="dark:hover:text-brown-300 hover:text-amber-900 transition transform
                 hover:scale-110"
              >
                واتساپ
              </a>
            </div>
          </section>
        </main>
      </main>
    </div>
  );
}
