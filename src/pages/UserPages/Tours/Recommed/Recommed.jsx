import React from 'react';
import "./recommed.scss"
import Index from "../../../../components/UserComponents/TourCard/index.jsx";

function Recommed() {
    return (
        <div className={"recommed"}>
            <div className={"container"}>
                <div className={"recommed-head"}>
                    <h2>Tövsiyə olunanlar</h2>
                    {/* Bu düymə yalnız md və yuxarı ekranlarda görünəcək */}
                    <button className="d-none d-md-block all">Hamısına bax</button>
                </div>
                <div className={"row gy-3"}>
                    <Index/>
                    <Index/>
                    <Index/>
                    <Index/>
                </div>
                {/* Bu düymə isə yalnız sm və daha aşağı ekranlarda görünəcək */}
                <div className="d-block d-md-none text-center mt-5">
                    <button className={"all"}>Hamısına bax</button>
                </div>
            </div>
            <div className={"background"}></div>
        </div>
    );
}

export default Recommed;
