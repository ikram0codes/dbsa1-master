import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Api/userApiSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { setCredential } from "../../Redux/features/authSlice";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

const Login = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const debouncedSetEmail = useCallback(
    debounce((value) => setEmail(value), 300),
    []
  );

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (!res.error) {
        dispatch(setCredential({ ...res }));
        toast.success("User logged in successfully");
      }
    } catch (error) {
      toast.error(error?.data?.error || error.error || "An error occurred");
    }
  };

  const handleGoogleAuth = async () => {
    window.open("https://dbsa2.onrender.com/auth/google/callback", "_self");
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect === "/" ? redirect : `/${redirect}`);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div className="w-full min-h-screen p-4 flex flex-col justify-center items-center">
      <div className="w-[30%] md:w-[50%] sm:w-[80%] vsm:w-[95%] flex flex-col mt-5">
        <div className="text-[21px] font-[400]">Nice to see you again</div>
        <div className="w-full gap-6 flex flex-col">
          <div className="flex w-full flex-col gap-2 mt-6">
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
          <div className="w-full flex mt-5 justify-start">
            <Link to="/forgetPassword" className="text-[#525CEB] text-[14px]">
              Forgot password?
            </Link>
          </div>
          <div className="flex w-full flex-col mt-2 gap-6">
            <button
              onClick={handleSignIn}
              className={`w-full h-[48px] rounded-lg tracking-wider text-[17px] font-[500] bg-[#525CEB] text-white ${
                isLoading && "cursor-wait opacity-50"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            <button
              onClick={handleGoogleAuth}
              className="w-full h-[48px] flex justify-center items-center gap-2 rounded-lg tracking-wider text-[13px] font-[400] bg-[#000000] text-white"
              disabled={isLoading}
            >
              <FcGoogle className="text-[22px]" /> Or sign in with Google
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <p>
              Don't have an account?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-[#007AFF]"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
