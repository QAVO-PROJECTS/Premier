import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import banner from "/src/assets/ToursBannerRed.png";
import "./index.scss";
import { useGetAllToursQuery } from "../../../services/adminApi.jsx";
import TourCard from "../../../components/UserComponents/TourCard/index.jsx";
import NotResult from "../Not Result/index.jsx";
import ScrollToTop from "../../../components/ScrollToTop/index.jsx";

function CountryTours({ state }) {
    const { t } = useTranslation();
    const  {countryId} = useParams();
    const { data: getAllTours, isLoading, error } = useGetAllToursQuery();
    const result = getAllTours?.data;
    console.log(result);
    const filteredTours = result?.filter((tour) =>
        tour?.countries?.some(country => country.id === countryId)
    );


    console.log(filteredTours);
    return (
        <div className="searchTours">
            <ScrollToTop/>
            <div className="container">
                <div className="head">
                    <p>
                        {t("tours.breadcrumb", "Ana səhifə / Turlar /")}{" "}
                        <span>{t("countryTours.title")}</span>
                    </p>
                </div>
                <div className="tour-cards">
                    <div className="card-head">
                        <h2>{t("countryTours.title")}</h2>
                    </div>
                    <div className="row gy-4" style={{ marginBottom: "80px" }}>
                        {isLoading && <p>{t("searchPage.loading")}</p>}
                        {error && <p>Bir hata oluştu.</p>}
                        {filteredTours && filteredTours.length > 0 ? (
                            filteredTours.map((tour) => (
                                <TourCard key={tour?.id} tour={tour} />
                            ))
                        ) : (
                            !isLoading && <NotResult />
                        )}
                    </div>
                </div>
            </div>
            <img src={banner} alt="tours" className="banner-image-tour" />
        </div>
    );
}

export default CountryTours;
