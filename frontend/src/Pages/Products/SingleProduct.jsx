import React from "react";
import Rating from "../../Components/Rating";
import { Link } from "react-router-dom";
import HeartIcon from "../../Components/HeartIcon";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SingleProduct = ({ product }) => {
  return (
    <div className="min-w-[250px] vsm:w-[full] font2 flex flex-col rounded-[13px] gap-3 px-3 py-3 border-[2.97px] border-[#E4E7E9]">
      <Link
        to={`/productDetails/${product._id}`}
        className="flex w-full justify-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.10)] items-center"
      >
        <LazyLoadImage
          src={product.mainImage}
          alt={product.name}
          className="w-[180px] h-[180px] object-contain "
          effect="blur" // Optional: Add a blur effect while loading
        />
      </Link>
      <div className="flex items-center gap-3 text-[#77878F] text-[14px] fon-[400] ">
        <Rating value={product.rating} />
        <span>({product.numReviews})</span>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col">
          <Link
            to={`/productDetails/${product._id}`}
            className="text-[#191C1F] font2 text-[16px] font-[400] hover:underline "
          >
            {product.name}
          </Link>
          <p className="text-[14px] text-[#525CEB] font-[600] ">
            R {product.price}
          </p>
        </div>
        <button className="w-[48px] h-[48px] bg-[#F3F3F3] z-50 flex justify-center items-center rounded-md ">
          {/* <GrFavorite className="w-[24px] h-[24px]" /> */}
          <HeartIcon product={product} />
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
