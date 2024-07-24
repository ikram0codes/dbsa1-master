// import necessary libraries
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import cookieParser from "cookie-parser";
import compression from "compression";
import User from "./model/userModel.js";
import connectDB from "./config/connectDB.js";
import passportUtils from "./utils/passport.js";
import Annotation from "./model/tooltipAnnotation.js";
import userRouter from "./routes/userRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import blogRoute from "./routes/blogRoute.js";
import projectRoute from "./routes/projectRoute.js";
import orderRoute from "./routes/orderRoute.js";
import brandRoute from "./routes/brandRoute.js";
import tooltipRoute from "./routes/tooltipRoute.js";
import scrappingRoute from "./routes/scrappingRoutes.js";
import documentRoute from "./routes/documentRoutes.js";
import createToken from "./utils/createToken.js";

// initialize environment variables
dotenv.config();

// connect to database
connectDB();

// setup express app
const app = express();

// middleware setup
app.use(compression()); // enable gzip compression

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
passportUtils(app); // initialize passport configuration

// OAuth2 routes for Google login
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  })
);

// Handle successful login
app.get("/auth/login/success", async (req, res) => {
  try {
    if (req.user) {
      let userExists = await User.findOne({ email: req.user._json.email });

      if (!userExists) {
        const newUser = new User({
          name: req.user._json.name,
          email: req.user._json.email,
          password: Date.now().toString(),
        });

        userExists = await newUser.save();
      }

      createToken(res, userExists._id);

      return res.status(200).json({
        ...req.user,
        _id: userExists._id,
        isAdmin: userExists.isAdmin,
      });
    } else {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Routes setup
app.use("/api/users", userRouter);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/blog", blogRoute);
app.use("/api/project", projectRoute);
app.use("/api/orders", orderRoute);
app.use("/api/brands", brandRoute);
app.use("/api/tooltip", tooltipRoute);
app.use("/api/scrapper", scrappingRoute);
app.use("/api/document", documentRoute);

// Serve static assets
const __uploads_dirname = path.resolve();
const __dirname = path.dirname(path.resolve());

app.use("/uploads", express.static(path.join(__uploads_dirname, "/uploads")));

app.use(
  "/documents",
  express.static(path.join(__uploads_dirname, "/documents"))
);

app.use(express.static(path.join(__dirname, "./frontend/dist")));

// Set content type for JavaScript files explicitly
app.use(
  "/js",
  express.static(path.join(__dirname, "/frontend/dist/js"), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === ".js") {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// API endpoint to send tooltip images
app.get("/api/tooltipimages/all", async (req, res) => {
  try {
    let imageHotspots = await Annotation.find({});
    return res.status(201).json({ imageHotspots });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// PayPal configuration endpoint
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Default route to serve frontend app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
