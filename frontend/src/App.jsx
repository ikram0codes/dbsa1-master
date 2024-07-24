import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { RiWhatsappFill } from "react-icons/ri";
import AOS from "aos";
import Loader from "./Components/Loader";
import "aos/dist/aos.css"; // Import CSS for AOS

// Lazy load components
const Navbar = React.lazy(() => import("./Components/Navbar"));
const MainFooter = React.lazy(() => import("./Components/MainFooter"));

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 500,
      mirror: true,
      // disable: "tablet",
    });
  }, []);

  return (
    <div className="font1">
      <ToastContainer />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </React.Suspense>
      <main>
        <a
          href="https://wa.me/+27872659969"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-[50px] z-50 left-[30px]"
        >
          <RiWhatsappFill className="text-[50px] text-green-500 bg-white rounded-full px-2 shadow-md shadow-slate-400" />
        </a>
        <Outlet />
      </main>
      <React.Suspense fallback={<Loader />}>
        <MainFooter />
      </React.Suspense>
    </div>
  );
};

export default App;
