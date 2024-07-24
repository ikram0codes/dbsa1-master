import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../Redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../Redux/Api/orderSlice";
import ProgressStep from "../../Components/ProgressStep";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import CartItem from "../Products/CartItem";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  //   useEffect(() => {
  //     if (cart?.cartItems.length === 0) {
  //       navigate("/cart");
  //     }
  //   }, [cart.cartItems, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center p-5 py-8">
      <div className="w-[43%] md:w-[80%] sm:w-[95%] vsm:w-[95%] flex flex-col items-center ">
        <div className="w-full">
          <ProgressStep step1 step2 step3 />
        </div>
        <div className="flex w-full flex-col mt-8">
          {cart.cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            <div className="">
              <div className="flex flex-col gap-4">
                {cart.cartItems.map((item, index) => {
                  return <CartItem item={item} key={index} />;
                })}
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col p-4 mt-5 ">
          <h1 className="text-[20px] font-[500]">Order Summary</h1>
          <div className="w-full flex flex-col justify-start">
            <h1 className="text-[18px] font-[500] my-4 ">Price</h1>
            <p className="flex w-full font2 font-[400] my-2 gap-5 justify-between">
              <span>Items</span>
              <span>R {cart.itemsPrice}</span>
            </p>
            <p className="flex w-full font2 font-[400] my-2 gap-5 justify-between">
              <span>Shipping</span>
              <span>R {cart.shippingPrice}</span>
            </p>
            <p className="flex w-full font2 font-[400] my-2 gap-5 justify-between">
              <span>Tax</span>
              <span>R {cart.taxPrice}</span>
            </p>
            <hr />
            <p className="flex w-full font2 font-[400] my-2 gap-5 justify-between">
              <span>Total</span>
              <span>R {cart.totalPrice}</span>
            </p>
            <hr />
          </div>
          <div className="w-full flex flex-col justify-start">
            <h1 className="text-[18px] font-[500] my-4 ">Shipping</h1>
            <p className="font2 font-[400] my-2 gap-2">
              <span className="font-[500]">Address :</span>{" "}
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
            <p className="font2 font-[400] my-2 gap-2">
              <span className="font-[500]">Phone no :</span>{" "}
              {cart.shippingAddress.mobile}
            </p>
            <p className="font2 font-[400] my-2 gap-2">
              <span className="font-[500]">Payment method :</span>{" "}
              {cart.paymentMethod}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="w-full h-[48px] rounded-lg tracking-wider text-[17px] font-[500] bg-[#525CEB] text-white "
          disabled={cart.cartItems === 0}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>

        {isLoading && <Loader />}
      </div>
    </div>
    // </div>
  );
};

export default PlaceOrder;
