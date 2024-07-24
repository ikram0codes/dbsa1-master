import React, { useEffect, useState } from "react";
// import {
//   useGetAllCategoryQuery,
//   useUpdateCategoryMutation,
// } from "../../Redux/Api/categorySlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { toast } from "react-toastify";
import { useUploadProductImageMutation } from "../../Redux/Api/productSlice";
import {
  useGetAllBrandQuery,
  useUpdateBrandMutation,
} from "../../Redux/Api/brandSlice";
const BrandList = () => {
  const [brandId, setBrandId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [uploadImage] = useUploadProductImageMutation();
  const [updateBrand, { isLoading: updateLoading }] = useUpdateBrandMutation();
  const { data: brands, isLoading, error } = useGetAllBrandQuery();
  console.log(brands);

  const selectedBrand =
    brands && brands.allBrand.find((b) => b._id === brandId);

  //   console.log(selectedCategory);

  useEffect(() => {
    setImage(selectedBrand?.image);
    setName(selectedBrand?.name);
  }, [brandId]);

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBrandHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    try {
      const res = await updateBrand({
        data: formData,
        brandId: brandId,
      }).unwrap();
      console.log(res);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("successfully updated");
        setBrandId("");
      }
    } catch (error) {
      toast.error(error.data.error || error.error);
      console.log(error);
    }
  };
  //   console.log(image);
  //   console.log(categoryId);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.error || error.error}</Message>
  ) : (
    <div className="w-full font2 min-h-screen p-6">
      <h1 className="text-gray-600  text-[22px] font-[400] my-4">Brands</h1>
      <div className="w-full mb-4 flex flex-wrap gap-5 ">
        {brands?.allBrand.map((c) => {
          return (
            <button
              key={c._id}
              onClick={() => {
                setBrandId(c._id);
              }}
              className="border-[#525CEB] font2 uppercase border-[2px] hover:bg-[#525CEB] hover:text-white text-[#525CEB] px-3 py-2 rounded-lg
              tracking-widest"
            >
              {c.name}
            </button>
          );
        })}
      </div>
      <div className="">
        <h1 className="text-gray-600  text-[22px] font-[400] my-6">
          Update Brand
        </h1>
        {!brandId ? (
          <h1 className="text-gray-600 font2 font-[400] uppercase">
            {" "}
            please click on brand to update
          </h1>
        ) : (
          <div className="w-full min-h-screen flex-wrap flex sm:flex-col sm:items-center items-start justify-start smd:justify-start  p-7 md:px-4  smd:p-5 vsm:p-0 gap-6 md:gap-3">
            <div className="flex relative w-[280px] group h-[180px] justify-center items-center bg-[#EDEBE9] rounded-[20px]">
              <img
                src={image}
                alt=""
                className={`w-[220px] h-[137px] object-contain ${
                  image ? "block" : "hidden"
                } `}
              />
              <div className="absolute w-[280px] h-[180px] left-0 top-0">
                <label
                  className={`w-full overflow-hidden h-full shadow-md shadow-slate-400 bg-[#EDEBE9] smd:bg-transparent flex-wrap text-black ${
                    image ? "hidden" : "flex"
                  } rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`}
                >
                  {image ? image.name : "Upload Main Image"}
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={uploadImageHandler}
                    className={`${!image ? "hidden" : "text-black"} `}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col w-[280px] md:w-[280px] smd:w-[280px] relative  left-0 items-start  gap-5 ">
              <div className="flex flex-col w-full gap-3 items-center justify-between">
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className=" w-full focus:outline-none px-3 py-2 border-[2px] border-black rounded-lg"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button
                onClick={updateBrandHandler}
                className={`w-[160px] bg-[#525CEB] ${
                  updateLoading && "cursor-wait"
                } h-[50px] py-1 capitalize text-[18px] font2 tracking-wider font-[350] rounded-lg text-white `}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandList;
