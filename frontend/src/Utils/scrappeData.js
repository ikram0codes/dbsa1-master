import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../Redux/constant";

// Create an axios instance with base URL and default headers
const api = axios.create({
  baseURL: `${BASE_URL}/api/scrapper`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Helper function for handling toast notifications
const handleToastNotification = (notifyPromise) =>
  toast.promise(
    notifyPromise,
    {
      pending: "Scraping in progress...",
      success: "Scraping successful 👌",
      error: "Scraping failed 🤯",
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

// Function to scrape data from ChintGlobal
export const scrappeChintGlobal = async (url) => {
  const notifyPromise = api.post("/chintglobal", { url });
  handleToastNotification(notifyPromise);

  try {
    const res = await notifyPromise;
    return res;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

// Function to scrape data from ABB
export const scrappeAbb = async (url) => {
  const notifyPromise = api.post("/abb", { url });
  handleToastNotification(notifyPromise);

  try {
    const res = await notifyPromise;
    return res;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

// Function to scrape data from SE
export const scrappeSE = async (url) => {
  const notifyPromise = api.post("/se", { url });
  handleToastNotification(notifyPromise);

  try {
    const res = await notifyPromise;
    return res;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

// Function to save a product
export const saveProduct = async (product) => {
  try {
    const res = await api.post("/saveproduct", product);
    toast.success(res.data.message);
    return null;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
    return null;
  }
};
