import React, { useEffect } from "react";
import "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
import { useLocation } from "react-router-dom";

const About = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <>
      <div
        id="About"
        className="flex min-h-[100vh] font2 items-center  w-full md:flex-col md:min-h-0 py-5"
      >
        <div className="flex justify-center items-center h-[70vh] w-1/2 md:w-full md:min-h-0 ">
          <dotlottie-player
            src="https://lottie.host/3392e30a-7c69-496c-b487-0a3fd8f2d86f/SeWqdHj2Gp.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className="flex min-h-[100vh] w-1/2 flex-col justify-center px-20 sm:px-10 md:w-full md:min-h-0">
          <h1 className="text-4xl text-secondary">About Us</h1>
          <p className="py-6 vsm:text-sm ">
            With years of experience in both Electrical Consulting and
            Manufacturing of Low-Medium Voltage Switchgear Panels, Distribution
            Boards SA (PTY) Ltd is fully equipped to handle projects of greater
            complexity and scale. Our team consists of ECSA registered
            Professionals and highly trained Engineers who's core focus is
            Efficient and Effective Engineering Solutions.
          </p>
          <p className="text-third py-6 vsm:text-sm vsm:py-3">
            Our product range consists of Electrical Boards, Motor Control
            Panels and Electrification Equipment. In addition to our complete
            Electrical Board Systems and design offerings such as Single line
            Diagrams, General Arrangements and Technical Drawings, we offer
            Loose Supply of equipment for maintenance purposes. This includes
            Circuit Breakers, Isolators, Earth Leakage units, Switches, Meters
            and various Din rail products. Distribution Boards SA has the
            facilities to Design, Manufacture, Assemble, Wire and test
            Electrical Boards and Distribution Panels of any kind.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
