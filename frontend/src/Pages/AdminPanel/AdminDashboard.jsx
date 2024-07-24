import Chart from "react-apexcharts";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../Components/Loader";
import { PiStarLight } from "react-icons/pi";
import { PiArrowCircleDownDuotone } from "react-icons/pi";
import { PiStarDuotone } from "react-icons/pi";
import { PiUsersDuotone } from "react-icons/pi";
import { PiHandbagSimpleDuotone } from "react-icons/pi";

import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../Redux/Api/orderSlice";
import { useUserListQuery } from "../../Redux/Api/userApiSlice";
import { useGetAllProductsQuery } from "../../Redux/Api/productSlice";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useUserListQuery();
  const { data, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const { data: allProducts, isLoading: loadingThree } =
    useGetAllProductsQuery();

  const totalReviews = () => {
    const num = allProducts?.reduce((sum, item) => {
      return sum + item.numReviews;
    }, 0);
    return num;
  };
  totalReviews();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      {/* <AdminMenu /> */}

      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-full flex justify-around text-white flex-wrap">
          <div className="rounded-lg bg-white flex flex-col justify-center gap-2 shadow-md shadow-slate-400 text-[#2A2A2A] font2 p-5  w-[224px] min-h-[140px] mt-5">
            <PiHandbagSimpleDuotone className="w-[32px] h-[32px] text-blue-300 " />

            <h1 className="text-[22px] pl-1 font-[500] font2 ">
              R {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
            <p className="text-[16px] pl-1 font-[400] text-[#757575] ">Sales</p>
          </div>
          <div className="rounded-lg bg-white flex flex-col justify-center gap-2 shadow-md shadow-slate-400 text-[#2A2A2A] font2 p-5  w-[224px] min-h-[140px] mt-5">
            <PiUsersDuotone className="w-[32px] h-[32px] text-blue-300 " />

            <h1 className="text-[22px] pl-1 font-[500] font2 ">
              {isLoading ? <Loader /> : customers?.numOfUsers}
            </h1>
            <p className="text-[16px] pl-1 font-[400] text-[#757575] ">
              Total Users
            </p>
          </div>
          <div className="rounded-lg bg-white flex flex-col justify-center gap-2 shadow-md shadow-slate-400 text-[#2A2A2A] font2 p-5  w-[224px] min-h-[140px] mt-5">
            <PiArrowCircleDownDuotone className="w-[32px] h-[32px] text-blue-300 " />
            <h1 className="text-[22px] pl-2 font-[500] font2 ">
              {isLoading ? <Loader /> : data?.totalOrders}
            </h1>
            <p className="text-[16px] pl-2 font-[400] text-[#757575] ">
              Total Orders
            </p>
          </div>
          <div className="rounded-lg bg-white shadow-md flex flex-col justify-center gap-2 shadow-slate-400 text-[#2A2A2A] font2 p-5  w-[224px] min-h-[140px] mt-5">
            <PiStarDuotone className="w-[28px] h-[28px] text-blue-300 " />

            <h1 className="text-[22px] pl-1 font-[500] font2 ">
              {isLoading ? <Loader /> : totalReviews()}
            </h1>
            <p className="text-[16px] pl-1 font-[400] text-[#757575] ">
              Total Reviews
            </p>
          </div>
        </div>

        {/* <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="70%"
          />
        </div> */}

        <div className="mt-[10px]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
