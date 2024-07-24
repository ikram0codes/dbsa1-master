import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Annotation from "react-image-annotation";
import "../../assets/createToolTip.css";
import { IoIosArrowForward, IoIosArrowBack, IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

import { BASE_URL } from "../../Redux/constant";

const AnnotBox = ({ setShowAnnotBox, setAnnotData, annotData }) => {
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-[#0d0b0be9] z-[10000] flex justify-center items-center">
      <button
        className="absolute top-0 right-0 text-[50px] m-[20px]"
        onClick={() => {
          setShowAnnotBox(false);
          setAnnotData(null);
        }}
      >
        <IoIosClose color="red" />
      </button>
      <div className="relative w-[70vw] h-max flex justify-start items-center flex-col gap-[20px]">
        {annotData.image !== "" ? (
          <img
            className="w-max h-max max-h-[70vh] rounded-lg object-cover object-center"
            src={annotData.image}
            alt="Annotation Image"
          />
        ) : (
          <div className="w-full overflow-hidden h-[70vh] rounded-lg flex justify-center items-center text-[30px] font-semibold shadow-md shadow-slate-400 bg-[#EDEBE9] smd:bg-transparent flex-wrap text-black ">
            No Image Found!
          </div>
        )}
        <Link
          target={"_blank"}
          to={annotData.redirectUrl}
          className="w-[8rem] h-[3rem] border-none outline-none flex justify-center items-center bg-[#525CEB] capitalize text-[18px] tracking-wider font-[350]  rounded-lg text-white "
        >
          Visit
        </Link>
      </div>
    </div>
  );
};

const ImageHotSpot = () => {
  const [imageHotSpots, setImageHotSpots] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [showAnnotBox, setShowAnnotBox] = useState(false);
  const [annotData, setAnnotData] = useState(null);
  const getAllToolTipImages = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tooltipimages/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setImageHotSpots(res.data.imageHotspots);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    getAllToolTipImages();
  }, [getAllToolTipImages]);

  useEffect(() => {
    if (autoSlide) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < imageHotSpots.length - 1 ? prevIndex + 1 : 0
        );
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [autoSlide, imageHotSpots.length]);

  const handlePrevious = () => {
    setAutoSlide(false);
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imageHotSpots.length - 1
    );
  };

  const handleNext = () => {
    setAutoSlide(false);
    setCurrentIndex((prevIndex) =>
      prevIndex < imageHotSpots.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="w-full flex justify-center mt-8 relative">
      {showAnnotBox && (
        <AnnotBox
          setShowAnnotBox={setShowAnnotBox}
          setAnnotData={setAnnotData}
          annotData={annotData}
        />
      )}
      <div className="w-[80%] max-w-screen-xl flex flex-col items-center gap-4">
        <div className="w-full text-[30px] font-bold text-left">Tool Tip</div>
        <div className="relative w-full overflow-hidden">
          {imageHotSpots.length === 0 ? (
            <h1 className="text-xl text-gray-500">No ToolTips Found!</h1>
          ) : (
            <div className="w-full flex items-center">
              <button className="slider-button prev" onClick={handlePrevious}>
                <IoIosArrowBack />
              </button>
              <div className="relative w-full h-full flex justify-center items-center">
                <Annotation
                  src={imageHotSpots[currentIndex].image}
                  alt="Annotatable"
                  annotations={imageHotSpots[currentIndex].annotations}
                  type="POINT"
                  value={imageHotSpots[currentIndex].annotation}
                  onClick={() => {
                    const annotation = imageHotSpots[
                      currentIndex
                    ].annotations.find((annot) => annot.data?.redirectUrl);
                    if (annotation) {
                      setAnnotData({
                        redirectUrl: annotation.data.redirectUrl,
                        image: annotation.data.image,
                      });
                      setShowAnnotBox(true);
                    }
                  }}
                />
              </div>
              <button className="slider-button next" onClick={handleNext}>
                <IoIosArrowForward />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageHotSpot;
