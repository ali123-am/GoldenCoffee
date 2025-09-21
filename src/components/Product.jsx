import { memo } from "react";
import {
  StarIcon,
  ShoppingCartIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const Product = memo(({ product = {}, isResponsive = false }) => {
  const starArray = [1, 2, 3, 4, 5];
 
  if (!product.id) {
    return <div className="w-full h-40 bg-blue-300"></div>;
  }

  return (
      <Link to={`/product/${product.id}`}
      className={`
        ${
          isResponsive
            ? "w-43 h-68.25 sm:w-89.5 sm:h-36 sm:flex lg:block lg:w-60 lg:h-105 xl:w-75 xl:h-116.75 sm:pr-2 sm:pl-5 p-2 lg:p-5"
            : "block w-75 h-116.75 p-5 [direction:rtl]"
        } 
        bg-white dark:bg-zinc-700 shadow rounded-2xl`}
    >
      <div
        className={`${
          isResponsive
            ? "w-32 h-32 lg:w-50 lg:h-50 xl:w-65 xl:h-65 sm:m-2 lg:m-0"
            : "w-65 h-65 m-0 "
        } mx-auto relative cursor-pointer`}
      >
        <img
          src={product.img}
          alt="قهوه"
          className="w-full h-full "
          loading="lazy"
        />

        {product.offer && product.count ? (
          <div
            className={`
              ${
                isResponsive
                  ? `w-10 h-5 lg:w-13.5 lg:h-7.5 top-0 -right-4 sm:top-23.5 sm:right-33.5 lg:top-0
                 lg:right-0 text-xs lg:text-base`
                  : "w-13.5 h-7.5 top-0 right-0 text-base"
              }
                 rounded-full bg-orange-300 text-white flex items-center justify-center 
                 absolute font-Dana font-semibold select-none dark:text-zinc-800 pt-1`}
          >
            {Math.min(100, Math.floor((product?.offer * 100) / product?.price))}
            %
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`${
          isResponsive
            ? "gap-1.5 sm:gap-3 lg:gap-0 mt-2 w-full sm:w-48.5 lg:my-0 lg:w-auto"
            : "gap-0 my-0 w-auto"
        } flex flex-col`}
      >
        <h5
          className={`${
            isResponsive
              ? "h-10 sm:h-12 lg:h-15 text-sm lg:text-xl lg:mt-5 lg:mb-3.5 mb-0"
              : "text-xl mt-5 mb-3.5"
          }
            line-clamp-2 font-Dana font-medium  text-gray-900 dark:text-white cursor-pointer`}
        >
          {product?.productTitle}
        </h5>

        {product?.count ? (
          <div className={`flex gap-2 ${isResponsive ? "lg:mb-6" : "mb-6"}`}>
            <div className="text-teal-600">
              <span
                className={`${isResponsive ? "text-base lg:text-xl" : "text-xl"}
                font-Dana font-semibold ml-1 dark:text-emerald-500`}
              >
                {(product?.price - product?.offer).toLocaleString("en-US")}
              </span>
              <span
                className={`${isResponsive ? "text-xs lg:text-sm" : "text-sm"}
              font-Dana font-normal  tracking-tighter
               dark:text-emerald-500`}
              >
                تومان
              </span>
            </div>

            {product?.offer ? (
              <div className="*:font-Dana *:font-normal relative select-none">
                <span
                  className={`${
                    isResponsive ? "text-xs sm:text-base lg:text-xl" : "text-xl"
                  }
                   text-gray-400`}
                >
                  {product.price.toLocaleString("en-US")}
                </span>
                <span
                  className={`${isResponsive ? "text-xs lg:text-sm" : "text-sm"}
                   tracking-tighter text-gray-400`}
                >
                  تومان
                </span>
                <span
                  className={`${
                    isResponsive
                      ? "h-0.25 xs:h-0.5 top-3.5 lg:top-3"
                      : "h-0.5 top-3"
                  }
                w-full bg-red-400 absolute right-0`}
                ></span>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <span
            className={`${
              isResponsive
                ? "text-base md:text-xl  mb-0 lg:mb-6"
                : "text-xl mb-6"
            }
            inline-block select-none font-Dana font-normal text-red-400`}
          >
            فعلا موجود نیست
          </span>
        )}

        <div
          className={`${
            isResponsive
              ? "mt-2 mb-1.25  md:mt-0 lg:justify-between justify-between sm:justify-end"
              : "mt-0 justify-between"
          } flex items-center h-6.5
         `}
        >
          <div
            className={`${isResponsive ? "sm:hidden lg:flex flex" : "flex"}
             gap-2.25 items-center`}
          >
            {product?.count ? (
              <div
                className={`${isResponsive ? "h-6.5 lg:w-9 lg:h-9" : "w-9 h-9"}
                w-6.5 rounded-full flex justify-center items-center
              bg-gray-200 hover:bg-teal-600 text-gray-500 hover:text-white
              dark:bg-zinc-900 dark:hover:bg-emerald-500 cursor-pointer`}
              >
                <ShoppingCartIcon
                  className={`${
                    isResponsive ? "w-4 h-4 lg:w-5.5 lg:h-5.5" : "w-5.5 h-5.5"
                  }`}
                />
              </div>
            ) : (
              ""
            )}

            <ArrowsRightLeftIcon
              className={`${isResponsive ? "w-4 h-4 lg:w-6 lg:h-6 " : "w-6 h-6"}
                cursor-pointer text-gray-500hover:text-teal-600 dark:hover:text-emerald-500`}
            ></ArrowsRightLeftIcon>
          </div>
          <div
            className={`${
              isResponsive ? "*:lg:w-6 *:lg:h-6 *:w-4 *:h-4" : "*:w-6 *:h-6"
            } flex`}
          >
            {starArray.map((ind, index) => (
              <StarIcon
                key={index * 56}
                className={ind <= 1 ? "text-gray-300" : "text-orange-300"}
              ></StarIcon>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default Product;
