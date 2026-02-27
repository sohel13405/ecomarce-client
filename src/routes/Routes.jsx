import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../components/Home/Home";
import AuthLayout from "../hooks/AuthLayout";
import Login from "../components/Form/login/Login";
import SignUp from "../components/Form/signup/SignUp";
import About from "../pages/about/About";
import DashboardLayout from "../Dsdhboard/DashboardLayout/DashboardLayout";
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
import AllProducts from "../pages/allProducts/AllProducts";
import ContactUs from "../pages/ContactUs";
import AddToCart from "../components/featured/AddToCart";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import CartItems from "../Dsdhboard/myOrders/cartItems/CartItems";
import Products from "../pages/allProducts/Products";



 
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
      errorElement: <ErrorPage></ErrorPage>,
      hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
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
          path: '/contactus',
          element: <ContactUs></ContactUs>
        },
        {
            path: '/featuredsingleproduct/:id',
            element: <FeaturedSingleProduct></FeaturedSingleProduct>,
            
        },
        {
          path: '/addtocart/:id',
          element: <AddToCart></AddToCart>,
        },
        {
          path: 'allproducts',
          element: <AllProducts></AllProducts>,
          loader: () => fetch(`${import.meta.env.VITE_API_URL}/products`)
        },
        {
          path: 'products',
          element: <Products></Products>
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
          {
            path: 'cartitems', element: <CartItems></CartItems>
          },
          
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