import React from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { TbBed } from "react-icons/tb";
import { LuTicketPercent } from "react-icons/lu";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import "./reserveCard.scss";
import { TOUR_CARD_IMG_URL } from "../../../constants.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ReserveCard({ tour, onOpen }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="col-4 w-100">
            <div className="reserveCard">
                <div className="image" onClick={() => navigate(`/tours/${tour?.id}`)}>
                    <img src={TOUR_CARD_IMG_URL + tour?.cardImageUrl} alt="" />
                </div>
                <div className="card-content">
                    <div className="text">
                        <h3>{tour?.title}</h3>
                        <li>
                            <CiCalendarDate className="icon" /> {tour?.startDate} - {tour?.endDate}
                        </li>
                        <li>
                            <TbBed className="icon" />{" "}
                            {tour?.isOvernighStay
                                ? t("reserveCard.overnightYes", "Hoteldə gecələmə")
                                : t("reserveCard.overnightNo", "Hoteldə gecələmə yoxdur")}
                        </li>
                        <li>
                            <LuTicketPercent className="icon" />{" "}
                            {tour?.isTicket
                                ? t("reserveCard.ticketIncluded", "Aviabilet daxildir")
                                : t("reserveCard.ticketNotIncluded", "Aviabilet daxil deyil")}
                        </li>
                        <li>
                            <TfiHeadphoneAlt className="icon" />{" "}
                            {tour?.isInsurance
                                ? t("reserveCard.insuranceIncluded", "Səyahət sığortası daxildir")
                                : t("reserveCard.insuranceNotIncluded", "Səyahət sığortası daxil deyil")}
                        </li>
                        <button onClick={onOpen}>{t("reserveCard.reserve", "Rezervasiya et")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReserveCard;
