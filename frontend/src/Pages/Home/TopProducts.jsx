import React from "react";
import { useGetTopDataQuery } from "../../Redux/Api/productSlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import SingleProduct from "../Products/SingleProduct";

const TopProducts = () => {
  const {
    data: topProduct,
    isLoading: isTopProductLoading,
    error,
  } = useGetTopDataQuery();

  return isTopProductLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error?.data?.error || error?.error}</Message>
  ) : (
    <div className="w-full flex justify-center flex-col gap-12 items-center mt-[3rem] bg-[#F3F3F3] pt-[3rem] pb-[3rem]">
      <div className="flex w-[80%] vsm:w-[90%] justify-between items-center">
        <div className="text-[30px] font2 font-[600]">Featured Products</div>
      </div>
      <div className="w-[85%] vsm:w-[90%] flex flex-col gap-10 overflow-scroll">
        <div className="w-full flex gap-6">
          {topProduct.map((product, index) => {
            return <SingleProduct key={index} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
