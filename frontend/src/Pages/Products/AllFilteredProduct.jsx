import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import {
  useGetAllProductsQuery,
  useGetByBrandQuery,
} from "../../Redux/Api/productSlice";
import { useGetAllCategoryQuery } from "../../Redux/Api/categorySlice";
import Loader from "../../Components/Loader";
import SingleProduct from "./SingleProduct";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllBrandQuery } from "../../Redux/Api/brandSlice";

const AllFilteredProduct = () => {
  const [openSideBar, setSidebar] = useState(false);
  const [brandString, setBrandString] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [categoryString, setCategoryString] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [brandArray, setBrandArray] = useState([]);
  const [page, setPage] = useState(1);
  const { pathname } = useLocation();

  const [keyword, setKeyword] = useState("");

  const increaseHandler = () => {
    if (data?.numOfProduct / 6 > page) {
      setPage(page + 1);
    } else {
      toast.error("no more items");
    }
  };

  const decreaseHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.error("first page");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const categoryQuery = sp.get("category") || "";
  const brandQuery = sp.get("brand") || "";
  const keywordQuery = sp.get("keyword") || "";

  useEffect(() => {
    if (keywordQuery) {
      setKeyword(keywordQuery);
    } else {
      setKeyword("");
    }
  }, [keywordQuery]);

  useEffect(() => {
    if (keywordQuery) {
      setPage(1);
    }
  }, [keywordQuery]);
  // console.log(categoryQuery);
  //   let brand = [];
  //   let categoryArray = [];
  const { data: allProduct, isLoading: allProductLoading } =
    useGetAllProductsQuery();
  const { data, isLoading: productLoading } = useGetByBrandQuery({
    lowPrice,
    highPrice,
    page,
    category: categoryString,
    brand: brandString,
    keyword,
  });

  const { data: category, isLoading: categoryLoading } =
    useGetAllCategoryQuery();

  const { data: brand, isLoading: brandLoading } = useGetAllBrandQuery();

  const Loading =
    productLoading || categoryLoading || brandLoading || allProductLoading;

  const handleCategory = (value, cat) => {
    if (value) {
      setCategoryArray([...categoryArray, cat.toString()]);
    } else {
      const newCat = categoryArray.filter(
        (cate) => cate.toString() !== cat.toString()
      );
      setCategoryArray(newCat);
    }
  };

  useEffect(() => {
    if (categoryQuery) {
      setCategoryArray([...categoryArray, categoryQuery]);
    }
  }, []);

  const handleBrand = (value, cat) => {
    if (value) {
      setBrandArray([...brandArray, cat.toString()]);
    } else {
      const newCat = brandArray.filter(
        (cate) => cate.toString() !== cat.toString()
      );
      setBrandArray(newCat);
    }
  };

  useEffect(() => {
    const newString = categoryArray.join(",");

    setCategoryString(newString);
    setPage(1);
  }, [categoryArray]);

  useEffect(() => {
    const newString = brandArray.join(",");
    setBrandString(newString);
    setPage(1);
  }, [brandArray]);

  // if (!allProductLoading) {
  //   brand = Array.from(
  //     new Set(allProduct.map((p) => p.brand).filter((b) => b !== undefined))
  //   );
  // }

  return Loading ? (
    <Loader />
  ) : (
    <div className="w-full sm:flex-col relative flex gap-2 min-h-screen pb-10">
      <div className="w-[48px] hidden relative left-5 mr-4 top-5  smd:flex h-[48px] ">
        <button
          onClick={() => {
            setSidebar(!openSideBar);
          }}
          className="rounded-lg w-full h-full flex justify-center items-center text-black text-2xl font-extralight  "
        >
          {openSideBar ? <RxCross2 /> : <AiOutlineBars />}
        </button>
      </div>
      <div
        className={` flex gap-5 p-5 min-w-[300px] border-r-2 border-b-2  flex-col ${
          openSideBar
            ? "smd:flex smd:fixed sm:w-full smd:left-0 smd:top-0 smd:z-[5000] border-r-2 bg-white p-5 min-h-screen "
            : "smd:hidden"
        }`}
      >
        <div className="flex w-full rounded-md  justify-between">
          <h1 className="flex gap-3 text-[16px] font2 font-[400] tracking-wider items-center">
            <span className="text-[18px]">
              <IoFilter />
            </span>
            Filters{" "}
          </h1>
          <button
            onClick={() => {
              setSidebar(false);
            }}
            className="rounded-lg w-full h-full hidden smd:flex justify-end items-center text-black text-2xl font-extralight  "
          >
            {openSideBar ? <RxCross2 /> : <AiOutlineBars />}
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[24px] font2 font-[400] mb-4">Category</h1>
          <div className="flex flex-col gap-2">
            {category.allCategory.map((c) => {
              return (
                <div key={c._id} className="flex gap-2">
                  <input
                    id="checkCat"
                    type="checkbox"
                    defaultChecked={
                      c._id.toString() === categoryQuery ? true : false
                    }
                    onChange={(e) => {
                      handleCategory(e.target.checked, c._id);
                    }}
                  />
                  <label htmlFor="checkCat" className="">
                    {c.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[24px] font2 font-[400] mb-4">Brands</h1>
          <div className="flex flex-col gap-2">
            {brand.allBrand.map((c) => {
              return (
                <div key={c._id} className="flex gap-2">
                  <input
                    id="checkCat"
                    type="checkbox"
                    defaultChecked={
                      c._id.toString() === brandQuery ? true : false
                    }
                    onChange={(e) => {
                      handleBrand(e.target.checked, c._id);
                    }}
                  />
                  <label htmlFor="checkCat" className="">
                    {c.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col ">
          <h1 className="text-[24px] font2 font-[400] mb-4">Price</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="text-[15px] font-[300] font2">Min Price</label>
              <input
                type="number"
                value={lowPrice}
                onChange={(e) => {
                  setLowPrice(e.target.value);
                  setPage(1);
                }}
                className="border-[2px] w-[150px] border-gray-400 rounded-md px-3 py-1 focus:outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="text-[15px] font-[300] font2">Max Price</label>
              <input
                type="number"
                value={highPrice}
                onChange={(e) => {
                  setHighPrice(e.target.value);
                  setPage(1);
                }}
                className="border-[2px] w-[150px] border-gray-400 rounded-md px-3 py-1 focus:outline-none "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[300px] p-4 py-6 sm:px-1 usm:px-0 flex flex-col items-center ">
        {data?.products?.length === 0 ? (
          <div className="w-full h-full flex text-[28px] justify-center py-10 font2  ">
            No item
          </div>
        ) : (
          <div className="flex gap-5 w-full h-full flex-col justify-between">
            <div className="w-full h-full flex flex-wrap justify-center gap-5 ">
              {data?.products?.map((p) => {
                return (
                  <div
                    key={p._id}
                    data-aos="slide-up"
                    data-aos-duration="500"
                    data-aos-mirror="false"
                    className="w-[250px] usm:w-full "
                  >
                    <SingleProduct key={p._id} product={p} />
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-between items-center gap-4 mt-6 p-8 flex-wrap">
              <div className="uppercase text-gray-400 font2 font-[500] ">
                total {data?.numOfProduct} Products in{" "}
                {Math.floor(data?.numOfProduct / 6) + 1} pages{" "}
              </div>
              <div className="gap-3 px-2 flex justify-end">
                <button
                  onClick={decreaseHandler}
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
        )}
      </div>
    </div>
  );
};

export default AllFilteredProduct;
