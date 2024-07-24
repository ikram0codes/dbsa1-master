import asyncHandler from "./ErrorHandler.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const authorized = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    const { userId } = jwt.decode(token, process.env.SECRET_KEY);
    req.user = await User.findById({ _id: userId }).select("-password");
    next();
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("no token found");
  }
});

export const authorizedAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Admin is not authorized");
  }
});
