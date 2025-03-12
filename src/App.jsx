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
import {ThreeDots} from "react-loader-spinner";
import StartPage from "./pages/StartPage/StartPage.jsx";
import TourDetail from "./pages/Tour Detail Page/TourDetail.jsx";
const App = () => {
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