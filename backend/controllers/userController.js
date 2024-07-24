import asyncHandler from "../middleware/ErrorHandler.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import createToken from "../utils/createToken.js";
import { getResetToken } from "../utils/getResetToken.js";
import { sendMail } from "../utils/sendEmail.js";
// import user from "../model/userModel.js";

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("please fill all the inputs");
  } else {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(StatusCodes.CONFLICT);
      throw new Error("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      createToken(res, newUser._id);
      return res
        .status(StatusCodes.CREATED)
        .json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        });
    }
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("please fill all the inputs");
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error("user not exist ! please register");
    } else {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) {
        createToken(res, user._id);
        return res.status(201).json({
          username: user.username,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(400);
        throw new Error("password is invalid");
      }
    }
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("connect.sid", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(201).json({ message: "logged out successfully" });
});

export const allUsers = asyncHandler(async (req, res) => {
  const page = req.query.page;
  console.log(page);
  const skip = (page - 1) * 10;
  const numOfUsers = await User.countDocuments();
  const users = await User.find({}).limit(10).skip(skip);
  res.status(200).json({ users, numOfUsers });
});

export const CurrentUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("user not found");
  } else {
    res.status(StatusCodes.OK).json({ user });
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    res.status(404);
    throw new Error("user not found");
  } else {
    currentUser.username = req.body.username || currentUser.username;
    currentUser.email = req.body.email || currentUser.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const UpdatedPassword = await bcrypt.hash(req.body.password, salt);
      currentUser.password = UpdatedPassword || currentUser.password;
    }

    const updatedUser = await currentUser.save();
    res.status(200).json({
      username: updatedUser.username,
      email: updatedUser.email,
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
    });
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  } else {
    res.status(200).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      isAdmin: user.isAdmin,
    });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(req.body);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  } else {
    console.log(user);
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    try {
      const updatedUser = await user.save();
      console.log(updatedUser);
      res.status(200).json({
        email: updatedUser.email,
        username: updatedUser.username,
        _id: updatedUser._id,
        isAdmin: updatedUser.isAdmin,
      });
    } catch (error) {
      res.status(500);
      throw new Error("some internal server related problem");
    }
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  } else {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Admin can't be deleted");
    } else {
      await User.findOneAndDelete({ _id: user._id });
      res.status(200).json({ message: "User removed" });
    }
  }
});

export const forgetPassword = asyncHandler(async (req, res) => {
  console.log("hii");
  console.log(req.body);
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  } else {
    const resetToken = getResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    const message = `Click on the link to reset your password , ${url}. if you have not request then please ignore`;

    sendMail(
      user.email,
      `Reset token has been sent to ${user.username}`,
      message
    );

    console.log(user);

    return res.status(200).json({ message: "password reset successfully" });
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log(token);
  // const resetPasswordToken = crypto.randomBytes(20).toString("hex");
  // crypto.createHash("sha256").update(token).digest("hex");
  const resetPasswordToken = token;
  console.log(resetPasswordToken);
  // res.status(200).json({ token })

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  console.log(user);
  // ,
  if (!user) {
    res.status(404);
    throw new Error("token is invalid or has been expired");
  } else {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(password);
    // console.log(hashedPassword);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "password changed successfully" });
  }
});
