import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FaDownload } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Redux/constant";
import { TfiAgenda } from "react-icons/tfi";

const Index = () => {
  const [docs, setDocs] = useState([]);
  const [tag, setTag] = useState(null);
  const getAllDocs = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/api/document/all/${tag}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDocs(res.data.docs);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllDocs();
  }, [tag]);

  const handleDownload = async (docUrl) => {
    try {
      const response = await axios.get(docUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", docUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Download failed.");
    }
  };
  return (
    <div className="min-h-[60vh] w-full flex h-max justify-start flex-col gap-[30px] items-start pr-[50px] pl-[50px] mt-[3rem] relative sm:pr-[15px] sm:pl-[15px] overflow-hidden">
      <div className="flex justify-start items-center gap-[30px] usm:gap-[10px]">
        <h1 className="text-[30px] font2 font-[600]">Downloads</h1>
        <div className="w-[35vmax] h-[3px] bg-[#525CEB] usm:w-[10rem] vsm:w-[7rem]"></div>
      </div>
      <div className="w-full h-max flex justify-start items-start gap-[20px] usm:flex-col usm:items-center">
        <div
          className="w-[15rem] h-[15rem] bg-black text-white rounded-md flex justify-center items-center gap-[20px] flex-col cursor-pointer usm:w-[95%]"
          onClick={() => {
            setTag("brochure");
          }}
        >
          <TfiAgenda style={{ fontSize: "70px", color: "#525CEB" }} />
          <div className="text-[20px]">Brochures</div>
        </div>
        <div
          onClick={() => {
            setTag("certificate");
          }}
          className="w-[15rem] h-[15rem] bg-black text-white rounded-md flex justify-center items-center gap-[20px] flex-col cursor-pointer usm:w-[95%]"
        >
          <GrCertificate style={{ fontSize: "70px", color: "#525CEB" }} />
          <div className="text-[20px]">Certificate</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 w-full h-full  justify-between items-center slg:grid-cols-2 usm:flex usm:justify-start usm:items-center usm:flex-col">
        {tag !== null &&
          docs?.length !== 0 &&
          docs?.map((doc) => {
            return (
              <div
                key={doc.id}
                className="bg-[#e8e5e5] w-[20rem] h-[20rem] rounded-md p-[10px] sm:w-[16rem] usm:w-full"
              >
                <div className="w-full h-full flex flex-col justify-around items-center">
                  <div className="text-[25px] text-center font-medium">
                    {doc.name}
                  </div>
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-[80%] h-max max-h-[12rem] object-cover object-center rounded-md"
                  />
                  <div className="w-full flex justify-around items-center">
                    <a
                      href={doc.url}
                      target="__blank"
                      className="w-[8rem] h-[2.5rem] flex justify-center items-center gap-[8px] bg-[#525CEB] text-white p-[5px] rounded-sm font-normal sm:w-[7rem] usm:w-[8rem]"
                    >
                      Preview
                      <CgSearch style={{ fontSize: "20px" }} />
                    </a>
                    <button
                      onClick={() => handleDownload(doc.url)}
                      className="w-[8rem] h-[2.5rem] flex justify-center items-center gap-[5px] bg-[#525CEB] text-white p-[5px] rounded-sm font-normal sm:w-[7rem] usm:w-[8rem]"
                    >
                      Download
                      <FaDownload style={{ fontSize: "20px" }} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Index;
