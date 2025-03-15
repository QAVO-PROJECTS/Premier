import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "./Banner/Banner.jsx";
import Popular from "./Popular/Popular.jsx";
import LoveTour from "./Love Tour/LoveTour.jsx";
import TourBlog from "./Tour Blog/TourBlog.jsx";
import Sponsor from "./Sponsor/Sponsor.jsx";
import Review from "./Reviews/Review.jsx";

function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animasyon süresi (ms)
            once: false, // False yaparsan her scroll hareketinde tekrar oynar
            mirror: true, // Scroll yukarı çıkarken de animasyon tekrar etsin
        });

        // Scroll yapıldıkça AOS'u tekrar tetikle
        window.addEventListener("scroll", () => {
            AOS.refresh();
        });

        return () => {
            window.removeEventListener("scroll", () => {
                AOS.refresh();
            });
        };
    }, []);

    return (
        <>
            <div data-aos="fade-up"><Banner/></div>
            <div data-aos="zoom-in"><Popular/></div>
            <div data-aos="fade-right"><LoveTour/></div>
            <div data-aos="flip-left"><TourBlog/></div>
            <div data-aos="fade-up"><Sponsor/></div>
            <div data-aos="fade-down"><Review/></div>
        </>
    );
}

export default Home;
