import React from "react";
import { FaStar } from "react-icons/fa6";
<FaStar />;
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
<FaRegStar />;

const Rating = ({ value }) => {
  const fullStar = Math.floor(value);
  const halfStar = value - fullStar > 0.5 ? 1 : 0;
  const emptyStar = 5 - halfStar - fullStar;

  return (
    <div className="text-yellow-400 flex text-[18px] gap-[2px]">
      {[...Array(fullStar)].map((_, index) => {
        return <FaStar key={index} />;
      })}
      {[...Array(halfStar)].map((star, index) => {
        return <FaStarHalfAlt key={index} />;
      })}
      {[...Array(emptyStar)].map((star, index) => {
        return <FaRegStar key={index} />;
      })}
    </div>
  );
};

export default Rating;
