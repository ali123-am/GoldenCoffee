const features = [
  {
    id: 1,
    title: "پشتیبانی شبانه روزی",
    info: "7 روز هفته ، 24 ساعته",
    img: "/images/svgs/services/support.svg",
  },
  {
    id: 2,
    title: "امکان تحویل اکسپرس",
    info: "ارسال بسته با سرعت باد",
    img: "/images/svgs/services/express-delivery.svg",
  },
  {
    id: 3,
    title: "رست تخصصی",
    info: "تازه برشته شده و با کیفیت",
    img: "/images/svgs/services/coffee.svg",
  },
  {
    id: 4,
    title: "اکسسوری قهوه",
    info: "وسایل و ادوات دم آوری",
    img: "/images/svgs/services/pitcher.svg",
  },
];
export default function ServiceFeatures() {
  return (
    <div
      className="max-w-90 sm:max-w-315  grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-5
      lg:gap-0 mx-auto mt-20 font-Dana text-zinc-800 dark:text-white relative"
    >
      {features.map((feature) => (
        <div
          className="justify-self-center flex sm:flex-row flex-col gap-4 items-center"
          key={feature.id * 57}
        >
          <img
            src={feature.img}
            alt="آپشن ها"
            className="w-22 h-18 lg:w-20 lg:h-18 xl:w-auto xl:h-auto"
          />
          <div className="flex flex-col gap-3.5">
            <h5 className="font-semibold text-base lg:text-base xl:text-lg ">
              {feature.title}
            </h5>
            <span className="font-normal text-sm">{feature.info}</span>
          </div>
        </div>
      ))}
      <div className="w-full h-full absolute flex justify-center">
        <span className="flex sm:hidden w-0.25 h-full bg-gray-300 dark:bg-zinc-700"></span>
      </div>
      <div className="w-full h-full absolute flex flex-col justify-center">
        <span className="flex sm:hidden w-full h-0.25 bg-gray-300  dark:bg-zinc-700"></span>
      </div>
    </div>
  );
}
