import React from 'react';
import "./recommed.scss";
import Index from "../../../../components/UserComponents/TourCard/index.jsx";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Recommed({ type, recommendedTours = [] }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleViewAll = () => {
        if (type === "incomming") {
            navigate("/tours");
        } else if (type === "outgoing") {
            navigate("/outGoing");
        }
    };

    return (
        <div className="recommed">
            <div className="container">
                <div className="recommed-head">
                    <h2>{t("recommed.title", "Tövsiyə olunanlar")}</h2>
                    {/* Bu düymə yalnız md və yuxarı ekranlarda görünəcək */}
                    <button className="d-none d-md-block all" onClick={handleViewAll}>
                        {t("recommed.button", "Hamısına bax")}
                    </button>
                </div>
                <div className="row gy-3">
                    {recommendedTours.length > 0 ? (
                        recommendedTours.map((tour, index) => (
                            <Index key={index} tour={tour} />
                        ))
                    ) : (
                        <p>{t("recommed.noData", "Tövsiyə olunacaq data yoxdur")}</p>
                    )}
                </div>
                {/* Bu düymə isə yalnız sm və daha aşağı ekranlarda görünəcək */}
                <div className="d-block d-md-none text-center mt-5">
                    <button className="all" onClick={handleViewAll}>
                        {t("recommed.button", "Hamısına bax")}
                    </button>
                </div>
            </div>
            <div className="background"></div>
        </div>
    );
}

export default Recommed;
