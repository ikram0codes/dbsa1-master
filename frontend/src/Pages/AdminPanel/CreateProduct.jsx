import React, { useEffect, useState } from "react";
// import { useAllCategoryQuery } from "../../redux/Api/categoryApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../Redux/Api/productSlice";
import { useGetAllCategoryQuery } from "../../Redux/Api/categorySlice";
import { useGetAllBrandQuery } from "../../Redux/Api/brandSlice";
// import AdminPanel from "../../components/AdminPanel";

const CreateProduct = () => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [uploadImage] = useUploadProductImageMutation();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoryQuery();
  const { data: brands } = useGetAllBrandQuery();
  const [information, setInformation] = useState("");
  const navigate = useNavigate();

  const uploadImageHandler1 = async (e, index) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage1(res.image);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.error || error.error);
    }
  };
  const uploadImageHandler2 = async (e, index) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage2(res.image);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };
  const uploadImageHandler3 = async (e, index) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage3(res.image);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("mainImage", image1);
    formData.append("sideImage1", image2);
    formData.append("sideImage2", image3);
    formData.append("discount", discount);
    formData.append("countInStock", stock);
    formData.append("information", information);
    try {
      const res = await createProduct(formData).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`${res.name} is created`);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.data.error || error.error);
    }
  };

  return (
    <div className="min-h-screen w-full font2 flex flex-col items-center p-4 ">
      <div className="text-gray-500 font2 text-2xl mt-5 tracking-wider ">
        Create Product
      </div>
      <div className="">
        <div className="flex justify-around flex-wrap gap-7 mt-7 items-center ">
          <div className="flex font2 relative w-[320px] group h-[320px] justify-center items-center bg-[#EDEBE9] rounded-[20px]">
            <img
              src={image1}
              alt=""
              className={`w-[250px] h-[250px] object-contain ${
                image1 ? "block" : "hidden"
              } `}
            />
            <div className="absolute w-[320px] h-[320px] left-0 top-0">
              <label
                className={`w-full overflow-hidden shadow-md shadow-slate-400 h-full bg-[#EDEBE9] flex-wrap text-black ${
                  image1 ? "hidden" : "flex"
                } rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`}
              >
                {image1 ? image1.name : "Upload Main Image"}
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={uploadImageHandler1}
                  className={`${!image1 ? "hidden" : "text-black"} `}
                />
              </label>
            </div>
          </div>
          <div className="flex relative w-[320px] group h-[320px] justify-center items-center bg-[#EDEBE9] rounded-[20px]">
            <img
              src={image2}
              alt=""
              className={`w-[250px] h-[250px] object-contain ${
                image2 ? "block" : "hidden"
              } `}
            />
            <div className="absolute overflow-hidden  w-[320px] h-[320px] left-0 top-0">
              <label
                className={`w-full h-full bg-[#EDEBE9] flex-wrap text-black ${
                  image2 ? "hidden" : "flex"
                } rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`}
              >
                {image2 ? image2.name : "Upload Side Image 1"}
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={uploadImageHandler2}
                  className={`font2 ${!image2 ? "hidden" : "text-black"}`}
                />
              </label>
            </div>
          </div>
          <div className="flex relative w-[320px] group h-[320px] justify-center items-center bg-[#EDEBE9] rounded-[20px]">
            <img
              src={image3}
              alt=""
              className={`w-[250px] h-[250px] object-contain ${
                image3 ? "block" : "hidden"
              } `}
            />
            <div className="absolute w-[320px] h-[320px] left-0 top-0">
              <label
                className={`w-full overflow-hidden h-full shadow-md shadow-slate-400 bg-[#EDEBE9] flex-wrap text-black ${
                  image3 ? "hidden" : "flex"
                } rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`}
              >
                {image3 ? image3.name : "Upload Side Image 2"}
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={uploadImageHandler3}
                  className={`${!image3 ? "hidden" : "text-black"}`}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-between gap-4 mt-5">
          <div className="flex flex-col w-[45%] sm:w-full gap-2">
            <label htmlFor="name" className="text-gray-500 text-xl">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"
            />
          </div>
          <div className="flex font2 flex-col w-[45%] sm:w-full gap-2">
            <label htmlFor="price" className="text-gray-500 text-xl">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="px-5 font2 py-3 border-2  border-gray-400 focus:outline-none rounded-md"
            />
          </div>
        </div>
        <div className="w-full flex justify-between flex-wrap gap-4 mt-5">
          <div className="flex flex-col w-[45%] sm:w-full  gap-2">
            <label htmlFor="brand" className="text-gray-500 text-xl">
              Brand
            </label>
            <select
              name="brand"
              id="brand"
              placeholder="Choose Brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              className="px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"
            >
              <option value="">select</option>
              {brands?.allBrand.map((c) => {
                return (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col w-[45%] sm:w-full gap-2">
            <label htmlFor="discount" className="text-gray-500 text-xl">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              placeholder="discount"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              className="px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="description" className="text-gray-500 text-xl">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="px-5 py-3 border-2 border-gray-400 mt-2 min-h-[120px] focus:outline-none rounded-md"
          ></textarea>
        </div>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="details" className="text-gray-500 text-xl">
            Product Details (Optional)
          </label>
          <textarea
            type="text"
            name="Product Details"
            id="details"
            placeholder="description"
            value={information}
            onChange={(e) => {
              setInformation(e.target.value);
            }}
            className="px-5 py-3 border-2 border-gray-400 mt-2 min-h-[120px] focus:outline-none rounded-md"
          ></textarea>
        </div>
        <div className="w-full flex flex-wrap sm:gap-4  justify-between mt-5 ">
          <div className="flex flex-col w-[45%] sm:w-full  gap-2">
            <label htmlFor="category" className="text-gray-500 text-xl">
              Category
            </label>
            <select
              name="category"
              id="category"
              placeholder="Choose Category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"
            >
              <option value="">select</option>
              {categories?.allCategory.map((c) => {
                return (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col w-[45%] sm:w-full gap-2">
            <label htmlFor="stock" className="text-gray-500 text-xl">
              Count in Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="stock"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              className="px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"
            />
          </div>
        </div>
        <div className="w-full flex mt-5">
          <button
            onClick={submitHandler}
            className="w-[160px] bg-[#525CEB] capitalize text-[18px] tracking-wider font-[350] py-3 rounded-lg text-white "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
