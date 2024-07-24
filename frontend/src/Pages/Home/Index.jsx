import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import About from "./About";
import LatestProjects from "./LatestProjects";
import PageLinks from "./PageLinks";
import TopProducts from "./TopProducts";
import ImageComparison from "./ImageComparison";
import Banner from "./Banner";
import Category from "./Category";
import Certificates from "./Certificates";
import Brands from "./Brands";
import ImageHotSpot from "./ImageHotSpot";
import Loader from "../../Components/Loader";
import LinkedIn from "../other/Linkedin";
const LazyHeroSection = React.lazy(() => import("./HeroSection"));

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/auth/login/success`,
          {
            withCredentials: true,
          }
        );
        dispatch(
          setCredential({
            email: res.data.email,
            _id: res.data._id,
            isAdmin: res.data.isAdmin,
            username: res.data.displayName,
          })
        );
      } catch (error) {
        toast.error(error?.data?.error || error?.error);
      }
    };
    getUser();
  }, [dispatch]);

  return (
    <div className="w-full relative styleFont">
      <Suspense fallback={<Loader />}>
        <LazyHeroSection />
      </Suspense>
      <About />
      <ImageComparison />
      <LatestProjects />
      <PageLinks />
      <TopProducts />
      <ImageHotSpot />
      <LinkedIn />
      <Category />
      <Certificates />
      <Brands />
    </div>
  );
};

export default Home;
