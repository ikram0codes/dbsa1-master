import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineBars, AiOutlineSearch } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import SideBar from "./Sidebar";
import { useLogoutMutation } from "../Redux/Api/userApiSlice";
import { toast } from "react-toastify";
import { logout } from "../Redux/features/authSlice";

const LazySideBar = React.lazy(() => import("./Sidebar"));

const Navbar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (!res.error) {
        dispatch(logout());
        toast.success("User logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };

  const searchHandler = (value) => {
    setKeyword(value);
    navigate(`/shop?keyword=${value}`);
  };

  return (
    <>
      <div className="flex w-full relative bg-white text-[#666666] font2 justify-between py-[19px] left-0 top-0 mb-0 items-center border-b-[1px] z-10 md:flex-col gap-2 md:py-0">
        <div className="w-[25%] px-5 md:border-b-[1px] flex justify-between items-center md:w-full md:z-12 md:h-full md:py-5">
          <div className="w-full justify-between md:w-[40%] sm:w-[60%] flex md:justify-start items-center gap-5 md:gap-10 smd:gap-5 sm:gap-7">
            <div className="w-[48px] h-[48px]">
              <button
                onClick={() => setOpenSideBar(!openSideBar)}
                className="bg-[#c1c1c133] relative rounded-lg w-full h-full flex justify-center items-center text-black text-2xl font-extralight"
              >
                {openSideBar ? <RxCross2 /> : <AiOutlineBars />}
                {openSideBar && (
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <LazySideBar />
                  </React.Suspense>
                )}
              </button>
            </div>
            <Link
              to="/"
              className="flex tracking-wider text-center flex-col logo justify-start"
            >
              <div className="text-4xl font-semibold">DBSA</div>
              <div className="text-[7px] sm:hidden tracking-tighter font-semibold">
                EFFICIENT & EFFECTIVE ENGINEERING
              </div>
              <div className="text-[10px] sm:hidden mt-[3px] tracking-tighter font-semibold">
                DISTRIBUTION BOARDS SA (PTY) LTD
              </div>
            </Link>
          </div>
          <div className="hidden md:flex w-full md:w-[60%] sm:w-[40%] justify-end items-center gap-10 smd:gap-5">
            <div className="relative w-full flex flex-col items-end">
              {userInfo ? (
                <div className="flex cursor-pointer group relative justify-center items-center text-2xl text-gray-500 gap-2 md:border-none border-r-[2px]">
                  <div className="flex justify-center items-center h-[28px] w-[28px] md:h-[32px] md:w-[32px] rounded-full border-[2px] border-gray-400">
                    <span className="uppercase text-[16px] md:text-[20px] flex">
                      {userInfo?.username?.slice(0, 1)}
                    </span>
                  </div>
                  <span className="flex items-center sm:hidden capitalize text-[16px] md:text-[20px]">
                    {userInfo?.username}
                  </span>
                  <div className="absolute hidden group-hover:flex flex-col font2 z-[1000] text-[#757575] font-[500] shadow-slate-500 shadow-md p-3 bg-white border-[1px] rounded-[12px] border-gray-400 text-[16px] w-[122px] left-0 top-[52px]">
                    <button
                      onClick={logoutHandler}
                      className="bg-white text-[12px] font-[500] h-[32px] rounded-md hover:bg-[#F6F6F6] py-1 px-3"
                    >
                      <div className="w-full h-full flex justify-start items-center">
                        Logout
                      </div>
                    </button>
                    <div className="bg-white text-[12px] font-[500] h-[32px] w-full z-[123456] rounded-md hover:bg-[#F6F6F6] py-1 px-3">
                      <NavLink
                        to="/privateRoute"
                        className="w-full h-full flex justify-start items-center"
                      >
                        Profile
                      </NavLink>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="hidden cursor-pointer px-2 justify-center items-center text-[16px] gap-2 md:flex"
                >
                  <span className="sm:text-[38px]">
                    <CgProfile />
                  </span>
                  <span className="text-[16px] sm:hidden tracking-wider">
                    Sign in / Sign up
                  </span>
                </NavLink>
              )}
            </div>
            <button
              className="hidden text-3xl md:flex justify-center items-center font-semibold text-[14px] gap-1 rounded-[162.5px] border-[1px] w-[134px] h-[44px] bg-[#282a3a] border-black text-white"
              onClick={() => setShowLink(!showLink)}
            >
              Menu
            </button>
          </div>
        </div>
        <div
          className={`w-[75%] flex justify-around items-center md:w-full ${
            showLink ? "md:flex" : "md:hidden"
          } sm:flex-col`}
        >
          <div className="w-[400px] md:w-[450px] flex smd:w-[280px] sm:w-[90%]">
            <div className="w-full">
              <div className="flex text-[#666666] text-[14px] font-[400] justify-between h-[48px] rounded-lg px-1 py-1 bg-[#c1c1c133]">
                <input
                  type="text"
                  className="w-full px-3 bg-transparent focus:outline-none"
                  value={keyword}
                  placeholder="Search for products"
                  onChange={(e) => searchHandler(e.target.value)}
                />
                <button className="h-full w-[48px] px-2">
                  <AiOutlineSearch className="w-[25px] h-[25px]" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex md:py-5 justify-around gap-[16px] sm:w-[90%]">
            <NavLink
              to="/"
              className="flex border-r-[2px] px-2 justify-center items-center text-2xl gap-2"
            >
              <GoHome />
              <span className="text-[16px] font-[400]">Home</span>
            </NavLink>
            {userInfo ? (
              <div className="flex cursor-pointer px-3 md:hidden group relative justify-center items-center text-2xl gap-2 md:border-none border-r-[2px]">
                <div className="flex justify-center items-center h-[28px] w-[28px] rounded-full border-[2px] border-gray-400">
                  <span className="uppercase text-[16px] flex">
                    {userInfo?.username?.slice(0, 1)}
                  </span>
                </div>
                <span className="flex items-center capitalize text-[16px]">
                  {userInfo?.username}
                </span>
                <div className="absolute hidden group-hover:flex flex-col font2 z-[1000] text-[#757575] font-[500] shadow-slate-500 shadow-md p-3 bg-white border-[1px] rounded-[12px] border-gray-400 text-[16px] w-[172px] left-0 top-[32px]">
                  <button
                    onClick={logoutHandler}
                    className="bg-white text-[12px] font-[500] h-[32px] rounded-md hover:bg-[#F6F6F6] py-1 px-3"
                  >
                    <div className="w-full h-full flex justify-start items-center">
                      Logout
                    </div>
                  </button>
                  <div className="bg-white text-[12px] font-[500] h-[32px] w-full z-[123456] rounded-md hover:bg-[#F6F6F6] py-1 px-3">
                    <NavLink
                      to="/privateRoute"
                      className="w-full h-full flex justify-start items-center"
                    >
                      Profile
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex md:hidden border-r-[2px] px-2 justify-center items-center text-2xl gap-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>
                    <CgProfile />
                  </span>
                  <span className="text-[16px] font-[400]">
                    Sign in/Sign up
                  </span>
                </div>
              </NavLink>
            )}
            <NavLink
              to="/favorite"
              className="flex border-r-[2px] px-2 justify-center items-center text-2xl gap-2"
            >
              <GrFavorite />
              <span className="text-[16px] font-[400]">Favorite</span>
            </NavLink>
            <NavLink
              to="/cart"
              className="flex px-2 justify-center items-center text-2xl gap-2"
            >
              <div className="relative w-[24px] h-[24px]">
                <IoCartOutline />
                <div className="absolute top-[-10px] w-[20px] h-[20px] flex justify-center items-center bg-[#525CEB] py-0 text-white font-[500] border-white px-2 border rounded-full right-[-10px] text-[10px]">
                  {cartItems.length}
                </div>
              </div>
              <span className="text-[16px] relative font-[400]">Cart</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
