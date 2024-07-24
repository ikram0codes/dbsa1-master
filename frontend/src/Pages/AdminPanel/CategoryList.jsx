import React, { useEffect, useState } from "react";
import {
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../Redux/Api/categorySlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { toast } from "react-toastify";
import { useUploadProductImageMutation } from "../../Redux/Api/productSlice";

const CategoryList = () => {
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [startingRate, setStartingRate] = useState(0);
  const [uploadImage] = useUploadProductImageMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const { data: categories, isLoading, error } = useGetAllCategoryQuery();

  const selectedCategory =
    categories && categories.allCategory.find((c) => c._id === categoryId);

  useEffect(() => {
    setImage(selectedCategory?.image);
    setName(selectedCategory?.name);
    setStartingRate(selectedCategory?.startingRate);
  }, [categoryId]);

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const updateCategoryHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("startingRate", startingRate);
    formData.append("image", image);
    try {
      const res = await updateCategory({
        data: formData,
        categoryId: categoryId,
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("successfully updated");
        setCategoryId("");
      }
    } catch (error) {
      return toast.error(error.data.error || error.error);
    }
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.error || error.error}</Message>
  ) : (
    <div className="w-full font2 min-h-screen p-6">
      <h1 className="text-gray-600  text-[22px] font-[400] my-4">Categories</h1>
      <div className="w-full mb-4 flex flex-wrap gap-5 ">
        {categories?.allCategory.map((c) => {
          return (
            <button
              key={c._id}
              onClick={() => {
                setCategoryId(c._id);
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
          Update Category
        </h1>
        {!categoryId ? (
          <h1 className="text-gray-600 font2 font-[400] uppercase">
            {" "}
            please click on category to update
          </h1>
        ) : (
          <div className="w-full min-h-screen flex-wrap flex items-start justify-around smd:justify-center  p-7 md:px-4  smd:p-5 gap-10 md:gap-3">
            <div className="flex relative w-[320px] group h-[320px] justify-center items-center bg-[#EDEBE9] rounded-[20px]">
              <img
                src={image}
                alt=""
                className={`w-[250px] h-[250px] object-contain ${
                  image ? "block" : "hidden"
                } `}
              />
              <div className="absolute w-[320px] h-[320px] left-0 top-0">
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
            <div className="flex flex-col w-[320px] md:w-[280px] smd:w-[320px] relative  left-0 items-start  gap-5 ">
              <div className="flex flex-col w-full gap-3 items-center justify-between">
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="focus:outline-none px-3 py-2 border-[2px] border-black rounded-lg"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="rate">Starting Price</label>
                  <input
                    type="number"
                    className="focus:outline-none px-3 py-2 border-[2px] border-black rounded-lg"
                    value={startingRate}
                    onChange={(e) => {
                      setStartingRate(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button
                onClick={updateCategoryHandler}
                className={`w-[160px] bg-[#525CEB] ${
                  updateLoading && "cursor-wait"
                } h-[60px] py-2 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white `}
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

export default CategoryList;
