import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineFacebook } from "react-icons/md";
import { ImLinkedin } from "react-icons/im";
import { ImFacebook2 } from "react-icons/im";
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <div className="w-full flex flex-wrap mt-20 smd:flex-col min-h-[416px] justify-center smd:gap-10 md:justify-evenly smd:items-center  px-5 gap-10 md:gap-4  py-20 bg-black ">
      <div className="flex  w-[200px] smd:w-[80%] md:w-[130px] flex-col text-[16px] gap-8">
        <div className="text-[#525CEB] text-[14px] font-[700] px-5 md:px-0 ">
          DBSA
        </div>
        <div className="text-[#CFD3D7] px-5 md:px-0 py-2 min-h-[150px] smd:min-h-[100px] gap-4 flex flex-col justify-between">
          <p className="text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            perspiciatis
          </p>
          <p className="text-[14px]">Copyright DBSA</p>
        </div>
      </div>
      <div className="flex w-[200px] smd:w-[80%] md:w-[200px] flex-col text-[16px] gap-8">
        <div className="text-[#525CEB] text-[14px] md:px-0 font-[700] px-5  ">
          Get in Touch
        </div>
        <div className="text-[#CFD3D7] px-5 gap-6 py-2 min-h-[100px] md:px-0 flex flex-col justify-between">
          <div className="text-[14px] flex gap-3">
            <span className="text-[#525CEB] text-[16px] ">
              <FaLocationDot />
            </span>
            <p className="">79 9th Road, Kew, JHB, 2090</p>
          </div>
          <div className="text-[14px] flex gap-3">
            <span className="text-[#525CEB] text-[16px] ">
              <FaPhoneAlt />
            </span>
            <p className=" tracking-wider ">+27765123912, +27872659969</p>
          </div>
          <div className="text-[16px] md:hidden smd:flex flex items-center gap-3">
            <span className="text-[#525CEB] text-[16px] ">
              <MdOutlineEmail />
            </span>
            <p className="text-[14px] tracking-tight ">
              info@electricalboards.co.za
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-[200px] md:w-[150px] smd:w-[80%] flex-col text-[16px] gap-8 smd:gap-6">
        <div className="text-[#525CEB] text-[16px] font-[700] px-5 md:px-0 ">
          Category
        </div>
        <div className="text-[#CFD3D7] px-5 py-2 min-h-[100px] md:px-0 gap-3 flex flex-col justify-between">
          <Link to={`/shop?category=662c14f26284a653a05f190b`} className="">
            Breakers
          </Link>
          <Link to={`/shop?category=662c15436284a653a05f190f`} className="">
            Electrical Enclosures
          </Link>
          <Link to={`/shop?category=662c15796284a653a05f1913`} className="">
            Wired Panel
          </Link>
          <Link to={`/shop?category=662c14b26284a653a05f1907`} className="">
            Din Mounted
          </Link>
        </div>
      </div>
      <div className="flex w-[200px] md:w-[130px] smd:w-[80%] flex-col text-[16px] gap-8 smd:gap-6">
        <div className="text-[#525CEB] text-[16px] md:px-0 font-[700] px-5 ">
          About
        </div>
        <div className="text-[#CFD3D7] px-5 py-2 min-h-[80px] md:px-0 gap-3 flex flex-col justify-between">
          <Link to="/about" className="">
            About us
          </Link>
          <Link to="/contact" className="">
            Contact us
          </Link>
          <Link to="#" className="">
            Privacy Policy
          </Link>
          <Link to="#" className="">
            Term and condition
          </Link>
        </div>
      </div>
      <div className="flex w-[200px] md:w-[160px] smd:w-[80%] flex-col text-[16px] gap-8 smd:gap-6">
        <div className="text-[#525CEB] flex gap-3 text-[24px] font-[700] px-5 md:px-0 ">
          <Link to="https://www.facebook.com/">
            <ImFacebook2 />
          </Link>
          <Link to="https://www.linkedin.com/">
            <ImLinkedin />
          </Link>
        </div>
        <div className="text-[#CFD3D7] px-5 md:px-0 py-2 min-h-[150px] gap-5 flex flex-col justify-between">
          Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do
          eiusmod.
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
