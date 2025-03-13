import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Home from "./pages/Home/Home.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";
import About from "./pages/About/About.jsx";
import Services from "./pages/Services/Services.jsx";
import Tours from "./pages/Tours/Tours.jsx";
import NotFound from "./pages/Not Found/NotFound.jsx";
import './App.css'
import TourDetail from "./pages/Tour Detail Page/TourDetail.jsx";
import Admin from "./Admin/Admin.jsx";
import Cookies from "js-cookie";
import AdminBlog from "./Admin/Admin Blog/AdminBlog.jsx";
import AdminCity from "./Admin/Admin City/AdminCity.jsx";
import AdminCountry from "./Admin/Admin Country/AdminCountry.jsx";
import AdminCustomerView from "./Admin/Admin Customer View/AdminCustomerView.jsx";
const App = () => {
    const token = Cookies.get("premierTourToken");

    if (!token) {
        Cookies.set("premierTourToken", "null");
    }
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/contact",
                    element:<Contact/>
                },
                {
                    path:"/blog",
                    element:<Blogs/>
                },
                {
                    path:"/about",
                    element:<About/>
                },
                {
                    path:"/services",
                    element:<Services/>
                },
                {
                    path:"/tours",
                    element:<Tours/>
                },
                {
                    path:"/tours/:tourId",
                    element:<TourDetail/>
                }
            ]
        },
        {
            path:"*",
            element:<NotFound/>
        },
        {
            path:"/admin",
            element:<Admin/>,
        },
        {
            path:"/admin/blog",
            element:<AdminBlog/>,
        },
        {
            path:"/admin/cities",
            element:<AdminCity/>,
        },
        {
            path:"/admin/countries",
            element:<AdminCountry/>,
        },
        {
            path:"/admin/customersViews",
            element:<AdminCustomerView/>
        }
    ])


    return (
        <div>
            <RouterProvider router={router}/>
            {/*<StartPage/>*/}

        </div>
    )
}

export default App