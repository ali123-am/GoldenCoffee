export default function HeroTextSection() {
  return (
    <div
      className="w-315 sm:mx-20 lg:mx-50 xl:mx-auto xl:px-40 2xl:px-0 mx-auto flex justify-end
         items-center p-4 md:p-2.5"
    >
      <div className="text-white w-50.25 md:w-115.5 ">
        <div>
          <h2 className="text-2xl md:text-6xl font-bold font-MorabbaBold mb-2">
            قهوه عربیکا تانزانیا
          </h2>
          <span className="text-xl md:text-5xl font-MorabbaLight font-light">
            یک فنجان بالانس !
          </span>
        </div>
        <span className="my-3 md:my-8 inline-block w-25 h-0.5 bg-orange-300"></span>
        <p className="text-xs md:text-2xl font-normal font-Dana break-words">
          قطعا نام آشنای عربیکا را شنیده اید، عربیکا یکی از گونه های قهوه است که
          در نواحی مختلف کمربند قهوه کشت میشود.
        </p>
      </div>
    </div>
  );
}
