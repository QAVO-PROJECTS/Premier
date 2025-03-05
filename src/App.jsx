import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Home from "./pages/Home/Home.jsx";
import CurvedSlider from "./components/CurvedSlider/CurvedSlider.jsx";
import Contact from "./pages/Contact/Contact.jsx";

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
                }
            ]
        }
    ])


    return (
        <div>
            <RouterProvider router={router}/>

            {/*<CurvedSlider/>*/}
        </div>
    )
}

export default App