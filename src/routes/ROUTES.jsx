import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/UserPages/Home/Home.jsx";
import Contact from "../pages/UserPages/Contact/Contact.jsx";
import Blogs from "../pages/UserPages/Blogs/Blogs.jsx";
import About from "../pages/UserPages/About/About.jsx";
import Services from "../pages/UserPages/Services/Services.jsx";
import Tours from "../pages/UserPages/Tours/Tours.jsx";
import TourDetail from "../pages/UserPages/Tour Detail Page/TourDetail.jsx";
import NotFound from "../pages/UserPages/Not Found/NotFound.jsx";
import AdminBlog from "../pages/AdminPages/Admin Blog/AdminBlog.jsx";
import AdminCity from "../pages/AdminPages/Admin City/AdminCity.jsx";
import AdminCountry from "../pages/AdminPages/Admin Country/AdminCountry.jsx";
import AdminCustomerView from "../pages/AdminPages/Admin Customer View/AdminCustomerView.jsx";
import AdminTour from "../pages/AdminPages/Admin Tour/AdminTour.jsx";
import MainPage from "../pages/MainPage/index.jsx";
import AdminLogin from "../pages/AdminPages/Admin Login/index.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import BlogDetail from "../pages/UserPages/BlogDetail/BlogDetail.jsx";
import AdminReserved from "../pages/AdminPages/Admin Reserved/AdminReserved.jsx";
import AdminContact from "../pages/AdminPages/Admin Contact/AdminContact.jsx";
import SearchTours from "../pages/UserPages/SearchTours/SearchTours.jsx";
import CountryTours from "../pages/UserPages/CountryTours/index.jsx";
import AdminPage from "../components/AdminComponents/AdminPage/index.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/blog",
                element: <Blogs/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/services",
                element: <Services/>
            },
            {
                path: "/tours",
                element: <Tours/>
            },
            {
                path: "/search-tours",
                element: <SearchTours/>
            },
            {
                path: "/outGoing",
                element: <Tours/>
            },
            {
                path: "/tours/:tourId",
                element: <TourDetail/>
            },
            {
                path: "/blogs/:blogId",
                element: <BlogDetail/>
            },
            {
                path: "/countryTours/:countryId",
                element: <CountryTours/>
            }
        ]
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminPage/>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/admin/blog",
                element: <AdminBlog/>,
            },
            {
                path: "/admin/cities",
                element: <AdminCity/>,
            },
            {
                path: "/admin/countries",
                element: <AdminCountry/>,
            },
            {
                path: "/admin/customersViews",
                element: <AdminCustomerView/>
            },
            {
                path: "/admin/tours",
                element: <AdminTour/>
            },
            {
                path: "/admin/reserv",
                element: <AdminReserved/>,
            },
            {
                path: "/admin/contact",
                element: <AdminContact/>,
            }
        ]
    },
    {
        path: "/login",
        element: <AdminLogin/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

export default router;
