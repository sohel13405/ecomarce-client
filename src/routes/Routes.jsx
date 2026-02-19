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
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import FeaturedSingleProduct from "../components/featured/FeaturedSingleProduct";
import AdminRoute from "./router/AdminRoute";
import SelleRoute from "./router/SellerRoute";
import Statistics from "../Dsdhboard/statistics/Statistics";
import ManageProduct from "../Dsdhboard/manageProduct/ManageProduct";
import DashboardRedirect from "../Dsdhboard/DashboardLayout/DashboardRedirect";
import SingleCategoryPage from "../components/Shared/SingleCategoryPage";

 
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
            loader: () => fetch(`${import.meta.env.VITE_API_URL}/products`)
        },
        {
            path: '/about',
            element: <About></About>
        },
        {
            path: '/featuredsingleproduct/:id',
            element: <FeaturedSingleProduct></FeaturedSingleProduct>,
            
        },
        {
          path: '/category/:categoryName',
          element: <SingleCategoryPage></SingleCategoryPage>
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
        element: <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
        children: [
          {
            index: true,
            element: <DashboardRedirect></DashboardRedirect>
          },

          { path: "my-orders", element: <MyOrders /> },
          
          { path: 'statistics', element: <PrivateRoutes>
            <Statistics></Statistics>
          </PrivateRoutes>},

          { path: "become-seller", element: <BecomeSeller /> },

          { path: "add-product", element: <SelleRoute>
            <AddProduct />,
          </SelleRoute> },

          { path: "manage-orders", element: <SelleRoute>
            <ManageOrders />
          </SelleRoute> },
          {
            path: 'manage-product', element: <SelleRoute>
              <ManageProduct></ManageProduct>
            </SelleRoute>
          },

          { path: "manage-users", element:<AdminRoute> <ManageUsers /> </AdminRoute>},

          { path: "profile", element: <Profile /> },
        ],
      }


  ]);