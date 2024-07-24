import mongoose from "mongoose";

const annotationSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  annotations: [
    {
      id: {
        type: String,
        required: true,
      },
      geometry: {
        type: {
          type: String,
          enum: ["RECTANGLE", "CIRCLE", "POLYGON", "POINT"],
          required: true,
        },
        x: {
          type: Number,
          required: true,
        },
        y: {
          type: Number,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
        radius: {
          type: Number,
        },
        path: {
          type: Array,
          default: [],
        },
      },
      data: {
        text: {
          type: String,
          required: true,
        },
        redirectUrl: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Annotation = mongoose.model("Annotation", annotationSchema);
export default Annotation;
