import Annotation from "../model/tooltipAnnotation.js";

// Creating and Saving the Image with ToolTip Hotspots
export const createImageHotSpots = async (req, res) => {
  try {
    const { image, annotations } = req.body;

    try {
      const newAnnotation = new Annotation({
        image,
        annotations,
      });

      await newAnnotation.save();
      res.status(201).json({ message: "Image Hotspots Created!", annotations });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
