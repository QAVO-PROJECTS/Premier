import './index.scss'
import {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from "../../components/UserComponents/Navbar/Navbar.jsx";
import ScrollToTop from "../../components/ScrollToTop/index.jsx";
import Footer from "../../components/UserComponents/Footer/index.jsx";
import StartPage from "../UserPages/StartPage/StartPage.jsx";

const MainPage = () => {
    const [showStart, setShowStart] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setFadeOut(true);
        }, 1300);

        const timer2 = setTimeout(() => {
            setShowStart(false);
        }, 2200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div id="mainPage">
            <ScrollToTop/>
            {showStart ? (
                <>
                    <div className={`start-page ${fadeOut ? "fade-out" : ""}`}>
                        <StartPage/>
                    </div>
                    <div style={{
                        display: "none",
                    }}>
                        <Navbar/>
                        <Outlet/>
                        <Footer/>
                    </div>
                </>
            ) : (
                <>
                    <Navbar/>
                    <Outlet/>
                    <Footer/>
                </>
            )}
        </div>
    );
};

export default MainPage;
