import React, { useEffect } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
// import React from "react";
import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// import "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
import { useLocation } from "react-router-dom";

const ContactUs = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div className="flex w-[100vw] min-h-[100vh] font2 md:flex-col md:min-h-0 py-5">
      <div className="w-1/2 h-full p-10 md:w-full">
        <h1 className="text-3xl logo text-center text-secondary">Contact Us</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5867.1861666725845!2d28.0911027946588!3d-26.120974874308505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950d41a065d5f7%3A0xa7387cd67c3d7cf0!2s79%209th%20Rd%2C%20Kew%2C%20Johannesburg%2C%202090%2C%20South%20Africa!5e0!3m2!1sen!2sin!4v1715660735832!5m2!1sen!2sin"
          allowfullscreen=""
          loading="lazy"
          className="w-full h-[400px] my-10 rounded-md shadow-lg shadow-slate-400 "
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        <p className="text-xl font2 logo text-center text-third md:text-xl vsm:text-lg">
          Have questions or want to learn more about our services? We're here to
          help! Feel free to reach out to us using the contact information below
          or fill out the form, and we'll get back to you as soon as possible.
        </p>
      </div>
      <div className="w-1/2 p-10 flex flex-col logo text-3xl text-center sm:px-10 md:w-full md:min-h-0 text-secondary">
        <h1 className="text-3xl">OUR DETAILS</h1>
        <div className="w-full min-h-[70vh] text-third tracking-widest flex flex-col gap-5 justify-center items-center md:min-h-0 md:mt-6 vsm:tracking-normal">
          <div className="flex flex-col items-center w-full justify-center gap-5 text-xl">
            <FaPhoneAlt className="text-5xl text-sixth" />
            <h1>+27765123912</h1>
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-5 text-xl">
            <MdEmail className="text-5xl text-sixth" />
            <h1>info@electricalboards.co.za</h1>
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-5 text-xl">
            <FaLocationDot className="text-5xl text-sixth" />
            <h1>79 9th Road, Kew, JHB, 2090</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
