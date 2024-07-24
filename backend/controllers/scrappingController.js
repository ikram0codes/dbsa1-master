import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { executablePath } from "puppeteer";

import Product from "../model/productModel.js";

// Wrapping the bot in Stealth Plugin to avoid being detected by the browser
puppeteer.use(StealthPlugin());

// Helper function to handle Puppeteer errors
const handlePuppeteerError = (res, error) => {
  console.error("Puppeteer Error:", error);
  return res.status(500).json({ message: error.message });
};

// Function to scrape data from ChintGlobal website
export const scrappeChintGlobalWebsite = async (req, res) => {
  const { url } = req.body;
  try {
    let browser = await puppeteer.launch({
     executablePath: "/usr/bin/chromium-browser", 
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
      timeout: 300000,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: ["domcontentloaded", "networkidle2"],
      timeout: 100000,
    });

    await page.waitForSelector("img", { timeout: 100000 });
    await page.waitForSelector(".product-detail-name", { timeout: 10000 });
    await page.waitForSelector(".chint-product-detail-info", { timeout: 10000 });

    const data = await page.evaluate(() => {
      let images = [];
      let name = document.querySelector(".product-detail-name")?.textContent || "No Title Found!";
      let imgs = document.querySelectorAll(".product-preview-box img");
      imgs.forEach((img) => {
        images.push(img.src);
      });

      let description = document.querySelector(".chint-product-detail-info > p")?.textContent || "This Product Has No Title!";

      let mainImage = images[0];
      let sideImage1 = images[1] || images[1];
      let sideImage2 = images[2] || images[1];

      let information = document.querySelector(".chint-product-detail-info")?.innerHTML || "";

      return { name, mainImage, sideImage1, sideImage2, description, information };
    });

    await browser.close();

    let product = {
      name: data.name,
      description: data.description,
      mainImage: data.mainImage,
      sideImage1: data.sideImage1,
      sideImage2: data.sideImage2,
      information: data.information,
    };

    return res.status(200).json({ message: "Product Scraped Successfully!", product });
  } catch (error) {
    return handlePuppeteerError(res, error);
  }
};

// Function to scrape data from ABB website
export const scrappeAbbWebsite = async (req, res) => {
  try {
    const { url } = req.body;

    let browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser", 
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
      timeout: 300000,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: ["domcontentloaded", "networkidle2"],
      timeout: 100000,
    });

    await page.waitForSelector("pis-products-details-gallery", { timeout: 10000 });
    await page.waitForSelector("pis-products-details-general-information", { timeout: 10000 });
    await page.waitForSelector("pis-products-details-attribute-groups", { timeout: 10000 });

    let data = await page.evaluate(() => {
      let images = [];
      const imageGallery = document.querySelector("pis-products-details-gallery");
      let imageShadow = imageGallery?.shadowRoot;
      let imgs = imageShadow?.querySelectorAll("img");
      imgs.forEach((img) => {
        images.push(img.src);
      });

      let mainImage = images[0];
      let sideImage1 = images[1] || images[0];
      let sideImage2 = images[2] || images[0];

      let descContainer = document.querySelector("pis-products-details-general-information");
      let descShadow = descContainer?.shadowRoot;
      let infos = descShadow?.querySelectorAll(".pis-print-only > div");

      let name = infos[0]?.innerHTML || "";
      let description = infos[infos.length - 1]?.innerHTML || "";

      let informationRoot = document.querySelector("pis-products-details-attribute-groups")?.shadowRoot;
      let information = informationRoot?.querySelector(".pis-products-details-attribute-groups > div")?.innerHTML || "";

      return { name, description, mainImage, sideImage1, sideImage2, information };
    });

    await browser.close();

    let product = {
      name: data.name,
      description: data.description,
      mainImage: data.mainImage,
      sideImage1: data.sideImage1,
      sideImage2: data.sideImage2,
      information: data.information,
    };

    return res.status(200).json({ message: "Product Scraped Successfully!", product });
  } catch (error) {
    return handlePuppeteerError(res, error);
  }
};

// Function to scrape data from Schneider Electric website
export const scrappeSEWebsite = async (req, res) => {
  const { url } = req.body;
  try {
    let browser = await puppeteer.launch({
   executablePath: "/usr/bin/chromium-browser", 
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
      timeout: 300000,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: ["domcontentloaded", "networkidle2"],
      timeout: 100000,
    });

    await page.waitForSelector("pes-range-main", { timeout: 10000 });
    await page.waitForSelector("pes-range-main", { timeout: 10000 });

    let data = await page.evaluate(() => {
      const mainRoot = document.querySelector("pes-range-main")?.shadowRoot;
      let secondRoot = mainRoot?.querySelector("pes-range-info")?.shadowRoot;

      let name = secondRoot?.querySelector("h1")?.textContent || "";
      let description = secondRoot?.querySelector("div.range-info__description")?.textContent || "";
      let mainImage = secondRoot?.querySelector("img")?.src || "";

      let sideImage1 = mainImage;
      let sideImage2 = mainImage;

      return { name, description, mainImage, sideImage1, sideImage2 };
    });

    await browser.close();

    let product = {
      name: data.name,
      description: data.description,
      mainImage: data.mainImage,
      sideImage1: data.sideImage1,
      sideImage2: data.sideImage2,
    };

    return res.status(200).json({ message: "Product Scraped Successfully!", product });
  } catch (error) {
    return handlePuppeteerError(res, error);
  }
};

// Function to save a product to database
export const saveProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      information,
      mainImage,
      sideImage1,
      sideImage2,
      category,
      brand,
      price,
      discount,
      stock,
    } = req.body;

    // Data Validation
    if (!name || !price || !category || !brand || !description) {
      return res.status(409).json({ message: "Missing required fields!" });
    }

    let product = await Product.create({
      name,
      description,
      information,
      mainImage,
      sideImage1,
      sideImage2,
      category,
      brand,
      price,
      discount,
      countInStock: stock,
    });

    return res.status(200).json({ message: "Product Saved Successfully!", product });
  } catch (error) {
    console.error("Save Product Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
