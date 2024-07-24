import React, { useEffect, useState } from "react";
import {
  useGetOrderDetailsQuery,
  useUpdateDeliveryStatusMutation,
} from "../Redux/Api/orderSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeliveryStep = ({
  id,
  isConfirmed,
  isDelivered,
  isShipped,
  isOutOfDelivery,
}) => {
  const [step1, setStep1] = useState(undefined);
  const [step2, setStep2] = useState(undefined);
  const [step3, setStep3] = useState(undefined);
  const [step4, setStep4] = useState(undefined);

  const [updateStatus] = useUpdateDeliveryStatusMutation();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(step1, step2, step3, step4);

  //   useEffect(() => {
  //     console.log("hii");
  //   }, [step1, step2, step3, step4]);

  const submitHandler = async () => {
    try {
      const res = await updateStatus({
        data: {
          isConfirmed: step1,
          isShipped: step2,
          isOutOfDelivery: step3,
          isDelivered: step4,
        },
        id,
      }).unwrap();
      if (!res.error) {
        toast.success("status updated successfully");
      }
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };

  const statusHandler = (e) => {
    if (!step1) {
      setStep2(false);
      setStep3(false);
      setStep4(false);
      console.log("1");
    }
    if (!step2) {
      setStep3(false);
      setStep4(false);
      console.log("2");
    }
    if (!setStep3) {
      setStep4(false);
      console.log("3");
    }
    console.log("hi");
  };

  useEffect(() => {
    isConfirmed && setStep1(isConfirmed);
    isShipped && setStep2(isShipped);
    isOutOfDelivery && setStep3(isOutOfDelivery);
    isDelivered && setStep4(isDelivered);
  }, [isConfirmed, isDelivered, isShipped, isOutOfDelivery]);

  return (
    <div className="flex font2 flex-col mt-6 justify-center items-start space-x-4">
      <div
        className={`flex ml-4 gap-2 justify-center items-center ${
          step1 ? "text-green-500" : "text-gray-300"
        }`}
      >
        <span className="">Confirmed</span>
        <div
          className={`text-lg text-center  ${
            step1 && step2 ? "flex" : "hidden"
          }`}
        >
          ✅
        </div>
        {userInfo.isAdmin && (
          <input
            type="checkBox"
            name="setStep1"
            defaultChecked={step1}
            onChange={(e) => {
              setStep1(e.target.checked);
              statusHandler(e);
            }}
            className="text-green-500"
          />
        )}
      </div>

      <>
        {<div className="h-[4rem] w-[0.8px] bg-green-500"></div>}
        <div
          className={`flex gap-2 justify-center items-center ${
            step1 && step2 ? "text-green-500" : "text-gray-300"
          }`}
        >
          <span>Shipped</span>
          <div
            className={`mt-2 text-lg text-center ${
              step1 && step2 ? "flex" : "hidden"
            }`}
          >
            ✅
          </div>
          {userInfo.isAdmin && step1 && (
            <input
              type="checkBox"
              defaultChecked={step2}
              name="setStep2"
              onChange={(e) => {
                setStep2(e.target.checked);
                statusHandler(e);
              }}
              className="text-green-500"
            />
          )}
        </div>
      </>

      <>
        {step1 && step2 && step3 ? (
          <div className="h-[4rem] w-[0.8px] bg-green-500"></div>
        ) : (
          <div className="h-[4rem] w-[0.8px] bg-gray-300"></div>
        )}

        <div
          className={` flex gap-2 justify-center items-center ${
            step1 && step2 && step3 ? "text-green-500" : "text-gray-300"
          }`}
        >
          <span className={``}>Out of Delivery</span>
          {step1 && step2 && step3 ? (
            <div className="mt-2 text-lg text-center">✅</div>
          ) : (
            ""
          )}
          {userInfo.isAdmin && step1 && step2 && (
            <input
              type="checkBox"
              name="setStep3"
              defaultChecked={step3}
              onChange={(e) => {
                setStep3(e.target.checked);
                statusHandler(e);
              }}
              className="text-green-500"
            />
          )}
        </div>
      </>
      <>
        {step1 && step2 && step3 && step4 ? (
          <div className="h-[4rem] w-[0.8px] bg-green-500"></div>
        ) : (
          <div className="h-[4rem] w-[0.8px] bg-gray-300"></div>
        )}

        <div
          className={` flex gap-2 justify-center items-center ${
            step1 && step2 && step3 && step4
              ? "text-green-500"
              : "text-gray-300"
          }`}
        >
          <span className={``}>Delivered</span>
          {step1 && step2 && step3 && step4 ? (
            <div className="mt-2 text-lg text-center">✅</div>
          ) : (
            ""
          )}
          {userInfo.isAdmin && step1 && step2 && step3 && (
            <input
              type="checkBox"
              defaultChecked={step4}
              name="setStep4"
              onChange={(e) => {
                setStep4(e.target.checked);
                statusHandler(e);
              }}
              className="text-green-500"
            />
          )}
        </div>
      </>
      {userInfo.isAdmin && (
        <button
          onClick={submitHandler}
          className="w-[160px] bg-[#525CEB] font2 mt-4 py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
        >
          Update
        </button>
      )}
    </div>
  );
};

export default DeliveryStep;
