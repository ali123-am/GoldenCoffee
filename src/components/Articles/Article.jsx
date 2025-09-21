import ArticleMeta from "./ArticleMeta";
import  ArticleImage  from "./ArticleImage";
import ArticleContent from "./ArticleContent";
export default function Article({ article = {} }) {
  return (
    <div
      className="lg:last:col-start-2 lg:last:col-end-3 xl:last:col-start-4 xl:last:col-end-5
      w-89.5 h-37.25 sm:w-75 sm:h-71.25 rounded-xl shadow-lg px-2.5 pt-2.5 flex sm:flex-col 
      flex-row gap-3 sm:gap-0 bg-white dark:bg-zinc-700"
    >
      <ArticleImage src={article.image}/>
      <div className="flex flex-col gap-4.5 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
       <ArticleContent title={article.title}/>
       <ArticleMeta/>
      </div>
    </div>
  );
}


