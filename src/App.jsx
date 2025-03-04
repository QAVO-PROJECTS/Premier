import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Card from "./components/Card/Card.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element:<Layout/>,
      children: [
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
      <div className={"row"}>
        <Card/>
      </div>
    </div>
  )
}

export default App