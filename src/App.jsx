import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Card from "./components/Card/Card.jsx";
import ReserveCard from "./components/ReserveCard/ReserveCard.jsx";
import BlogCard from "./components/BlogCard/BlogCard.jsx";
import Home from "./pages/Home/Home.jsx";
import CurvedSlider from "./components/CurvedSlider/CurvedSlider.jsx";

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path:"/",
                    element:<Home/>
                }
            ]
        }
    ])


    return (
        <div>
            <RouterProvider router={router}/>

            <CurvedSlider/>
        </div>
    )
}

export default App