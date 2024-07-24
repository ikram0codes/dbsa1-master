import React, { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { GrDocumentWindows } from "react-icons/gr";
import { BASE_URL } from "../../Redux/constant.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUploadProductImageMutation } from "../../Redux/Api/productSlice.js";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");
  const [uploadImage] = useUploadProductImageMutation();
  const fileInputRef = useRef(null);

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const tags = ["brochure", "certificate"];

  const handleUpload = async () => {
    if (!file || !name || !tag || !image) {
      return toast.error("Please fill all the fields!");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("tag", tag);
    formData.append("image", image);

    const uploadPromise = axios.post(
      `${BASE_URL}/api/document/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    toast.promise(
      uploadPromise,
      {
        pending: "Uploading document...",
        success: "Document uploaded successfully 👌",
        error: "Document upload failed 🤯",
      },
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

    try {
      await uploadPromise;
      setFile(null);
      setName("");
      setTag("");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6 mt-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Upload Document
      </h2>

      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-full max-w-[400px] h-[250px] flex justify-center items-center bg-gray-100 shadow-lg rounded-2xl overflow-hidden cursor-pointer transition duration-200 hover:shadow-xl"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              id="doc-uploader"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            />
            <div className="flex items-center justify-center">
              {file === null ? (
                <span className="text-gray-500">Choose A Document</span>
              ) : image !== "" ? (
                <img
                  src={image}
                  alt="Document"
                  className="object-cover w-full h-full"
                />
              ) : (
                <GrDocumentWindows className="text-gray-400 text-6xl" />
              )}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={uploadImageHandler}
          />

          <input
            className="w-full max-w-[400px] px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Document's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="w-full max-w-[400px]">
            <label htmlFor="tags" className="text-gray-600 text-lg">
              Tags
            </label>
            <select
              name="tags"
              id="tags"
              placeholder="Choose Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {tags.map((t, index) => (
                <option key={index} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="w-full max-w-[160px] bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex justify-center items-center gap-2"
          onClick={handleUpload}
        >
          <FaUpload /> Upload
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;
