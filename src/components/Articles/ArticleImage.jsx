export default function ArticleImage({ src }) {
  return (
    <div
      className=" w-32.25 h-32.25 sm:w-70 sm:h-46.5 relative mb-3 rounded-2xl 
        rounded-bl-4xl overflow-hidden cursor-pointer group"
    >
      <img src={src} className="w-32.25 h-32.25 sm:w-70 sm:h-46.5" />
      <div
        className="absolute translate-y-[100%] w-full h-full text-orange-300
       bg-orange-200/70 flex justify-center items-center group-hover:-translate-y-[100%]
        transition-transform duration-450 ease-in-out delay-75"
      >
        <img
          src="./images/assets/logo-type_modified.svg"
          className="w-25 h-25 sm:w-auto sm:h-auto"
        />
      </div>
    </div>
  );
}
