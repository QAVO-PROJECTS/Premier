import React, { useState } from "react";
import "./tourDetail.scss";
import { CiCalendarDate } from "react-icons/ci";
import { TbBed } from "react-icons/tb";
import { LuTicketPercent } from "react-icons/lu";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { PiTruck } from "react-icons/pi";
import { VscPerson } from "react-icons/vsc";
import { FaPhone } from "react-icons/fa";
import { RiMailOpenFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SameTourCard from "../../../components/UserComponents/SameTourCard/index.jsx";
import image1 from "/src/assets/tour.jpg";
import { useParams } from "react-router-dom";
import { useGetTourByIdQuery } from "../../../services/adminApi.jsx";
import { TOUR_IMG_URL } from "../../../constants.js";
import { useTranslation } from "react-i18next";

// Əgər API-dən gələn şəkil dəyərləri yalnız fayl adıdırsa, aşağıdakı baseUrl-i uyğunlaşdırın.
const baseUrl = "http://your-server.com/uploads/";

function TourDetail() {
    const { t } = useTranslation();
    const { tourId } = useParams();
    const { data: getTourById } = useGetTourByIdQuery(tourId);
    const tour = getTourById?.data;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const settings = [
        {
            icon: <CiCalendarDate className="icon" />,
            label: tour ? `${tour.startDate} - ${tour.endDate}` : "",
            col: "col-lg-5"
        },
        {
            icon: <TbBed className="icon" />,
            label: tour?.isOvernighStay
                ? t("tourDetail.overnightYes", "Hoteldə gecələmə")
                : t("tourDetail.overnightNo", "Hoteldə gecələmə yoxdur"),
            col: "col-lg-5"
        },
        {
            icon: <LuTicketPercent className="icon" />,
            label: tour?.isTicket
                ? t("tourDetail.ticketIncluded", "Aviabilet daxildir")
                : t("tourDetail.ticketNotIncluded", "Aviabilet daxil deyil"),
            col: "col-lg-4"
        },
        {
            icon: <TfiHeadphoneAlt className="icon" />,
            label: tour?.isVisa
                ? t("tourDetail.visaAvailable", "Viza dəstəyi var")
                : t("tourDetail.visaNotAvailable", "Viza dəstəyi yoxdur"),
            col: "col-lg-4"
        },
        {
            icon: <PiTruck className="icon" />,
            label: tour?.isInsurance
                ? t("tourDetail.insuranceIncluded", "Sığorta daxildir")
                : t("tourDetail.insuranceNotIncluded", "Sığorta daxil deyil"),
            col: "col-lg-3"
        },
        {
            icon: <VscPerson className="icon" />,
            label: t("tourDetail.guide", "Tur bələdçisi"),
            col: "col-lg-4"
        }
    ];

    return (
        <div className="tourDetail">
            <div className="container">
                <div className="head">
                    <p>
                        {t("tourDetail.breadcrumb", "Ana səhifə / Turlar /")}{" "}
                        <span>{tour?.title}</span>
                    </p>
                </div>
                <div className="row mb-5">
                    <div className="col-lg-5">
                        <Swiper
                            spaceBetween={10}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper2"
                        >
                            {tour?.tourImageUrls?.map((imgUrl, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        // Əgər imgUrl tam URL deyilsə, baseUrl ilə birləşdirə bilərsiniz:
                                        src={TOUR_IMG_URL + imgUrl}
                                        alt={`tour image ${index}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={2}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Thumbs, Navigation]}
                            className="mySwiper"
                            navigation={true}
                        >
                            {tour?.tourImageUrls?.map((imgUrl, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={TOUR_IMG_URL + imgUrl}
                                        alt={`tour image thumb ${index}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col-lg-7">
                        <div className="content">
                            <h3>{tour?.title}</h3>
                            <p>{tour?.description}</p>
                            <h5>{t("tourDetail.included", "Tura daxildir")}</h5>
                            <div className="settings row gy-3">
                                {settings.map((item, index) => (
                                    <div className={item.col} key={index}>
                                        <div className="setting">
                                            {item.icon} {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h5>{t("tourDetail.contactHeading", "Əlavə məlumat üçün bizimlə əlaqə")}</h5>
                            <div className="row gy-3">
                                <div className="col-lg-6">
                                    <div className="contact-card">
                                        <div className="icon green">
                                            <RiMailOpenFill />
                                        </div>
                                        <div className="content">
                                            <p>{t("tourDetail.emailLabel", "E-mail")}</p>
                                            <span>premiertour@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="contact-card">
                                        <div className="icon orange">
                                            <FaPhone />
                                        </div>
                                        <div className="content">
                                            <p>{t("tourDetail.phoneLabel", "Telefon nömrəsi")}</p>
                                            <span>+994 55 876 44 55</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ rowGap: "50px" }}>
                    <div className="col-12">
                        <div className="same-content">
                            <h1>{t("tourDetail.similarTours", "Oxşar Turlar")}</h1>
                            <button className="all desktop-only">{t("tourDetail.viewAll", "Hamısına bax")}</button>
                        </div>
                    </div>
                    {[
                        { title: "İtaliya", image: image1 },
                        { title: "İspanya", image: image1 },
                        { title: "Amsterdam", image: image1 }
                    ].map((item, index) => (
                        <SameTourCard key={index} title={item.title} image={item.image} index={index} />
                    ))}
                    <div className="mobile-only">
                        <button className="all">{t("tourDetail.viewAll", "Hamısına bax")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourDetail;
