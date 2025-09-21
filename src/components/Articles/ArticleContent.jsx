export default function ArticleContent({ title }) {
  return (
    <>
      <h5 className="font-Dana font-normal text-sm sm:text-lg line-clamp-2 w-47.75 sm:w-48.25  
         text-zinc-800 dark:text-white mt-5 sm:mt-0">
        {title}
      </h5>
      <span className="inline-block w-49.25 h-0.25 sm:w-0.25 sm:h-14 bg-gray-500/50" />
    </>
  );
}
