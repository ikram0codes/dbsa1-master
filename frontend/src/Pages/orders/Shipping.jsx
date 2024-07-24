import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressStep from "../../Components/ProgressStep";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../Redux/features/cartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [mobile, setMobile] = useState(shippingAddress.mobile || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = () => {
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, mobile })
    );
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  return (
    <div className="w-full relative left-0 p-4 top-0 flex flex-col justify-center items-center">
      <div className="w-[30%] md:w-[50%] sm:w-[80%] vsm:w-[95%] flex flex-col mt-5">
        <ProgressStep step1 step2 />
        {/* <div className="text-[21px] font-[400]">Get Started!</div> */}
        <div className="w-full gap-6 flex flex-col mt-6">
          <div className="flex w-full  flex-col gap-2">
            <label htmlFor="address" className="text-[14px]">
              Address
            </label>
            <div className="w-full bg-[#c1c1c133]  rounded-lg">
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Enter your Address"
                className="bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="flex w-full  flex-col gap-2  ">
            <label htmlFor="City" className="text-[14px]">
              City
            </label>
            <div className="w-full bg-[#c1c1c133]  rounded-lg">
              <input
                id="City"
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                placeholder="Enter your City"
                className="bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 ">
            <label htmlFor="postalCode" className="text-[14px]">
              PostalCode
            </label>
            <div className="w-full flex bg-[#c1c1c133]  rounded-lg">
              <input
                id="postalCode"
                type="text"
                placeholder="Enter PostalCode"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                className="bg-transparent h-[48px]  w-full px-3 py-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 ">
            <label htmlFor="country" className="text-[14px]">
              Country
            </label>
            <div className="w-full flex bg-[#c1c1c133]  rounded-lg">
              <input
                id="country"
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                className="bg-transparent h-[48px]  w-full px-3 py-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 ">
            <label htmlFor="mobile" className="text-[14px]">
              Phone no
            </label>
            <div className="w-full flex bg-[#c1c1c133]  rounded-lg">
              <input
                id="mobile"
                type="number"
                placeholder="Enter Phone number"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                className="bg-transparent h-[48px]  w-full px-3 py-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-400">Select Method</label>
            <div className="mt-2 flex justify-between w-full">
              <label className="inline-flex items-center w-full gap-5">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">PayPal or Credit Card</span>

                {/* <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2">Cash on delievery</span> */}
              </label>
            </div>
          </div>

          <button
            onClick={handleShipping}
            className="w-full h-[48px] rounded-lg tracking-wider text-[17px] font-[500] bg-[#525CEB] text-white "
          >
            Continue
          </button>
          {/* <div className="flex w-full flex-col mt-12 gap-8">
            <button className="w-full h-[48px] flex justify-center items-center gap-2 rounded-lg tracking-wider text-[13px] font-[400] bg-[#000000] text-white ">
              <FcGoogle className="text-[22px]" /> Or sign up with Google
            </button>
          </div> */}
          {/* <div className="w-full flex justify-center items-center">
            <p className="">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-[#007AFF]"
              >
                Sign in now
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
