import React, { useEffect } from "react";
import "./App.css";
import Home from "./features/Pages/Home";
import LoginPage from "./features/Pages/LoginPage";
import SignupPage from "./features/Pages/SignupPage";
import CartPage from "./features/Pages/CartPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin"
import ProductDetails from "./features/product/components/ProductDetails";
import adminProductDetailPage from "./features/Pages/adminProductDetailPage";
import { 
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Checkout from "./features/Pages/Checkout";
import ProductDetailspage from "./features/Pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectLoggedInUser, selectUserChecked, selectloggedInUserToken } from "./features/auth/loginSlice";
import { fetchProductByIdAsync } from "./features/product/ProductSlice";
import PageNotFound from "./features/Pages/404";
import OrderSuccessPage from "./features/Pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserOrderPage from "./features/Pages/UserOrderPage";
import UserProfile from "./features/user/components/UserProfile";
import UserProfilePage from "./features/Pages/UserProfilePage"
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import { fetchLoggedInUserAsync, selectUserInfo } from "./features/user/Userslice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./features/Pages/ForgotPasswordpage";
import AdminHome from "./features/Pages/AdminHome";
import AdminProductFormPage from "./features/Pages/AdminProductFormPage";
import AdminOrdersPage from "./features/Pages/AdminOrdrersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from "./features/Pages/StripeCheckout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/carts",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductDetailspage></ProductDetailspage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-details/:id",
    element: (
      <ProtectedAdmin>
        <adminProductDetailPage></adminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <UserOrderPage></UserOrderPage>
    ),
  },
  {
    path: "/profile",
    element: (
      <UserProfilePage></UserProfilePage>
    ),
  },
  {
    path: "/logout",
    element: (
      <Logout></Logout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ForgotPasswordPage></ForgotPasswordPage>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound></PageNotFound>
    ),
  }
]);

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectloggedInUserToken);
  const userChecked=useSelector(selectUserChecked)
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[])
  useEffect(()=>{
    if(user){
    dispatch(fetchItemsByUserIdAsync());
    dispatch(fetchLoggedInUserAsync())
    }
    
  },[dispatch,user])
  return (
    <div className="App">
      {userChecked && <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>}
    </div>
  );
}

export default App;
