import React from 'react';
import "./index.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { COUNTRY_IMG_URL } from "../../../constants.js";
import { useTranslation } from "react-i18next";

function Card({ item }) {
    const { i18n } = useTranslation();
    const language = i18n.language; // Məsələn: "az", "en", "ru"

    // Cari dili nəzərə alaraq country name seçirik:
    let name = item?.name;
    if (language === "en" && item.nameEng) {
        name = item.nameEng;
    } else if (language === "ru" && item.nameRu) {
        name = item.nameRu;
    }

    return (
        <div className={"col-md-4 col-sm-6 col-xs-12 w-100"}>
            <div className={"card"}>
                <div className={"image"}>
                    <img src={COUNTRY_IMG_URL + item?.countryImage} alt={name} />
                    <div className={"raiting"}>
                        <p>5.0 </p> <FaStar />
                    </div>
                </div>
                <div className={"card-content"}>
                    <div className={"text"}>
                        <h3>{name}</h3>
                    </div>
                    <button>
                        <FaArrowRightLong className={'mb-1'} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
