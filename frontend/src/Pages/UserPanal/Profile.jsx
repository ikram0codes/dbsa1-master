import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useProfileMutation } from "../../Redux/Api/userApiSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileUpdate] = useProfileMutation();

  useEffect(() => {
    setEmail(userInfo.email);
    setUsername(userInfo.username);
  }, [userInfo.username, userInfo.email]);

  const updateProfileHandler = async () => {
    console.log("hii");
    try {
      const res = await profileUpdate({
        username,
        email,
        password,
        _id: userInfo._id,
      }).unwrap();
      if (!res.error) {
        toast.success("profile updated successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // const updateProfileHandler = async () => {
  //   console.log("hi");
  //   try {
  //     const res = await register({
  //       email,
  //       password,
  //       username,
  //       _id: userInfo._id,
  //     }).unwrap();
  //     console.log(res);
  //     if (!res.error) {
  //       console.log("hello");
  //       dispatch(setCredential({ ...res }));
  //       toast.success("user registered successfully");
  //     }
  //   } catch (error) {
  //     toast.error(error?.data?.error || error.error);
  //   }
  // };

  // const [register, { isLoading }] = useRegisterMutation();

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   console.log("hi");
  //
  // };
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [userInfo, redirect, navigate]);
  return (
    <div className="w-full relative left-0 p-4 font2 top-0 flex flex-col justify-center items-center">
      <div className="w-[30%] md:w-[50%] sm:w-[80%] vsm:w-[95%] flex flex-col mt-5">
        <div className="text-[21px] font-[500]">My Profile</div>
        <div className="w-full gap-6 flex flex-col mt-6">
          <div className="flex w-full  flex-col gap-2">
            <label htmlFor="username" className="text-[14px]">
              Name
            </label>
            <div className="w-full bg-[#c1c1c133]  rounded-lg">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter your Name"
                className="bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="flex w-full  flex-col gap-2  ">
            <label htmlFor="email" className="text-[14px]">
              Email
            </label>
            <div className="w-full bg-[#c1c1c133]  rounded-lg">
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your Email"
                className="bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="flex w-full h-[48px] flex-col gap-2 ">
            <label htmlFor="password" className="text-[14px]">
              Password
            </label>
            <div className="w-full flex bg-[#c1c1c133]  rounded-lg">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-transparent  w-full px-3 py-2 focus:outline-none "
              />
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="w-[48px] h-[48px]"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex w-full justify-between  mt-12 gap-8">
            <button
              onClick={updateProfileHandler}
              className=" h-[48px] px-4 rounded-lg tracking-wider text-[15px] font-[500] bg-[#525CEB] text-white "
            >
              Update
            </button>
            <Link
              to="MyOrders"
              className=" h-[48px] flex items-center justify-center px-4 rounded-lg tracking-wider text-[15px] font-[500] bg-[#525CEB] text-white "
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
