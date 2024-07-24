import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import {
  addProductInLocalStorage,
  getFavoritesFromLocalStorage,
  removeProductFromLocalStorage,
} from "../Utils/localStorage";
import {
  addToFavorite,
  removeFromProduct,
  setFavorites,
} from "../Redux/features/Favorite/favoriteSlice";
import { toast } from "react-toastify";

const HeartIcon = ({ product }) => {
  // console.log(product);
  // const [isFavorites, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  // console.log(favorites);
  const isFavorites = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
    // console.log(isFavorite);
  }, []);

  //   useEffect(() => {
  //     setIsFavorite(isFavorite);
  //   }, []);

  const toggleFavorite = () => {
    console.log("hello");
    console.log(isFavorites);
    if (isFavorites) {
      dispatch(removeFromProduct(product));
      removeProductFromLocalStorage(product);
      toast.success("remove from favorites successfully");
      // setIsFavorite(false);
    } else {
      dispatch(addToFavorite(product));
      addProductInLocalStorage(product);
      toast.success("added to favorites successfully");
      // setIsFavorite(true);
    }
  };
  //   console.log(favorites);
  return (
    <div
      onClick={toggleFavorite}
      className="w-[48px] h-[48px] bg-[#F3F3F3] flex justify-center items-center rounded-md "
    >
      {isFavorites ? (
        <MdFavorite className="w-[24px] h-[24px] text-red-500 " />
      ) : (
        <MdFavoriteBorder className="w-[24px] h-[24px]" />
      )}
    </div>
  );
};

export default HeartIcon;
