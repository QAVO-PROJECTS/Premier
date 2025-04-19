// Card/index.jsx
import React from 'react';
import "./index.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { COUNTRY_IMG_URL } from "../../../constants.js";

function Card({ item, nextItem }) {
    const { i18n } = useTranslation();
    const language = i18n.language;

    let titles = [];
    // Determine title for this item
    let currentName = item.name;
    if (language === "en" && item.nameEng) currentName = item.nameEng;
    if (language === "ru" && item.nameRu) currentName = item.nameRu;
    titles.push(currentName);

    // If there is a next item, include its title too
    if (nextItem) {
        let nextName = nextItem.name;
        if (language === "en" && nextItem.nameEng) nextName = nextItem.nameEng;
        if (language === "ru" && nextItem.nameRu) nextName = nextItem.nameRu;
        titles.push(nextName);
    }

    const navigate = useNavigate();
    const images = item.images || [item.countryImage];
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    return (
        <div
            className="col-md-4 col-sm-6 col-xs-12 w-100"
            onClick={() => navigate(`/countryTours/${item.id}`)}
        >
            <div className="card">
                <div className="image">
                    <img
                        src={COUNTRY_IMG_URL + images[currentImageIndex]}
                        alt={currentName}
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;
