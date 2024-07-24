import React, { useState } from "react";
import { useUploadProductImageMutation } from "../../Redux/Api/productSlice";
import { useCreateCategoryMutation } from "../../Redux/Api/categorySlice";
import { toast } from "react-toastify";

const CreateCategories = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [startingRate, setStartingRate] = useState(0);
  const [uploadImage] = useUploadProductImageMutation();
  const [createCategory] = useCreateCategoryMutation();
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

  const createCategoryHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("startingRate", startingRate);
    formData.append("image", image);
    try {
      const res = await createCategory(formData).unwrap();

      return toast.success("successfully created");
    } catch (error) {
      return toast.error(error.data.error || error.error);
    }
  };
  return (
    <div className="flex w-full flex-col justify-start items-center p-5 vsm:p-0 mt-6 gap-3">
      <div className="flex w-full justify-center items-center">
        <div className="text-[26px] w-full flex justify-center text-center smd:w-[70%] sm:text-[22px] vsm:text-[18px] sm:w-[85%] uppercase tracking-wider mb-4 ">
          Create new Category here
        </div>
      </div>
      <div className="w-full min-h-screen smd:flex-col flex-wrap flex items-start justify-around smd:justify-start smd:items-center  p-7 md:px-4  smd:p-5 gap-10 md:gap-3">
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
            onClick={createCategoryHandler}
            className="w-[160px] bg-[#525CEB] h-[60px] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategories;
