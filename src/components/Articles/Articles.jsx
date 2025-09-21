import SectionHeader from "../SectionHeader";
import Article from "./Article";
import { articles } from "./dataArticles";

export default function Articles() {
  if (articles.length === 0) {
    return (
      <div className="text-zinc-800 dark:text-white text-3xl w-full text-center mt-10">
        this is no articles
      </div>
    );
  }
  return (
    <div className="max-w-315 mx-4 xl:mx-auto mt-7 md:mt-20 flex flex-col gap-5 sm:gap-12">
      <SectionHeader
        title={"مطالب خواندنی"}
        linkTitle={["مشاهده همه", "مطالب"]}
      />
      <div
        className="w-90 sm:w-155 lg:w-259 xl:w-315 mx-auto xl:mx-0 grid gap-5 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {articles.map((article) => (
          <Article article={article} key={article.id * 12}></Article>
        ))}
      </div>
    </div>
  );
}

