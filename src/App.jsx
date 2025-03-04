import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Card from "./components/Card/Card.jsx";
import ReserveCard from "./components/ReserveCard/ReserveCard.jsx";
import BlogCard from "./components/BlogCard/BlogCard.jsx";
import Home from "./pages/Home/Home.jsx";

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

    const arr = new Array(5).fill(0)

    return (
        <div>
            <RouterProvider router={router}/>
            {/*<div className={"row"}>*/}
            {/*    {arr && arr.map((item, index) => <BlogCard key={index} index={index}/>)}*/}
            {/*    <Card/>*/}
            {/*    <ReserveCard/>*/}
            {/*</div>*/}
        </div>
    )
}

export default App