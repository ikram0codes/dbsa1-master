import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../Redux/features/cartSlice";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(0);

  useEffect(() => {
    setQty(item.qty);
  }, []);

  const decreaseQty = (item) => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      const confirm = window.confirm("Do yo want to remove item from Cart ??");
      if (confirm) {
        dispatch(removeFromCart(item._id));
      }
    }
  };

  const increaseQty = (item) => {
    if (qty < item.countInStock) {
      setQty(qty + 1);
    } else {
      toast.error("no more items in stock");
    }
  };
  useEffect(() => {
    dispatch(addToCart({ ...item, qty }));
  }, [qty]);
  return (
    <div className="w-full flex min-h-[150px] gap-10 vsm:gap-3 justify-between px-4 sm:px-2  ">
      <div className="flex gap-5 items-center vsm:flex-col vsm:justify-center ">
        <div className="w-[150px] h-[150px] sm:w-[120px] sm:h-[120px] rounded-[14px] bg-[#EDEBE9] flex justify-center  items-center ">
          <img
            src={item?.mainImage}
            alt=""
            className="w-[133px] h-[133px] sm:w-[100px] sm:h-[100px] object-contain "
          />
        </div>
        <div className="flex flex-col vsm:hidden justify-center items-start">
          <Link
            className="text-[18px] font2 font-[500]"
            to={`/productDetails/${item._id}`}
          >
            {item?.name}
          </Link>
          <p className="vsm:hidden uppercase text-[#82828B] text-[18px] font2 font-[400] ">
            {" "}
            BY {item?.brand?.name}
          </p>
        </div>
      </div>
      <div className="flex gap-16 vsm:items-end items-center sm:flex-col sm:gap-4 sm:justify-center ">
        <div className="hidden  flex-col vsm:flex justify-center items-start">
          <Link
            className="text-[18px] font2 font-[500]"
            to={`/productDetails/${item._id}`}
          >
            {item?.name}
          </Link>
          <p className="vsm:hidden uppercase text-[#82828B] text-[18px] font2 font-[400] ">
            {" "}
            BY {item?.brand?.name}
          </p>
        </div>
        <div className="text-[#82828B] text-[18px] font2 font-[400]">
          R {item?.price}
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              decreaseQty(item);
            }}
            className="w-[24px] h-[24px] bg-[#525CEB] flex justify-center items-center text-white text-[18px] rounded-md  "
          >
            -
          </button>
          {qty}
          <button
            onClick={() => {
              increaseQty(item);
            }}
            className="w-[24px] h-[24px] bg-[#FF000F] flex justify-center items-center text-white text-[16px] rounded-md  "
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
