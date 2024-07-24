import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { PiCubeLight } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { CiDatabase, CiShoppingCart } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FcElectricity } from "react-icons/fc";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { LiaBarsSolid } from "react-icons/lia";
import SideBar2 from "../../Components/Sidebar2";
import { GrTooltip } from "react-icons/gr";
import { FaUpload } from "react-icons/fa6";

const AdminSidebar = () => {
  const [openSideBar, setSidebar] = useState(false);
  return (
    <>
      <div className="min-w-[250px] font2  smd:hidden overflow-hidden flex flex-col bg-white border-r-2 border-b-2 p-10 border-gray-200">
        <h1 className="text-[12px] font2 font-[700] uppercase">Menu</h1>
        <div className="flex flex-col text-[14px] font2 font-[400] gap-4 text-[#001737] mt-5 ">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="adminDashboard"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[18px]">
              <MdDashboard />
            </span>
            Dashboard
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="usersList"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[18px]">
              <LuUsers />
            </span>
            Users
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="createProduct"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[18px]">
              <PiCubeLight />
            </span>
            Create Products
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="categoryList"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[18px]">
              <MdOutlineCategory />
            </span>
            Category
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="createCategory"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[18px]">
              <MdOutlineCategory />
            </span>
            Create Category
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="brandList"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[18px]">
              <FcElectricity />
            </span>
            Brands
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="createBrand"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[18px]">
              <FcElectricity className="text-black" />
            </span>
            Create Brand
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="createProject"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[18px]">
              <HiOutlineDocumentText />
            </span>
            Create Project
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="orderList"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[20px]">
              <CiShoppingCart />
            </span>
            Orders
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="scrappeProducts"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[20px]">
              <CiDatabase />
            </span>
            Scrape Products
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="createToolTip"
            className="flex justify-start items-center gap-1 "
          >
            <span className="text-[20px]">
              <GrTooltip />
            </span>
            Create Tool Tip
          </NavLink>
        </div>
      </div>
      <div className="w-[48px] hidden z-[5] p-4  smd:flex h-[48px] ">
        <button
          onClick={() => {
            setSidebar(!openSideBar);
          }}
          className="relative rounded-lg w-full h-full flex justify-center items-center text-black text-2xl font-extralight  "
        >
          {openSideBar ? (
            <RxCross2 />
          ) : (
            <LiaBarsSolid className="bg-transparent text-4xl" />
          )}
          {openSideBar && <SideBar2 />}
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;
