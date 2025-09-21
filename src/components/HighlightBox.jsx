export default function HighlightBox() {
  return (
    <div
      className="flex flex-col lg:flex-row gap-5 justify-center items-center mt-12 lg:mt-20
     *:rounded-2xl"
    >
      <div
        className="bg-[url(/images/categories/category-right.webp)] bg-center bg-cover
        bg-no-repeat w-89.5 h-35.5 sm:w-155 sm:h-62 flex gap-4 lg:gap-7 justify-center items-start
         flex-col pr-12 relative overflow-hidden"
      >
        <span className="absolute right-0 w-full h-full inline-block bg-black/55 z-0"></span>
        <h2
          className="font-Dana font-semibold text-xl sm:text-4xl leading-[24px] text-white
             z-10"
        >
          انواع قهوه
        </h2>
        <span className="font-Dana font-medium text-base sm:text-xl leading-[24px] text-white z-10">
          ترکیبی و تک خاستگاه
        </span>
      </div>
      <div
        className="bg-[url(/images/categories/category-left.webp)] bg-center bg-cover
        bg-no-repeat w-89.5 h-35.5 sm:w-155 sm:h-62 flex gap-4 lg:gap-7 justify-center items-start
         flex-col pr-12 relative overflow-hidden"
      >
        <span className="absolute right-0 w-full h-full inline-block bg-black/55 z-0"></span>
        <h2
          className="font-Dana font-semibold text-xl sm:text-4xl leading-[24px] text-white
             z-10"
        >
          پودر های فوری{" "}
        </h2>
        <span
          className="font-Dana font-medium text-base sm:text-xl leading-[24px] text-white
             z-10"
        >
          {" "}
          نسکافه ، هات چاکلت ، ماسالا{" "}
        </span>
      </div>
    </div>
  );
}
