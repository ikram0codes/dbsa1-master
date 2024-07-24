import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../Redux/Api/orderSlice";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import DeliveryStep from "../../Components/DeliveryStep";

const Order = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  console.log(order);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="flex justify-between sm:flex-col p-5">
      <div className="w-[50%] md:w-[55%] sm:w-full">
        <div className="">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="flex flex-col gap-4">
              {order.orderItems.map((item, index) => (
                <div className="w-full flex min-h-[150px] gap-10 vsm:gap-3 justify-between px-4 sm:px-2  ">
                  <div className="flex gap-5 items-center vsm:flex-col vsm:justify-center ">
                    <div className="w-[150px] h-[150px] smd:w-[120px] smd:h-[120px] rounded-[14px] bg-[#EDEBE9] flex justify-center  items-center ">
                      <img
                        src={item.mainImage}
                        alt=""
                        className="w-[133px] h-[133px] smd:w-[100px] smd:h-[100px] object-contain "
                      />
                    </div>
                    <div className="flex flex-col md:hidden justify-center items-start">
                      <Link
                        className="text-[18px] font2 font-[500]"
                        to={`/productDetails/${item._id}`}
                      >
                        {item.name}
                      </Link>
                      {/* <p className="vsm:hidden uppercase text-[#82828B] text-[18px] font2 font-[400] ">
                        {" "}
                         {item.brand}
                      </p> */}
                    </div>
                  </div>
                  <div className="flex gap-16 md:items-end items-center md:flex-col md:gap-4 md:justify-center ">
                    <div className="hidden  flex-col md:flex justify-center items-start">
                      <Link
                        className="text-[18px] font2 font-[500] sm:text-end"
                        to={`/productDetails/${item._id}`}
                      >
                        {item.name}
                      </Link>
                      {/* <p className="vsm:hidden uppercase text-[#82828B] text-[18px] font2 font-[400] ">
                        {" "}
                        BY {item.brand}
                      </p> */}
                    </div>
                    <div className="text-[#82828B] text-[18px] font2 font-[400]">
                      R {item.price}
                    </div>
                    <div className="flex gap-2 items-center">{item.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-xl font-bold mb-4 px-4 sm:px-2  mt-[3rem]">
            Shipping Status
          </h2>

          <DeliveryStep
            isConfirmed={order.isConfirmed}
            id={orderId}
            isShipped={order.isShipped}
            isDelivered={orderId.isDelivered}
            isOutOfDelivery={order.isOutOfDelivery}
          />
        </div>
      </div>

      <div className="w-[40%] sm:w-full">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message variant="success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Not paid</Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex font2 justify-between mb-2">
          <span>Items</span>
          <span>R {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>R {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>R {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>R {order.totalPrice}</span>
        </div>

        {!order.isPaid && userInfo._id === order?.user._id && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-pink-500 text-white w-full py-2"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

{
  /* //   <div className="w-1/2 flex flex-col gap-5">
        //     {order.orderItems.map((item, index) => {

            
              return (
                <div className="w-full flex min-h-[150px] gap-10 vsm:gap-3 justify-between px-4 sm:px-2  ">
                  <div className="flex gap-5 items-center vsm:flex-col vsm:justify-center ">
                    <div className="w-[150px] h-[150px] sm:w-[120px] sm:h-[120px] rounded-[14px] bg-[#EDEBE9] flex justify-center  items-center ">
                      <img
                        src={item.mainImage}
                        alt=""
                        className="w-[133px] h-[133px] sm:w-[100px] sm:h-[100px] object-contain "
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <Link
                        className="text-[18px] font2 font-[500]"
                        to={`/productDetails/${item._id}`}
                      >
                        {item.name}
                      </Link>
                      {/* <p className="vsm:hidden text-[#82828B] text-[15px] font2 font-[400] ">
                        {" "}
                        Quantity : {item.qty}
                      </p> */
}
{
  /* <div className="text-[#82828B] text-[18px] font2 font-[400]">
                        R {item.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-16 vsm:items-end items-center sm:flex-col sm:gap-4 sm:justify-center ">
        <div className="hidden  flex-col vsm:flex justify-center items-start">
          <Link
            className="text-[18px] font2 font-[500]"
            to={`/productDetails/${item._id}`}
          >
            {item.name}
          </Link>
          <p className="vsm:hidden uppercase text-[#82828B] text-[18px] font2 font-[400] ">
            {" "}
            BY {item.brand}
          </p>
        </div>
        <div className="text-[#82828B] text-[18px] font2 font-[400]">
          R {item.price}
        </div>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="text-[16px] text-gray-500 uppercase font-[500] ">
                      Qty : {item.qty}
                    </div>
                    <div className="text-[16px] text-gray-500 uppercase font-[500]">
                      Total Price : R {(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )} */
}
// */}
