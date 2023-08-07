import React, { useEffect } from "react";
import "./App.css";
import Home from "./features/Pages/Home";
import LoginPage from "./features/Pages/LoginPage";
import SignupPage from "./features/Pages/SignupPage";
import CartPage from "./features/Pages/CartPage";
import ProductDetails from "./features/product/components/ProductDetails";
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
import { selectLoggedInUser } from "./features/auth/loginSlice";
import { fetchAllProductByIdAsync } from "./features/product/ProductSlice";
import PageNotFound from "./features/Pages/404";
import OrderSuccessPage from "./features/Pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserOrderPage from "./features/Pages/UserOrderPage";

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
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductDetailspage></ProductDetailspage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path: "/orders",
    element: (
      <UserOrderPage></UserOrderPage>
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound></PageNotFound>
    ),
  }
]);

function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);
  useEffect(()=>{
    if(user){
    dispatch(fetchAllProductByIdAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App">
      {/* <Home></Home> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
