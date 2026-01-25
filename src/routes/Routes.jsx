import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../components/Home/Home";
import AuthLayout from "../hooks/AuthLayout";
import Login from "../components/Form/login/Login";
import SignUp from "../components/Form/signup/SignUp";
import About from "../pages/about/About";
import DashboardLayout from "../Dsdhboard/DashboardLayout/DashboardLayout";
import DashboardHome from "../Dsdhboard/DashboardHome/DashboardHome";
import MyOrders from "../Dsdhboard/myOrders/MyOrders";
import BecomeSeller from "../Dsdhboard/becomeSeller/BecomeSeller";
import AddProduct from "../Dsdhboard/addProduct/AddProduct";
import ManageOrders from "../Dsdhboard/manageOrders/ManageOrders";
import ManageUsers from "../Dsdhboard/manageUsers/ManageUsers";
import Profile from "../Dsdhboard/profile/Profile";
import ErrorPage from "../pages/errorPage/ErrorPage";
 
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/about',
            element: <About></About>
        }
      ]
    },

    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/signup',
                element: <SignUp></SignUp>
            }
        ]

    },

    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "my-orders", element: <MyOrders /> },
          { path: "become-seller", element: <BecomeSeller /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "manage-orders", element: <ManageOrders /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "profile", element: <Profile /> },
        ],
      }


  ]);