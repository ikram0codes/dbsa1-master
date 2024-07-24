import React, { useState } from "react";
import { useGetOrdersQuery } from "../../Redux/Api/orderSlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OrderList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetOrdersQuery({ page });
  const increaseHandler = () => {
    if (data?.numOfOrders / 5 + 1 > page) {
      setPage(page + 1);
    } else {
      toast.error("no more items");
    }
  };

  const descreaseHandler = () => {
    console.log(page);
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.error("first page");
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="w-full flex flex-col items-start overflow-x-auto sm:overflow-x-scroll p-4 md:p-0">
      <h1 className="text-[22px] font2 font-[500] p-4 text-center">
        All Orders
      </h1>
      <table className="mt-8 font2 w-full">
        <thead>
          <tr className="mb-[5rem] text-[14px] font-[700]">
            <th className="">ITEM</th>
            {/* <th className="pl-1">ID</th> */}
            <th className="">USER</th>
            <th className="">DATE</th>
            <th className="">TOTAL</th>
            <th className="">PAID</th>
            <th className="">DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-[16px] font-[400] font2">
          {data?.orders.map((order) => (
            <tr key={order._id}>
              <td data-cell="ITEM">
                <img
                  src={order.orderItems[0].mainImage}
                  alt={order._id}
                  className="w-[5rem] m-auto pt-4 object-contain"
                />
              </td>
              {/* <td data-cell="ID">{order._id}</td> */}

              <td
                data-cell="USER"
                className="min-w-[125px] text-[#525CEB] capitalize "
              >
                {order.user ? order.user.username : "N/A"}
              </td>

              <td data-cell="DATE" className="min-w-[125px]">
                {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
              </td>

              <td data-cell="TOTAL" className="min-w-[125px]">
                R {order.totalPrice}
              </td>

              <td data-cell="PAID" className="py-2  ">
                {order.isPaid ? (
                  <p className="p-1 text-center m-auto text-[#f7f7f8] bg-green-400 w-[6rem] rounded-full">
                    Completed
                  </p>
                ) : (
                  <p className="p-1 text-center m-auto text-[#f7f7f8] bg-red-400 w-[6rem] rounded-full">
                    Pending
                  </p>
                )}
              </td>

              <td data-cell="DELIVERED" className="px-2 py-2">
                {order.isDelivered ? (
                  <p className="p-1 text-center m-auto text-[#f7f7f8] bg-green-400 w-[6rem] rounded-full">
                    Completed
                  </p>
                ) : (
                  <p className="p-1 text-center m-auto text-[#f7f7f8] bg-red-400 w-[6rem] rounded-full">
                    Pending
                  </p>
                )}
              </td>

              <td>
                <Link to={`/order/${order._id}`}>
                  <button>More</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-between items-center gap-4 mt-6 p-8 flex-wrap">
        <div className="uppercase text-gray-400 font2 font-[500] ">
          total {data?.numOfOrders} Products in{" "}
          {Math.ceil(data?.numOfOrders / 5)} pages{" "}
        </div>
        <div className="gap-3 px-2 flex justify-end">
          <button
            onClick={descreaseHandler}
            className="rounded-md bg-[#525CEB] text-white p-2"
          >
            Prev
          </button>

          <button
            className={`w-[40px] text-[white] p-2 h-[40px] rounded-md bg-[#525CEB]`}
          >
            {page}
          </button>
          <button
            onClick={increaseHandler}
            className="rounded-md bg-[#525CEB] text-white p-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
