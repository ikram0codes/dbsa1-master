import React, { useEffect, useState } from "react";
import {
  useCreateReviewMutation,
  useGetProductByIdQuery,
} from "../../Redux/Api/productSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import Loader from "../../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../Components/Message";
import Rating from "../../Components/Rating";
import { CgExpand, CgProfile } from "react-icons/cg";
import TopProducts from "../Home/TopProducts";
import { addToCart } from "../../Redux/features/cartSlice";
import "../../assets/ScrappedInformation.css";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const ProductDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [qty, setQty] = useState(1);
  const [descExpanded, setDiscExpanded] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading: getProductLoading,
    error,
  } = useGetProductByIdQuery(id);
  const [createReview, { isLoading: addReviewLoading }] =
    useCreateReviewMutation();

  const increaseQty = () => {
    if (qty < product.countInStock) {
      setQty(qty + 1);
    } else {
      toast.error("no more items in stock");
    }
  };
  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("item added to cart");
  };

  useEffect(() => {
    setImage(product?.mainImage);
    setRating(0);
    setComment("");
    if (userInfo && product) {
      const [newReview] = product?.review?.filter(
        (rev) => rev.user.toString() === userInfo?._id.toString()
      );
      setComment(newReview?.comment);
      setRating(newReview?.rating);
    } else {
      setComment("");
    }
  }, [product]);

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate(`/login?redirect=productDetails/${id}`);
    } else {
      try {
        const res = await createReview({
          data: { rating, comment },
          productId: id,
        }).unwrap();
        if (!res.error) {
          toast.success("review added successfully");
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        toast.error(error?.data?.error || error.error);
      }
    }
  };

  const handleMainImage = (imageName) => {
    setImage(imageName);
  };

  useEffect(() => {
    document.title = product?.name;
    document.description = product?.description;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return getProductLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error.data.error || error.error}</Message>
  ) : (
    <>
      <div className="font1 w-full px-[80px]  md:px-[30px]  sm:px-[5px] vsm:px-[0px] mt-[80px] sm:mt-[50px] relative overflow-hidden">
        {/* <div className="w-full grid grid-cols-5 smd:grid-cols-3  grid-rows gap-16 col-span-2 smd:order-1 "></div> */}
        <div className="w-full flex justify-center items-start pdsm:flex-col">
          <div className="w-full min-h-[350px] flex flex-col gap-5 col-span-3 px-4">
            <div
              data-aos="zoom-in-down"
              className="w-full min-h-[350px] flex justify-center items-center py-3 bg-[#EDEBE9] rounded-[20px]"
            >
              <img
                src={image}
                alt={product?.name}
                className="w-[280px] h-[280px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] "
              />
            </div>
            <div className="w-full sm:overflow-scroll col-span-3 flex gap-4 px-4 justify-start ">
              {product?.mainImage && (
                <div
                  onClick={() => {
                    handleMainImage(product?.mainImage);
                  }}
                  className="w-[175px] h-[175px] cursor-pointer sm:min-w-[175px] rounded-[20px] flex justify-center items-center bg-[#EDEBE9]"
                >
                  <img
                    src={product?.mainImage}
                    alt={product?.name}
                    className="w-[140px] h-[140px]  object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] "
                  />
                </div>
              )}
              {product?.sideImage1 && (
                <div
                  onClick={() => {
                    handleMainImage(product?.sideImage1);
                  }}
                  className="w-[175px] h-[175px] cursor-pointer  sm:min-w-[175px] rounded-[20px] flex justify-center items-center bg-[#EDEBE9]"
                >
                  <img
                    src={product?.sideImage1}
                    alt={product?.name}
                    className="w-[140px] h-[140px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] "
                  />
                </div>
              )}
              {product?.sideImage2 && (
                <div
                  onClick={() => {
                    handleMainImage(product?.sideImage2);
                  }}
                  className="w-[175px] h-[175px] cursor-pointer sm:min-w-[175px] rounded-[20px] flex justify-center items-center bg-[#EDEBE9]"
                >
                  <img
                    src={product?.sideImage2}
                    alt={product?.name}
                    className="w-[140px] h-[140px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] "
                  />
                </div>
              )}
            </div>
            <div
              className="flex justify-start items-center w-full h-max flex-col"
              id="info"
            >
              <span
                className=""
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <h3 className="text-[30px] font-bold">Products Details</h3>
                <button
                  className="text-[#525CEB]"
                  onClick={() => {
                    setInfoExpanded(!infoExpanded);
                  }}
                >
                  {infoExpanded ? (
                    <MdExpandLess className="text-[40px]" />
                  ) : (
                    <MdExpandMore className="text-[40px]" />
                  )}
                </button>
              </span>
              {infoExpanded ? (
                <div
                  dangerouslySetInnerHTML={{ __html: product.information }}
                ></div>
              ) : (
                <div
                  className="w-full"
                  style={{
                    height: "5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    className="cursor-pointer text-[#9CACCB] text-[18px] "
                    onClick={() => {
                      setInfoExpanded(!infoExpanded);
                    }}
                  >
                    {product.information !== ""
                      ? "View Product Details..."
                      : "No Product Details"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-max flex justify-start items-center flex-col gap-[40px]">
            <div className="w-full flex justify-between sm:overflow-scroll col-span-3  ex gap-4 px-4  smd:order-2">
              <div className="w-full col-span-2 smd:col-span-3 min-h-[200px] smd:order-3 px-3">
                <h1 className="text-[36px] font2 font-[600] md:text-[30px] smd:text-[36px] ">
                  {product?.name}
                </h1>
                <p className="text-[18px] text-[#82828B] font2 uppercase font-[500] mt-[21px] ">
                  {" "}
                  by {product?.brand?.name}
                </p>
                <div className="flex mt-2 gap-6 ">
                  <div className="min-w-[114px] text-[20px] weight-[500] font2 h-[44px] flex justify-center items-center rounded-[8px] px-2 text-[#525CEB] bg-[#525ceb21] ">
                    R {product?.price.toFixed(2)}
                  </div>
                  <div className="">
                    <p className="text-[#FF000F] font-[500] text-[16px] ">
                      Sale {product.discount}% off
                    </p>
                    <p className="text-[14px] font-[400] text-[#82828B]">
                      Inclusive of all Taxes
                    </p>
                  </div>
                </div>
                <div className="text-[#82828B] text-[16px] tracking-wider mt-4 font-[400]">
                  {descExpanded
                    ? product.description
                    : `${product.description.substring(0, 300)}...`}
                  {product.description.length > 300 && (
                    <button
                      className="text-[#525CEB]"
                      onClick={() => {
                        setDiscExpanded(!descExpanded);
                      }}
                    >
                      {descExpanded ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
                <div className="mt-10 flex gap-8 flex-wrap">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#82828B] text-[14px] font-[500]">QTY</p>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={decreaseQty}
                        className="w-[24px] h-[24px] bg-[#525CEB] flex justify-center items-center text-white text-[18px] rounded-md  "
                      >
                        -
                      </button>
                      {qty}
                      <button
                        onClick={increaseQty}
                        className="w-[24px] h-[24px] bg-[#FF000F] flex justify-center items-center text-white text-[16px] rounded-md  "
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="">
                      <button
                        onClick={addToCartHandler}
                        className="w-[140px] bg-[#525CEB] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
                      >
                        Add to cart
                      </button>
                    </div>
                    {userInfo?.isAdmin && (
                      <button className="">
                        <Link
                          to={`/adminMenu/updateProduct/${product._id}`}
                          className="w-[140px] flex justify-center items-center bg-[#525CEB] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white "
                        >
                          Update
                        </Link>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-full col-span-2 smd:col-span-3 smd:order-5 row-span-2">
              <div className="min-w-full h-full shadow-md sm:shadow-none max-h-[500px] shadow-slate-500 rounded-xl sm:rounded-none overflow-y-scroll">
                <div className="w-full min-h-[163px] border-gray-300 border-b-[1px] gap-2 flex flex-col justify-center items-center">
                  <h1 className="text-[24px] font1 font-[700]">Reviews</h1>
                  <div className="flex flex-wrap px-2 items-center justify-center py-3 bg-[#F6FAFB] gap-3">
                    <div className="">
                      <Rating value={product?.rating} />
                    </div>
                    <p className="text-[#7A7A7A] text-[18px] font-[300]">
                      {product?.numReviews} reviews
                    </p>
                  </div>
                </div>
                {product?.review.length > 0 ? (
                  <div className="w-full flex last:border-b-[0px] justify-center items-center  flex-col  overflow-x-clip">
                    {product?.review?.map((rev, index) => {
                      const { comment, email, name, rating } = rev;
                      return (
                        <div
                          key={index}
                          className="w-full min-h-[163px] overflow-scroll py-3 flex flex-col justify-start gap-4 px-4  border-gray-300 border-t-[1px]"
                        >
                          <div className="flex justify-between flex-wrap gap-2">
                            <div className="flex justify-center gap-2  items-center">
                              <div className="text-[44px] text-[#525CEB]">
                                <CgProfile />
                              </div>
                              <div className="flex flex-col ">
                                <div className="text-[20px] font-[600] capitalize tracking-wider">
                                  {name}
                                </div>
                                <div className="text-[#7A7A7A] text-[17px] font-[400]">
                                  {email}
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <Rating value={rating} />
                            </div>
                          </div>
                          <div className="text-[#82828B] text-[15px] line-clamp-5 tracking-wider font-[400] ">
                            {rev.comment}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full mt-[20px] text-gray-600 justify-center items-center flex text-xl">
                    No review Yet
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-3 w-full px-4 flex smd:order-4 flex-col gap-3  ">
              <div className="w-full flex justify-between  ">
                <span className="text-[24px] font2 font-[500]">
                  Write a Review
                </span>
                <div className="focus:outline-none tracking-widest border-[1px] flex justify-center items-center gap-1 border-gray-600 px-2 py-1 rounded-md">
                  <select
                    value={rating}
                    onChange={(e) => {
                      setRating(e.target.value);
                    }}
                    className="focus:outline-none"
                  >
                    <option defaultValue={0} value={0} id="0">
                      0
                    </option>
                    <option value={1} id="1">
                      1
                    </option>
                    <option value={2} id="2">
                      2
                    </option>
                    <option value={3} id="3">
                      3
                    </option>
                    <option value={4} id="4">
                      4
                    </option>
                    <option value={5} id="5">
                      5
                    </option>
                  </select>
                  /5{" "}
                  <span className="text-yellow-400">
                    <FaStar />
                  </span>{" "}
                </div>
              </div>
              <div className="w-full">
                <textarea
                  type="text"
                  placeholder="Your Review"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className="border-[2px] border-[#AFB1BD] w-full h-[150px] rounded-lg tracking-wider focus:outline-none p-4 "
                />
              </div>
              <div className="w-full flex gap-6 justify-end">
                {/* <input
              type="text"
              placeholder="Your Name"
              value={userInfo ? userInfo.username : ""}
              className="border-[2px] border-[#AFB1BD] w-[30%] rounded-md tracking-wider focus:outline-none px-3 py-2 "
              />
            <input
              type="text"
              placeholder="Your Email"
              value={userInfo ? userInfo.email : ""}
              className="border-[2px] border-[#AFB1BD] w-[30%] rounded-md tracking-wider focus:outline-none px-3 py-2 "
            /> */}
                <button
                  onClick={submitReviewHandler}
                  className={`w-[30%] bg-[#525CEB] text-[16px] font-[500] font2 py-3 text-white rounded-md ${
                    addReviewLoading && "cursor-wait"
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100vw]">
        <TopProducts />
      </div>
    </>
  );
};

export default ProductDetails;
