import {RouterProvider} from 'react-router-dom'
import './App.css'
import Cookies from "js-cookie";
import router from './routes/ROUTES'
import {ToastContainer} from "react-toastify";

const App = () => {
    const token = Cookies.get("premierTourToken");

    if (!token) {
        Cookies.set("premierTourToken", "null");
    }

    return (
        <div>
            <ToastContainer/>
            <RouterProvider router={router}/>
            {/*<StartPage/>*/}
        </div>
    )
}

export default App