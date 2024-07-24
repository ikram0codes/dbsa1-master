import axios from "axios";
import React, { useState, useCallback } from "react";
import Annotation from "react-image-annotation";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../assets/createToolTip.css"; // Assuming this file contains additional styles
import { useUploadProductImageMutation } from "../../Redux/Api/productSlice";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../../Redux/constant";

const CreateToolTip = () => {
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});
  const [image, setImage] = useState("");
  const [redirectUrls, setRedirectUrls] = useState({});
  const [uploadImage] = useUploadProductImageMutation();
  const [viewAnnotationsModal, setViewAnnotationsModal] = useState(false);
  const [annotationImage, setAnnotationImage] = useState("");

  const onChange = useCallback((annotation) => {
    setAnnotation({
      ...annotation,
      data: { ...annotation.data, id: annotation?.data?.id || uuidv4() },
    });
  }, []);

  const onSubmit = useCallback(
    (annotation) => {
      const { geometry, data } = annotation;
      const id = data.id;
      setAnnotations((prevAnnotations) => [
        ...prevAnnotations,
        {
          id,
          geometry,
          data: {
            ...data,
            redirectUrl: redirectUrls[id] || "",
            image: annotationImage,
          },
        },
      ]);
      setAnnotation({});
      setAnnotationImage(""); // Reset annotation image after submission
    },
    [redirectUrls, annotationImage]
  );

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const uploadAnnotationImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setAnnotationImage(res.image);
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleUpload = async () => {
    if (!image || annotations.some((annot) => !annot.data.redirectUrl)) {
      return toast.error("Please fill in all fields!");
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/tooltip/create`,
        { image, annotations },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
  };

  const handleUrlChange = (id, value) => {
    setRedirectUrls((prevUrls) => ({
      ...prevUrls,
      [id]: value,
    }));
  };

  const handleAnnotationClick = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  const deleteAnnotation = (id) => {
    setAnnotations((prevAnnotations) =>
      prevAnnotations.filter((annot) => annot.id !== id)
    );
    toast.success("Annotation deleted successfully.");
  };

  const toggleViewAnnotationsModal = () => {
    setViewAnnotationsModal((prev) => !prev);
  };

  const deleteAnnotationImage = () => {
    setAnnotationImage("");
  };

  return (
    <div className="p-5 flex flex-col items-center w-full gap-5 md:gap-10 overflow-auto">
      <div className="text-gray-800 text-2xl font-semibold mt-5 tracking-wide w-full text-center">
        Select an Image to Add Hotspots
      </div>
      {!image ? (
        <div className="w-full max-w-md h-80 flex items-center justify-center">
          <label className="w-full h-full bg-gray-100 flex items-center justify-center cursor-pointer rounded-lg shadow-md border border-gray-300 hover:bg-gray-200 transition duration-200">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={uploadImageHandler}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="wrapper rounded-xl relative w-full max-w-3xl overflow-hidden shadow-lg">
          <Annotation
            src={image}
            alt="Annotatable"
            annotations={annotations}
            type="POINT"
            value={annotation}
            onChange={onChange}
            onSubmit={onSubmit}
          />
          {annotations.map((annot) => (
            <div
              key={annot.id}
              data-tip={annot.data.text}
              onClick={() => handleAnnotationClick(annot.data.redirectUrl)}
              style={{
                position: "absolute",
                top: `${annot.geometry.y * 100}%`,
                left: `${annot.geometry.x * 100}%`,
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "red",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                cursor: "pointer",
              }}
            />
          ))}
          <ReactTooltip />
        </div>
      )}
      {annotation.geometry && annotation.data.id && (
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Enter redirect URL for this annotation"
            value={redirectUrls[annotation.data.id] || ""}
            onChange={(e) =>
              handleUrlChange(annotation.data.id, e.target.value)
            }
            className="mt-4 p-2 border rounded w-full"
          />
          <div className="mt-2">
            {annotationImage ? (
              <div className="relative">
                <img
                  src={annotationImage}
                  alt="Annotation"
                  className="w-full h-48 object-cover rounded"
                />
                <button
                  onClick={deleteAnnotationImage}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  Delete Image
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={uploadAnnotationImageHandler}
                className="mt-2 p-2 border rounded w-full"
              />
            )}
          </div>
        </div>
      )}
      <button
        className="w-full max-w-xs md:max-w-md bg-blue-500 h-12 py-3 text-lg rounded-lg text-white shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
        onClick={handleUpload}
      >
        Upload Image
      </button>

      {/* Modal for viewing annotations */}
      {viewAnnotationsModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Annotations</h2>
            <ul>
              {annotations.map((annot) => (
                <li key={annot.id} className="mb-2">
                  <p>{annot.data.text}</p>
                  <button
                    onClick={() => deleteAnnotation(annot.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={toggleViewAnnotationsModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Button to toggle view annotations modal */}
      <button
        className="mt-4 bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={toggleViewAnnotationsModal}
      >
        View Annotations
      </button>
    </div>
  );
};

export default CreateToolTip;
