import React from "react";
import { useGetByBrandQuery } from "../../Redux/Api/productSlice";
// import category from "../../../../backend/model/categoryModel";

const GetFillteredProduct = () => {
  const { data, isLoading } = useGetByBrandQuery({
    brand: "ABB,SPARK",
    highPrice: 2301,
    category: "661220b33969bfc4a830ec15",
  });
  console.log(data);
  return <div>hello</div>;
};

export default GetFillteredProduct;
// category: "661220b33969bfc4a830ec15",
