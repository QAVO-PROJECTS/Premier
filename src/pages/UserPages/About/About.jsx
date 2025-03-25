import React from 'react';
import Banner from "./Banner/Banner.jsx";
import AboutUs from "./About Us/AboutUs.jsx";
import Sponsor from "./Sponsor/Sponsor.jsx";
import ScrollToTop from "../../../components/ScrollToTop/index.jsx";

function About() {
    return (
        <>
            <ScrollToTop/>
            <Banner/>
            <AboutUs/>
            <Sponsor/>
        </>
    );
}

export default About;