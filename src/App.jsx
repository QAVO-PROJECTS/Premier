import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Home from "./pages/Home/Home.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";

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
                }
            ]
        }
    ])


    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App