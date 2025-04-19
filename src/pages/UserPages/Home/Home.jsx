import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.scss";
import Banner from "./Banner/Banner.jsx";
import Popular from "./Popular/Popular.jsx";
import LoveTour from "./Love Tour/LoveTour.jsx";
import TourBlog from "./Tour Blog/TourBlog.jsx";
import Sponsor from "./Sponsor/Sponsor.jsx";
import Review from "./Reviews/Review.jsx";
import ScrollToTop from "../../../components/ScrollToTop/index.jsx";

function Home() {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Animation happens only once
        });

        // Refresh AOS on scroll
        window.addEventListener("scroll", () => {
            AOS.refresh();
        });

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", () => {
                AOS.refresh();
            });
        };
    }, []);

    return (
        <div className={"homePage"}>
            <ScrollToTop />
            <div>
                <Banner />
            </div>
            <div
                className={"popularHome"}
                data-aos="slide-up" // AOS animation type
                data-aos-offset="200" // Trigger animation when 200px from the viewport
                data-aos-easing="ease-in-out" // Smooth easing
            >
                <Popular />
            </div>
            <div>
                <LoveTour />
            </div>
            <div>
                <TourBlog />
            </div>
            <div>
                <Sponsor />
            </div>
            <div>
                <Review />
            </div>
        </div>
    );
}

export default Home;