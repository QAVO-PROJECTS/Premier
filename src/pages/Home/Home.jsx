import React from 'react';
import Banner from "./Banner/Banner.jsx";
import Popular from "./Popular/Popular.jsx";
import LoveTour from "./Love Tour/LoveTour.jsx";
import TourBlog from "./Tour Blog/TourBlog.jsx";
import Sponsor from "./Sponsor/Sponsor.jsx";
import Review from "./Reviews/Review.jsx";

function Home() {
    return (
    <>
        <Banner/>
        <Popular/>
        <LoveTour/>
        <TourBlog/>
        <Sponsor/>
        <Review/>
    </>
    );
}

export default Home;