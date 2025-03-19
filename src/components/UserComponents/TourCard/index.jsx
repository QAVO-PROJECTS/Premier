import React from 'react';
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

    return (
        <div className={"col-md-3 col-sm-6 col-xs-12"}>
            <div className={"card123"}>
                <div className={"image"}>
                    <img src={TOUR_CARD_IMG_URL + tour?.cardImageUrl} alt={title} />
                    <div className={"raiting"}>
                        <p>5.0 </p> <FaStar />
                    </div>
                </div>
                <div className={"card-content"}>
                    <div className={"text"}>
                        <h3>{title}</h3>
                    </div>
                    <div>
                        <button onClick={() => navigate(`/tours/${tour?.id}`)}>
                            <FaArrowRightLong className={'mb-1'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourCard;
