import React, { useState, useEffect } from 'react';
import "./index.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { TOUR_CARD_IMG_URL } from "../../../constants.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function TourCard({ tour }) {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const language = i18n.language; // Məsələn, "az", "en", "ru"

    // Cari dili nəzərə alaraq title seçirik
    let title = tour?.title; // Default Azərbaycan dili
    if (language === 'en' && tour?.titleEng) {
        title = tour?.titleEng;
    } else if (language === 'ru' && tour?.titleRu) {
        title = tour?.titleRu;
    }

    // Responsive ölçünü izləmək üçün state
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // SM breakpoint adətən 576px olur
            setIsSmallScreen(window.innerWidth < 576);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`col-md-3 col-sm-6 mb-4 col-xs-12 col-6 `}>
            <div className="card123">
                <div className="image">
                    <img src={TOUR_CARD_IMG_URL + tour?.cardImageUrl} alt={title} />
                    <div className="raiting">
                        <p>5.0 </p> <FaStar />
                    </div>
                </div>
                {isSmallScreen && (
                    <div className="mobile-button" style={{  textAlign: 'center' }}>
                        <button style={{}} onClick={() => navigate(`/tours/${tour?.id}`)}>
                            <FaArrowRightLong className='mb-1' />
                        </button>
                    </div>
                )}
                <div className="card-content">
                    <div className="text">
                        <h3>{title}</h3>
                    </div>
                    {/* Desktop üçün düymə */}
                    {!isSmallScreen && (
                        <div>
                            <button onClick={() => navigate(`/tours/${tour?.id}`)}>
                                <FaArrowRightLong className='mb-1' />
                            </button>
                        </div>
                    )}
                </div>
                {/* Mobil üçün düyməni ayrıca yerə yerləşdiririk */}

            </div>
        </div>
    );
}

export default TourCard;
