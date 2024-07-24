import express from "express";
import multer from "multer";
import path from "path";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// File filter for multer
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  if (filetypes.test(extname) && mimeTypes.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error("Images Only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// Route to handle image upload
router.post("/", async (req, res) => {
  try {
    uploadSingleImage(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "uploads",
        public_id: `image-${Date.now()}`,
      });
      res.status(200).json({
        message: "Image uploaded successfully",
        image: result.secure_url, // Cloudinary URL of the uploaded image
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
