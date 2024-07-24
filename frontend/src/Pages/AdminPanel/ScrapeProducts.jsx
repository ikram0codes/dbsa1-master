import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useGetAllCategoryQuery } from "../../Redux/Api/categorySlice";
import { useGetAllBrandQuery } from "../../Redux/Api/brandSlice";
import {
  saveProduct,
  scrappeAbb,
  scrappeChintGlobal,
  scrappeSE,
} from "../../Utils/scrappeData";
const ScrapeProducts = () => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [description, setDescription] = useState("");
  const [information, setInformation] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const { data: categories } = useGetAllCategoryQuery();
  const { data: brands } = useGetAllBrandQuery();
  const [url, setUrl] = useState("");
  const [website, setWebsite] = useState("");
  const websites = ["ChintGlobal", "Abb", "SchneiderElecric"];
  const [loading, setLoading] = useState(false);
  const handleScrappeSubmit = async () => {
    if (url === "") {
      return toast.error("Enter A Url");
    }
    const parsedUrl = new URL(url);

    if (!website) {
      return toast.error("Choose a website");
    }
    try {
      if (
        website === "ChintGlobal" &&
        parsedUrl.hostname === "chintglobal.com"
      ) {
        let data = await scrappeChintGlobal(url);
        let product = data.data.product;
        setImage1(product.mainImage);
        setImage2(product.sideImage1);
        setImage3(product.sideImage2);
        setName(product.name);
        setDescription(product.description);
        setInformation(product.information);
        setLoading(false);
        return null;
      }
      if (website === "Abb" && parsedUrl.hostname === "new.abb.com") {
        let data = await scrappeAbb(url);
        let product = data.data.product;
        setImage1(product.mainImage);
        setImage2(product.sideImage1);
        setImage3(product.sideImage2);
        setName(product.name);
        setDescription(product.description);
        setInformation(product.information);
        setLoading(false);
        return null;
      }
      if (
        website === "SchneiderElecric" &&
        parsedUrl.hostname === "www.se.com"
      ) {
        let data = await scrappeSE(url);
        let product = data.data.product;
        setImage1(product.mainImage);
        setImage2(product.sideImage1);
        setImage3(product.sideImage2);
        setName(product.name);
        setInformation(information);
        setDescription(product.description);
        setLoading(false);

        return null;
      }

      return toast.error("Url and Website Don't Match!");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const handleSubmitSave = async () => {
    switch (true) {
      case !name:
        return toast.error("Name is required!");
      case !price:
        return toast.error("price is required!");

      case !category:
        return toast.error("category is required!");
      case !brand:
        return toast.error("Brand is required!");
      case !description:
        return toast.error("Description is required!");
      case !image1:
        return toast.error("Image1 is required!");

      case !image2:
        return toast.error("Image2 is required!");

      case !image3:
        return toast.error("Image3 is required!");
    }
    let product = {
      name,
      description,
      information,
      mainImage:image1,
      image2,
      image3,
      category,
      brand,
      price,
      discount,
      stock,
    };
    await saveProduct(product);
  };
  return (
    <>
      <div className="min-h-screen w-full font2  flex flex-col items-center p-4 overflow-x-hidden">
        <div className="text-gray-500 font2 text-2xl mt-5 tracking-wider text-center">
          Scrape Product Then Upload It
        </div>
        <div className="w-full h-max p-[16px]">
          <div className="">
            <div className="w-full h-max flex justify-between items-center sm:flex-col gap-[20px]">
              <div className="flex font2 flex-col w-[45%] sm:w-full gap-2">
                <label htmlFor="url" className="text-gray-500 text-xl">
                  Url
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Enter The Url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  className="px-5 font2 py-3 border-2  border-gray-400 focus:outline-none rounded-md"
                />
              </div>

              <div className="flex flex-col w-[45%] sm:w-full  gap-2">
                <label htmlFor="website" className="text-gray-500 text-xl">
                  Choose Website
                </label>
                <select
                  name="website"
                  id="website"
                  placeholder="Choose Website"
                  value={brand}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                  className="px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"
                >
                  <option value="">{website || "Select"}</option>
                  {websites.map((c, index) => {
                    return (
                      <option key={index + 11} value={c}>
                        {c}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="w-full flex mt-5">
              <button
                disabled={
                  image1 !== "" || name !== "" || description !== "" || loading
                }
                onClick={handleScrappeSubmit}
                className="w-[160px] bg-[#525CEB] capitalize text-[18px] tracking-wider font-[350] py-3 rounded-lg text-white"
              >
                Scrape Data
              </button>
            </div>
          </div>
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
                  {image1 ? image1.name : "Product Main Image"}
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
                  {image2 ? image2.name : "Product Side Image 1"}
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
                  {image3 ? image3.name : "Product Side Image 2"}
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
                // disabled={!name}
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
                Product Details (If Scraped Don't Edit it.)
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
              onClick={handleSubmitSave}
              className="w-[160px] bg-[#525CEB] capitalize text-[18px] tracking-wider font-[350] py-3 rounded-lg text-white "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrapeProducts;
