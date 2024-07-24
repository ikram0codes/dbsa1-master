import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../Redux/Api/userApiSlice";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  console.log(token);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  const resetPasswordHandler = async () => {
    if (password !== confirmPassword) {
      toast.error("Password is not same");
    } else {
      try {
        console.log(token);
        const res = await resetPassword({
          data: { password },
          token: token,
        }).unwrap();
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(`Password changed successfully`);
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.data.error || error.error);
      }
    }
  };
  return (
    <div className="w-full min-h-[500px] relative left-0 p-4 top-0 py-10 flex flex-col justify-center items-center">
      <div className="text-[21px] text-center font-[400]">Reset Password </div>
      <div className="w-[30%] md:w-[50%] sm:w-[80%] vsm:w-[95%] flex gap-6 flex-col mt-5 items-center">
        <div className="flex w-full gap-5 flex-col  ">
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
          <div className="w-full flex bg-[#c1c1c133]  rounded-lg">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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
        <button
          //   onClick={forgetPasswordHandler}
          onClick={resetPasswordHandler}
          className={`w-full h-[48px] rounded-lg tracking-wider text-[17px] font-[500] bg-[#525CEB] text-white
          } `}
        >
          Sent Link
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
