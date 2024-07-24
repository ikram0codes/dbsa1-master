import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { useSelector } from "react-redux";
import { useGetProjectQuery } from "../../Redux/Api/projectSlice";

const SingleProject = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const { userInfo } = useSelector((state) => state.auth);
  const { data: project, isLoading, error } = useGetProjectQuery(id);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.error || error.error}</Message>
  ) : (
    <div className="container mx-auto p-6 flex flex-col items-center gap-5">
      <h1 className="text-4xl font-bold tracking-wide text-center mt-6 mb-4 sm:text-3xl xs:text-2xl">
        {project?.title}
      </h1>
      <img
        src={project?.image}
        alt={project?.title}
        className="w-full max-w-md  object-cover rounded-md shadow-lg"
      />
      <div className="w-full max-w-2xl text-gray-600 text-lg tracking-wide text-center mt-4 px-4 sm:text-base xs:text-sm">
        {project?.description}
      </div>
      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <Link
          to="/project"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-300 text-lg tracking-wide font-medium"
        >
          Back
        </Link>
        {userInfo && userInfo.isAdmin && (
          <Link
            to={`/adminMenu/update/project/${project?._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-300 text-lg tracking-wide font-medium"
          >
            Update
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
