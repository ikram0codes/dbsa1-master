import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Redux/Api/userApiSlice";
import { toast } from "react-toastify";
import { logout } from "../Redux/features/authSlice";
import { partners } from "../data";

const SideBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [company, setCompany] = useState("ABB");

  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutUser().unwrap();
      dispatch(logout());
      toast.success("user logout successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };

  return (
    <div className="absolute flex-col font2 z-[1000] text-[#757575] font-[500] shadow-slate-500 shadow-md p-3 bg-white border-[1px]  rounded-[12px] border-gray-400 text-[16px] w-[172px] left-0 top-[85px] ">
      <ul className="rounded-md text-start  first:rounded-md last:rounded-md ">
        {userInfo?.isAdmin && (
          <li className="bg-white h-[32px] hover:bg-[#F6F6F6] font2 text-[12px] font-[500] text-start px-3 rounded-md">
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#525CEB" : "#757575",
              })}
              className="w-full h-full flex justify-start items-center"
              to="/adminMenu/adminDashboard"
            >
              Admin Menu
            </NavLink>
          </li>
        )}
        <li className="bg-white h-[32px] text-[12px] font-[500]  rounded-md hover:bg-[#F6F6F6] py-1 px-3">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            to="/project"
            className="w-full h-full flex justify-start items-center"
          >
            Projects
          </NavLink>
        </li>
        <li className="bg-white text-[12px] h-[32px] font-[500]  rounded-md hover:bg-[#F6F6F6] py-1 px-3">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            className="w-full h-full flex justify-start items-center"
            to="/blog"
          >
            Blog
          </NavLink>
        </li>
        <li className="bg-white text-[12px] h-[32px] font-[500]  rounded-md hover:bg-[#F6F6F6] py-1 px-3">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#525CEB" : "#757575",
            })}
            className="w-full h-full flex justify-start items-center"
            to="/contact"
          >
            Contact Us
          </NavLink>
        </li>

        {userInfo && (
          <>
            <li className="bg-white text-[12px] h-[32px] font-[500]  rounded-md hover:bg-[#F6F6F6]   py-1 px-3">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#525CEB" : "#757575",
                })}
                className="w-full h-full flex justify-start items-center"
                to="/privateRoute"
              >
                Profile
              </NavLink>
            </li>
            <li className="bg-white text-[12px] font-[500] h-[32px]   rounded-md hover:bg-[#F6F6F6]   py-1 px-3">
              <div
                onClick={logoutHandler}
                className="w-full h-full flex justify-start items-center"
              >
                Logout
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
