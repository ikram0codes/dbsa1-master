import React, { useEffect } from "react";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
// import moment from "moment/moment";
import { Link, useLocation } from "react-router-dom";
import { useAllProjectQuery } from "../../Redux/Api/projectSlice";

const AllProject = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const { data: projects, isLoading, error } = useAllProjectQuery();
  console.log(projects);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.error || error.error}</Message>
  ) : (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-[30px] font2 font-[500] my-4 ">Projects</h1>
      <div className="w-[80%] sm:w-[92%] vsm:w-[100%] flex flex-wrap justify-center gap-8">
        {projects.map((b) => {
          return (
            <div
              key={b._id}
              className="w-[340px] sm:w-full gap-2 rounded-md shadow-md sm:shadow-none sm:border-b-2 shadow-slate-600 p-4 sm:p-2  h-auto flex flex-col"
            >
              <img
                src={b.image}
                alt={b.title}
                className="object-contain w-[228px] mb-4 h-[130px]"
              />
              <h1 className="text-[20px] uppercase font1 font-[600] tracking-wider">
                {b.title}
              </h1>
              {/* <p className="text-[15px] text-[#82828B] uppercase font2 tracking-wider font-[400] ">
                {moment(b.createAt).format("MMMM Do YYYY")}
              </p> */}
              <p className="text-[#82828B] flex flex-col text-[16px] tracking-wider mt-4 font-[400]">
                {b?.description.substring(0, 200)}...
                <Link
                  to={b._id}
                  className="text-[#525CEB] hover:underline font-[500]"
                >
                  Read more
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProject;
