import './index.scss';
import { useState, useEffect } from 'react'; // Import useEffect
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/UserComponents/Navbar/Navbar.jsx';
import Footer from '../../components/UserComponents/Footer/index.jsx';
import StartPage from '../UserPages/StartPage/StartPage.jsx';

const MainPage = () => {
    const [showStart, setShowStart] = useState(true);

    // Use useEffect to handle the timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowStart(false); // Hide StartPage after 8 seconds
        }, 100); // 8000ms = 8 seconds

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []); // Empty dependency array to run only once on mount

    return (
        <div id="mainPage">
            {showStart ? (
                <>
                    <div className="start-page">
                        <StartPage />
                    </div>
                    <div style={{ display: 'none' }}>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </div>
                </>
            ) : (
                <>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </>
            )}
        </div>
    );
};

export default MainPage;