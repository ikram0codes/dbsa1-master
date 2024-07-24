import React, { useEffect, useState, useMemo } from "react";
import bg from "../../images/Rectangle 25.png";
import design from "../../images/Mask group.png";
import { newProduct } from "../../data";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../Redux/Api/categorySlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import "react-lazy-load-image-component/src/effects/blur.css";

const HeroSection = () => {
  const {
    data: categories,
    isLoading: categoryLoading,
    error,
  } = useGetAllCategoryQuery();

  const [currentIndex, setCurrentIndex] = useState(0);

  const categorySlides = useMemo(() => {
    return categories ? categories.allCategory : [];
  }, [categories]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newProduct.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const nextIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newProduct.length);
  };

  const prevIndex = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newProduct.length - 1 : prevIndex - 1
    );
  };

  if (categoryLoading) return <Loader />;
  if (error)
    return (
      <Message variant="error">{error?.data?.error || error?.error}</Message>
    );

  return (
    <div className="flex w-[100vw] font2 mt-[3rem] bg-transparent min-h-[320px] smd:min-h-[580px] gap-5 justify-center relative overflow-hidden">
      {categorySlides.map((product, index) => {
        let position = "nextSlide";
        const { image, name, startingRate } = product;

        if (index === currentIndex) {
          position = "activeSlide";
        } else if (
          index === currentIndex - 1 ||
          (currentIndex === 0 && index === newProduct.length - 1)
        ) {
          position = "prevSlide";
        }

        return (
          <div
            key={index}
            className={`flex w-[80%] h-full gap-5 flex-col justify-center md:rounded-none rounded-lg items-center absolute transition-all duration-700 text-center ${
              position === "prevSlide" && "translate-x-[-100vw] opacity-0"
            } ${position === "nextSlide" && "translate-x-[100vw] opacity-0"} ${
              position === "activeSlide" && "translate-x-[0vw]"
            }`}
          >
            <div className="w-full h-full flex justify-center overflow-hidden md:rounded-none rounded-lg absolute left-0 top-0">
              <img
                src={bg}
                alt="banner"
                className="w-full h-full"
                priority="high"
                loading="eager"
              />
            </div>
            <div className="w-full flex smd:flex-col px-10 py-4 justify-between items-center h-full absolute left-0 top-0">
              <div className="flex flex-col gap-4 smd:h-1/2 smd:w-full smd:justify-center smd:items-center smd:gap-4 smd:order-2 text-white items-start px-5">
                <div className="text-5xl font-[600] font2 flex text-start smd:text-center sm:text-4xl sm:tracking-wider">
                  {name}
                </div>
                <div className="text-3xl font-[500] font2 sm:text-2xl">
                  From R. {startingRate}
                </div>
                <Link
                  to={`/shop?category=${product._id}`}
                  className="bg-[#282a3a] text-[16px] flex justify-start items-center gap-[12px] rounded-md px-[32px] py-4 font2 uppercase font-[700]"
                >
                  Shop Now
                  <span>
                    <FaArrowRight />
                  </span>
                </Link>
              </div>
              <div className="h-full min-w-1/3 smd:w-full smd:h-1/2 relative smd:order-1">
                <div className="h-full w-full">
                  <img
                    src={design}
                    alt="Banner design"
                    className="w-full h-full smd:hidden"
                    loading="eager"
                  />
                  <div className="absolute px-3 object-contain left-0 top-0 w-full h-full flex justify-center items-center">
                    <img
                      alt="Project Image"
                      src={image}
                      loading="eager"
                      className="w-[80%] max-h-[90%] smd:w-[95%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.75)] object-contain"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button
        className="absolute right-[90%] border-[2px] z-[1000] border-gray-600 rounded-full text-xl p-6 bg-[#f7f4f4] top-1/2 transform -translate-y-1/2"
        onClick={prevIndex}
      >
        <GrPrevious />
      </button>
      <button
        onClick={nextIndex}
        className="absolute z-[1000] border-[2px] border-gray-600 left-[90%] rounded-full text-xl p-6 bg-[#f7f4f4] top-1/2 transform -translate-y-1/2"
      >
        <GrNext />
      </button>
    </div>
  );
};  

export default HeroSection;
