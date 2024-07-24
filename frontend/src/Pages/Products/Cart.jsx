import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../../Redux/features/cartSlice";
import CartItem from "./CartItem";

const Cart = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const cart = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  //   console.log(cart);
  const { cartItems } = cart;

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center p-6">
      {cartItems.length === 0 ? (
        <h1 className="text-gray-600 text-[30px] font2 font-[500] uppercase mt-7 ">
          Cart is empty{" "}
          <Link to="/shop" className="hover:underline text-blue-400">
            Shop Now
          </Link>
        </h1>
      ) : (
        <div className="w-[80%] smd:w-full ">
          <h1 className="text-center text-[26px] text-gray-600 font-[500] font2 uppercase ">
            Shopping Cart
          </h1>
          <div className="flex flex-col gap-4 w-full my-5 ">
            {cartItems.map((item) => {
              return <CartItem key={item._id} item={item} />;
            })}
          </div>
          <hr />
          <div className="w-full gap-16 flex sm:gap-5 justify-end flex-wrap items-center px-4 sm:px-2 my-5">
            <div className="flex gap-8 sm:gap-3 items-center">
              <p className="font2 text-[18px] font-[600]">Subtotal </p>
              <p className="text-[#82828B] text-[22px] font2 font-[400] ">
                R {cart.itemsPrice}
              </p>
            </div>
            <button
              onClick={checkoutHandler}
              className="w-[160px] bg-[#525CEB] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
            >
              Checkout
            </button>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Cart;
