import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import banner from "/src/assets/ToursBannerRed.png";
import "./searchTours.scss";
import { useGetSearchToursQuery } from "../../../services/adminApi.jsx";
import TourCard from "../../../components/UserComponents/TourCard/index.jsx";
import NotResult from "../Not Result/index.jsx";
import ScrollToTop from "../../../components/ScrollToTop/index.jsx";
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function SearchTours({ state }) {
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const location = useLocation();
    const currentPath = location.pathname;
    const isOutgoing = currentPath.toLowerCase().includes("outgoing");

    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("searchTerm") || "";
    console.log("Arama terimi:", term);

    const { data: searchData, isLoading, error } = useGetSearchToursQuery(term);
    const result = searchData?.data;

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="searchTours" data-aos="fade-up">
            <ScrollToTop/>
            <div className="container" data-aos="fade-in">
                <div className="head" data-aos="fade-right">
                    <p>
                        {t("tours.breadcrumb", "Ana səhifə / Turlar /")}{" "}
                        <span>{t("searchResult.title")}</span>
                    </p>
                </div>
                <div className="tour-cards" data-aos="fade-up">
                    <div className="card-head" data-aos="zoom-in">
                        <h2>{t("searchResult.title")}</h2>
                    </div>
                    <div className="row gy-4" style={{ marginBottom: "80px" }} data-aos="fade-up">
                        {isLoading && <p>{t("searchPage.loading")}</p>}
                        {error && <p>Bir hata oluştu.</p>}
                        {result && result.length > 0 ? (
                            result.map((tour) => (
                                <TourCard key={tour.id} tour={tour} data-aos="flip-up" />
                            ))
                        ) : (
                            !isLoading && <NotResult/>
                        )}
                    </div>
                </div>
            </div>
            <img src={banner} alt="tours" className="banner-image-tour" data-aos="zoom-in" />
        </div>
    );
}

export default SearchTours;
