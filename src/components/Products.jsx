import Product from "./Product";
import { useContext } from "react";
import SectionHeader from "./SectionHeader";
import { ProductsContext } from "../Context/ProductsContext";

export default function Products() {
  const { products } = useContext(ProductsContext);
  if (products.length === 0) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div
        className="bg-[url(./../public/images/body-bg.png)] w-full md:h-110 lg:h-144.5
        md:bg-contain 2xl:bg-cover 2xl:h-204.5 bg-center bg-no-repeat absolute "
      ></div>
      <div
        className="max-w-89.5 xs:max-w-160 md:max-w-180 lg:max-w-315 h-auto mx-auto
       mt-8 xs:mt-15 lg:mt-48 relative flex flex-col gap-5 xs:gap-10 md:gap-12"
      >
        <SectionHeader
          title={"جدیدترین محصولات"}
          describe={"فرآوری شده از دانه قهوه"}
          linkTitle={["مشاهده همه", " محصولات"]}
          href="/Store"
        />
        <div
          className="grid gap-3.5 *:justify-self-center lg:gap-5
         grid-cols-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4"
        >
          {products.map((product) => (
            <Product
              key={product?.id}
              product={product}
              isResponsive={true}
            ></Product>
          ))}
        </div>
      </div>
    </>
  );
}
