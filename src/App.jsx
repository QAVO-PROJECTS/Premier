import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'

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
    </div>
  )
}

export default App