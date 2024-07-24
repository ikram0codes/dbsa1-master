import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminMenu = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <div className="flex w-full relative left-0 smd:flex-col ">
      <AdminSidebar />
      <main className="relative w-full smd:relative smd:top-0 smd:left-0  smd:w-full">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminMenu;
