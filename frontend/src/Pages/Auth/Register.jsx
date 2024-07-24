import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../Redux/Api/userApiSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { setCredential } from "../../Redux/features/authSlice";
import debounce from "lodash.debounce";

const Register = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const debouncedSetEmail = useCallback(
    debounce((value) => setEmail(value), 300),
    []
  );

  const debouncedSetUsername = useCallback(
    debounce((value) => setUsername(value), 300),
    []
  );

  const handleGoogleAuth = async () => {
    window.open("https://dbsa2.onrender.com/auth/google/callback", "_self");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, password, username }).unwrap();
      if (!res.error) {
        dispatch(setCredential({ ...res }));
        toast.success("User registered successfully");
      }
    } catch (error) {
      toast.error(error?.data?.error || error.error || "An error occurred");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div className="w-full min-h-screen p-4 flex flex-col justify-center items-center">
      <div className="w-[30%] md:w-[50%] sm:w-[80%] vsm:w-[95%] flex flex-col mt-5">
        <div className="text-[21px] font-[400]">Get Started!</div>
        <div className="w-full gap-6 flex flex-col mt-6">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="username" className="text-[14px]">
              Name
            </label>
            <div className="w-full bg-[#c1c1c133] rounded-lg">
              <input
                id="username"
                type="text"
                onChange={(e) => debouncedSetUsername(e.target.value)}
                placeholder="Enter your Name"
                className="bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="email" className="text-[14px]">
              Email
            </label>
            <div className="w-full bg-[#c1c1c133] rounded-lg">
              <input
                type="email"
                onChange={(e) => debouncedSetEmail(e.target.value)}
                placeholder="Enter your Email"
                className="bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="password" className="text-[14px]">
              Password
            </label>
            <div className="w-full flex bg-[#c1c1c133] rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full px-3 py-2 focus:outline-none"
                disabled={isLoading}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="w-[48px] h-[48px]"
                disabled={isLoading}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col mt-12 gap-8">
            <button
              onClick={handleSignUp}
              className={`w-full h-[48px] rounded-lg tracking-wider text-[17px] font-[500] bg-[#525CEB] text-white ${
                isLoading && "cursor-wait opacity-50"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
            <button
              onClick={handleGoogleAuth}
              className="w-full h-[48px] flex justify-center items-center gap-2 rounded-lg tracking-wider text-[13px] font-[400] bg-[#000000] text-white"
              disabled={isLoading}
            >
              <FcGoogle className="text-[22px]" /> Or sign up with Google
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <p>
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-[#007AFF]"
              >
                Sign in now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
