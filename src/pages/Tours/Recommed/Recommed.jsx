import React from 'react';
import "./recommed.scss"
import TourCard from "../../../components/TourCard/TourCard.jsx";
function Recommed() {
    return (
        <div className={"recommed"}>
            <div className={"container"}>
                <div className={"recommed-head"}>
                    <h2>Tövsiyə olunanlar</h2>
                    <button>Hamısına bax</button>
                </div>
                <div className={"row"}>
                    <TourCard/>
                    <TourCard/>
                    <TourCard/>
                    <TourCard/>
                </div>
            </div>
            <div className={"background"}></div>
        </div>
    );
}

export default Recommed;