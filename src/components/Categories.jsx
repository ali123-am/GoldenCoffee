import { Link } from "react-router-dom";
const array = [
  { id: 1, title: "قهوه دمی و اسپرسو" },
  { id: 2, title: "لوازم جانبی و تجهیزات" },
  { id: 3, title: "اسپرسو ساز" },
  { id: 4, title: "پک تستر قهوه" },
  { id: 5, title: "قهوه ترک" },
];
export default function Categories() {
  return (
    <ul
      className="max-w-315 h-65 xs:h-45 md:h-55 lg:h-60 mx-auto grid grid-cols-3
     xs:grid-cols-5 justify-items-center mt-10 md:mt-15"
    >
      {array.map((item, index) => (
        <Link
          className={`w-25 h-25 md:w-35 md:h-35 lg:w-50 lg:h-50 mt-3 flex flex-col items-center
          ${item.id > 3 ? "mr-30 xs:mr-0" : ""}`}
          key={item.id * index}
        >
          <img
            src={`/images/categories/category${item.id}.webp`}
            className="w-full h-full"
            alt="بخش های مختلف"
            loading="lazy"
          />
          <span
            className="font-Dana font-semibold text-xs xs:text-xl text-zinc-700
          dark:text-white text-center"
          >
            {item.title}
          </span>
        </Link>
      ))}
    </ul>
  );
}


import {
  HeartIcon,
  UserGroupIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Footer from "./Footer";
import UseNavbar from "./Header/UseNavbar";

// export default function AboutUs() {
//   return (
//     <div className="min-h-screen font-Dana antialiased">
//       <UseNavbar />
//       <main className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto bg-white dark:bg-zinc-700 mb-30
//        rounded-2xl mt-30 md:mt-50 border-y-4 border-orange-300 text-zinc-800 dark:text-white">
//         {/* Info + Stats */}
//         <section className="max-w-5xl mx-auto px-6 md:py-14">
//           <div className="rounded-3xl py-10 md:p-10  text-center ">
//             {/* Info */}
//             <div className="space-y-4 mb-10 ">
//               <h2 className="text-3xl font-bold">
//                 وبسایت گلدن کافی
//               </h2>
//               <p className="leading-7 max-w-full ">
//                 گلدن کافی یک مقصد آنلاین برای علاقه‌مندان به قهوه است. این
//                 وبسایت با تمرکز بر کیفیت، پایداری و تجربه دلنشین مشتری،
//                 مجموعه‌ای از بهترین دانه‌های قهوه و محتوای آموزشی درباره قهوه را
//                 در اختیار شما قرار می‌دهد. هدف ما ایجاد فضایی صمیمی و الهام‌بخش
//                 برای دوستداران قهوه است.
//               </p>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[
//                 { label: "سال تجربه", value: "۱۰+" },
//                 { label: "مزارع همکار", value: "۱۲" },
//                 { label: "رضایت مشتری", value: "۴.۸/۵" },
//                 { label: "انواع رُست", value: "۸" },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="p-6 rounded-2xl shadow hover:shadow-lg flex flex-col items-center
//                    justify-center border border-gray-400"
//                 >
//                   <div className="text-3xl md:text-4xl font-bold">
//                     {item.value}
//                   </div>
//                   <div className="text-sm md:text-base text-gray-500 dark:text-gray-300 mt-1">
//                     {item.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Values */}
//         <section className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-8">
//           {[
//             {
//               icon: <HeartIcon className="w-7 h-7 text-pink-500" />,
//               title: "عشق به کیفیت",
//               desc: "هر فنجان با وسواس و توجه کامل آماده می‌شود.",
//             },
//             {
//               icon: <UserGroupIcon className="w-7 h-7 text-blue-500" />,
//               title: "جامعه‌محور",
//               desc: "همراه با کارگاه‌ها و رویدادهای محلی.",
//             },
//             {
//               icon: <GlobeAltIcon className="w-7 h-7 text-green-500" />,
//               title: "پایداری",
//               desc: "دانه‌های قهوه از مزارع پایدار و منصفانه خریداری می‌شوند.",
//             },
//           ].map((v, i) => (
//             <div
//               key={i}
//               className="rounded-3xl border border-gray-400 p-8 text-center     shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
//             >
//               <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-gray-50 mb-5">
//                 {v.icon}
//               </div>
//               <h3 className="font-semibold text-xl">{v.title}</h3>
//               <p className="mt-3  leading-7">{v.desc}</p>
//             </div>
//           ))}
//         </section>

//         {/* Our Story */}
//         <section className="max-w-5xl mx-auto px-6 py-14">
//           <div className="rounded-3xl md:p-10">
//             <h2 className="text-3xl font-bold  text-center">
//               داستان ما
//             </h2>
//             <p className="mt-4 text-center leading-7 max-w-3xl mx-auto">
//               همه چیز از یک فنجان قهوه و علاقه به اجتماع شروع شد. ما می‌خواهیم
//               هر مشتری نه تنها یک قهوه با کیفیت بنوشد، بلکه تجربه‌ای دلنشین و
//               خاطره‌انگیز داشته باشد. تیم ما متعهد است فضایی صمیمی، الهام‌بخش و
//               پایدار برای همه فراهم کند.
//             </p>

//             <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">
//               {[
//                 {
//                   icon: (
//                     <StarIcon className="w-7 h-7 text-yellow-500 mx-auto" />
//                   ),
//                   title: "تجربه بی‌نظیر",
//                   desc: "هر بازدید، خاطره‌ای ماندگار می‌سازد.",
//                 },
//                 {
//                   icon: <HeartIcon className="w-7 h-7 text-pink-500 mx-auto" />,
//                   title: "تیم ما",
//                   desc: "افرادی که عاشق قهوه و جامعه هستند.",
//                 },
//                 {
//                   icon: (
//                     <GlobeAltIcon className="w-7 h-7 text-green-500 mx-auto" />
//                   ),
//                   title: "پایداری",
//                   desc: "به محیط زیست و کشاورزان اهمیت می‌دهیم.",
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="p-6 border border-gray-400 rounded-2xl shadow-md hover:shadow-xl transition"
//                 >
//                   <div className="mb-4">{item.icon}</div>
//                   <h3 className="font-semibold text-lg">
//                     {item.title}
//                   </h3>
//                   <p className="mt-2 text-gray-500 dark:text-gray-300 text-sm leading-6">
//                     {item.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Contact */}
//         <section className="max-w-5xl mx-auto px-6 pb-14 lg:pb-25 pt-14">
//           <div className="rounded-3xl shadow-lg border border-gray-400 pt-10 p-5 md:p-10 grid md:grid-cols-2 gap-10">
//             {/* Info */}
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold">با ما در تماس باشید</h2>
//               <p className="text-gray-600 dark:text-gray-300 leading-7">
//                 خوشحال می‌شویم درباره قهوه‌ها، همکاری‌ها یا هر پرسشی که دارید با
//                 شما صحبت کنیم.
//               </p>
//               <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
//                 <div className="flex items-center gap-3">
//                   <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
//                     <MapPinIcon className="w-5 h-5 text-gray-700" />
//                   </span>
//                   تهران، خیابان مثال، پلاک ۱۲
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
//                     <PhoneIcon className="w-5 h-5 text-gray-700" />
//                   </span>
//                   ۰۲۱-۱۲۳۴۵۶۷۸
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
//                     <EnvelopeIcon className="w-5 h-5 text-gray-700" />
//                   </span>
//                   hello@yourcafe.ir
//                 </div>
//               </div>
//             </div>

//             {/* Form */}
//             <form className="grid gap-4">
//               <input
//                 className="rounded-xl border border-gray-400 px-4 py-3 outline-none focus:ring-2
//                 focus:ring-gray-900 "
//                 placeholder="نام"
//               />
//               <input
//                 className="rounded-xl border border-gray-400 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
//                 placeholder="ایمیل"
//               />
//               <textarea
//                 className="rounded-xl border border-gray-400 px-4 py-3 min-h-13 outline-none focus:ring-2 focus:ring-gray-900"
//                 placeholder="پیام شما"
//               />
//               <button
//                 type="button"
//                 className="px-5 py-3 rounded-xl bg-gray-900 dark:bg-gray-200 hover:bg-gray-950
//                 dark:hover:bg-gray-300 text-white dark:text-zinc-800 transition shadow"
//               >
//                 ارسال پیام
//               </button>
//             </form>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }
