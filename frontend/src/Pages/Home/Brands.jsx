import React from "react";
import { useGetAllBrandQuery } from "../../Redux/Api/brandSlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Brands = () => {
  const { data: brands, isLoading, error } = useGetAllBrandQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error?.data?.error || error?.error}</Message>
  ) : (
    <div className="w-full flex justify-center flex-col gap-12  items-center mt-20 ">
      <div className="flex w-[80%] vsm:w-[90%] gap-10 justify-between  items-center overflow-scroll">
        <div className="text-[30px] font2 font-[600] sm:text-[20px]">
          Verified Brands
        </div>
      </div>
      <div className="w-[80%] vsm:w-[90%] flex flex-col gap-10 overflow-scroll">
        <div className="w-full flex justify-between md:justify-start  gap-8">
          {brands?.allBrand.map((brand, index) => {
            return (
              <div key={index} className="min-w-[236px] h-max p-4 ">
                <div className="w-full h-full">
                  <LazyLoadImage
                    src={brand.image}
                    alt={brand.name}
                    className="w-max h-[10rem] object-cover object-center"
                    effect="blur" // Optional: Add a blur effect while loading
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brands;
