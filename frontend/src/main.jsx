import React, { Suspense, lazy, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { store } from "./Redux/store";
import "./index.css";
import Loader from "./Components/Loader";
import UploadDocument from "./Pages/AdminPanel/UploadDocument";
import Index from "./Pages/Documents/Index";
import UpdateDocuments from "./Pages/AdminPanel/UpdateDocuments";

// Lazy load components
const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./Pages/Home/Index.jsx"));
const Login = lazy(() => import("./Pages/Auth/Login.jsx"));
const Register = lazy(() => import("./Pages/Auth/Register.jsx"));
const CreateProduct = lazy(() =>
  import("./Pages/AdminPanel/CreateProduct.jsx")
);
const ProductDetails = lazy(() =>
  import("./Pages/Products/ProductDetails.jsx")
);
const FavoriteProducts = lazy(() =>
  import("./Pages/Products/FavoriteProducts.jsx")
);
const Cart = lazy(() => import("./Pages/Products/Cart.jsx"));
const AllFilteredProduct = lazy(() =>
  import("./Pages/Products/AllFilteredProduct.jsx")
);
const CreateCategories = lazy(() =>
  import("./Pages/AdminPanel/CreateCategories.jsx")
);
const AdminMenu = lazy(() => import("./Pages/AdminPanel/AdminMenu.jsx"));
const AdminDashboard = lazy(() =>
  import("./Pages/AdminPanel/AdminDashboard.jsx")
);
const ProductList = lazy(() => import("./Pages/AdminPanel/ProductList.jsx"));
const CategoryList = lazy(() => import("./Pages/AdminPanel/CategoryList.jsx"));
const CreateProject = lazy(() =>
  import("./Pages/AdminPanel/createProject.jsx")
);
const AllProject = lazy(() => import("./Pages/Projects/AllProject.jsx"));
const SingleProject = lazy(() => import("./Pages/Projects/SingleProject.jsx"));
const UpdateProject = lazy(() =>
  import("./Pages/AdminPanel/UpdateProject.jsx")
);
const ForgetPassword = lazy(() => import("./Pages/Auth/ForgetPassword.jsx"));
const ResetPassword = lazy(() => import("./Pages/Auth/ResetPassword.jsx"));
const Shipping = lazy(() => import("./Pages/orders/Shipping.jsx"));
const PlaceOrder = lazy(() => import("./Pages/orders/PlaceOrder.jsx"));
const Order = lazy(() => import("./Pages/orders/Order.jsx"));
const OrderList = lazy(() => import("./Pages/AdminPanel/OrderList.jsx"));
const UsersList = lazy(() => import("./Pages/AdminPanel/UsersList.jsx"));
const UserRoute = lazy(() => import("./Pages/UserPanal/UserRoute.jsx"));
const Profile = lazy(() => import("./Pages/UserPanal/Profile.jsx"));
const MyOrders = lazy(() => import("./Pages/UserPanal/MyOrders.jsx"));
const ContactUs = lazy(() => import("./Pages/other/Contact.jsx"));
const About = lazy(() => import("./Pages/other/About.jsx"));
const CreateBrands = lazy(() => import("./Pages/AdminPanel/CreateBrands.jsx"));
const BrandList = lazy(() => import("./Pages/AdminPanel/BrandList.jsx"));
const ScrapeProducts = lazy(() =>
  import("./Pages/AdminPanel/ScrapeProducts.jsx")
);
const CreateToolTip = lazy(() =>
  import("./Pages/AdminPanel/CreateToolTip.jsx")
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                {/* routes for user credentials */}

                <Route path="docs" element={<Index />} />
                <Route path="login" element={<Login />} />
                <Route path="Register" element={<Register />} />
                <Route path="forgetPassword" element={<ForgetPassword />} />
                <Route
                  path="resetPassword/:token"
                  element={<ResetPassword />}
                />
                {/* routes for all users (logged in or logged out) */}
                <Route path="product" element={<CreateProduct />} />
                <Route path="project" element={<AllProject />} />
                <Route path="project/:id" element={<SingleProject />} />
                <Route path="productDetails/:id" element={<ProductDetails />} />
                <Route path="favorite" element={<FavoriteProducts />} />
                <Route path="cart" element={<Cart />} />
                <Route path="shipping" element={<Shipping />} />
                <Route path="placeorder" element={<PlaceOrder />} />
                <Route path="order/:id" element={<Order />} />
                <Route path="shop" element={<AllFilteredProduct />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="/about" element={<About />} />
                {/* Admin Routes */}
                <Route path="adminMenu" element={<AdminMenu />}>
                  <Route
                    path="adminDashboard"
                    index
                    element={<AdminDashboard />}
                  />
                  <Route path="uploadDoc" element={<UploadDocument />} />
                  <Route path="updateDocs" element={<UpdateDocuments />} />
                  <Route path="scrappeProducts" element={<ScrapeProducts />} />
                  <Route path="createToolTip" element={<CreateToolTip />} />
                  <Route path="createProduct" element={<CreateProduct />} />
                  <Route path="createCategory" element={<CreateCategories />} />
                  <Route path="createBrand" element={<CreateBrands />} />
                  <Route path="createProject" element={<CreateProject />} />
                  <Route path="categoryList" element={<CategoryList />} />
                  <Route path="brandList" element={<BrandList />} />
                  <Route path="usersList" element={<UsersList />} />
                  <Route path="orderList" element={<OrderList />} />
                  <Route path="updateProduct/:id" element={<ProductList />} />
                  <Route
                    path="update/project/:id"
                    element={<UpdateProject />}
                  />
                </Route>
                {/* Private Routes */}
                <Route path="privateRoute" element={<UserRoute />}>
                  <Route index element={<Profile />} />
                  <Route path="MyOrders" element={<MyOrders />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
