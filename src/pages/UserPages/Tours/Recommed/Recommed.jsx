import React, { useEffect } from 'react';
import "./recommed.scss";
import Index from "../../../../components/UserComponents/TourCard/index.jsx";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Recommed({ type, recommendedTours = [] }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleViewAll = () => {
        if (type === "incomming") {
            navigate("/tours");
        } else if (type === "outgoing") {
            navigate("/outGoing");
        }
    };

    return (
        <div className="recommed" data-aos="fade-up">
            <div className="container" data-aos="fade-in">
                <div className="recommed-head" data-aos="fade-right">
                    <h2>{t("recommed.title", "Tövsiyə olunanlar")}</h2>
                    {/* Bu düymə yalnız md və yuxarı ekranlarda görünəcək */}
                    <button className="d-none d-md-block all" onClick={handleViewAll} data-aos="zoom-in">
                        {t("recommed.button", "Hamısına bax")}
                    </button>
                </div>
                <div className="row gy-3" data-aos="fade-up">
                    {recommendedTours.length > 0 ? (
                        recommendedTours.map((tour, index) => (
                            <Index key={index} tour={tour} data-aos="flip-up" />
                        ))
                    ) : (
                        <p>{t("recommed.noData", "Tövsiyə olunacaq data yoxdur")}</p>
                    )}
                </div>
                {/* Bu düymə isə yalnız sm və daha aşağı ekranlarda görünəcək */}
                <div className="d-block d-md-none text-center mt-5" data-aos="zoom-in">
                    <button className="all" onClick={handleViewAll}>
                        {t("recommed.button", "Hamısına bax")}
                    </button>
                </div>
            </div>
            <div className="background" data-aos="fade-up"></div>
        </div>
    );
}

export default Recommed;
