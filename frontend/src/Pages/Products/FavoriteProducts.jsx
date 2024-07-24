import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";

const FavoriteProducts = () => {
  const favorites = useSelector((state) => state.favorites);
  //   console.log(favorites);
  return (
    <div className="w-full min-h-[400px] flex-col items-center  font2 p-4 px-8 ">
      <div className="w-full flex justify-center text-gray-600 items-center mt-6 gap-2 font-[600] text-[28px]">
        My Favorites <span>({favorites.length})</span>
      </div>
      {favorites.length === 0 ? (
        <div className="w-full px-4 text-[21px] font-[500] font1 flex text-center items-center mt-10 justify-center">
          {" "}
          No Favorite Item yet{" "}
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-7 mt-8 justify-evenly ">
          {favorites.map((fav, index) => {
            const { name, price, ...brand } = fav;
            console.log(brand);
            return <SingleProduct key={index} product={fav} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FavoriteProducts;
