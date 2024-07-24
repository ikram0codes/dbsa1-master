import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { useGetAllCategoryQuery } from "../../Redux/Api/categorySlice";
import Message from "../../Components/Message";

const Category = () => {
  const {
    data: categories,
    isLoading: categoryLoading,
    error,
  } = useGetAllCategoryQuery();
  return categoryLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error?.data?.error || error?.error}</Message>
  ) : (
    <div className="w-full font2 flex justify-center mt-20 items-center">
      <div className="w-[85%] sm:w-[95%] flex items-center  flex-wrap justify-center gap-2">
        {categories.allCategory.map((product, index) => {
          return (
            <div
              key={index}
              className="w-max mt-2  h-[15rem] rounded-md border-[2px] gap-3 p-4 border-slate-400  flex items-center justify-between overflow-hidden"
            >
              <div className="relative overflow-hidden ">
                <img
                  src={product.image}
                  className="w-[15rem] h-max object-cover object-center "
                  alt="Background"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-[18px] font2 text-center font-[400] text-[#191C1F] ">
                  {product.name}
                </div>
                <Link
                  to={`/shop?category=${product._id}`}
                  className="text-[#525CEB] font2 underline text-[18px] font-[600] "
                >
                  Shop Now
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
