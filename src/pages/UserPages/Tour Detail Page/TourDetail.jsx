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
import ReserveModal from "../../../components/UserComponents/ReserveModal/index.jsx";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SameTourCard from "../../../components/UserComponents/SameTourCard/index.jsx";
import image1 from "/src/assets/tour.jpg";
import {useNavigate, useParams} from "react-router-dom";
import {useGetAllToursQuery, useGetTourByIdQuery} from "../../../services/adminApi.jsx";
import {TOUR_CARD_IMG_URL, TOUR_IMG_URL} from "../../../constants.js";
import { useTranslation } from "react-i18next";

function TourDetail() {
    const { t, i18n } = useTranslation();
    const language = i18n.language; // "az", "en", "ru", və s.
    const { tourId } = useParams();
    const { data: getTourById } = useGetTourByIdQuery(tourId);
    const tour = getTourById?.data;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { data: getAllTours } = useGetAllToursQuery();
    const tourss = getAllTours?.data?.filter(item => item.id !== tour?.id && item.tourType === tour?.tourType);
    const tours = tourss?.slice(0,3)
    // Cari dili nəzərə alaraq title və description seçirik:
    let title = tour?.title;
    let description = tour?.description;
    if (tour) {
        if (language === "en") {
            if (tour.titleEng) title = tour.titleEng;
            if (tour.descriptionEng) description = tour.descriptionEng;
        } else if (language === "ru") {
            if (tour.titleRu) title = tour.titleRu;
            if (tour.descriptionRu) description = tour.descriptionRu;
        }
    }
    const [open, setOpen] = useState(false);
    const [selectedTourId, setSelectedTourId] = useState(null);
    console.log(open)

    // Tour-a aid digər xüsusiyyətlərin siyahısı:
    const settings = [
        {
            icon: <CiCalendarDate className="icon" />,
            label: tour ? `${tour.startDate} - ${tour.endDate}` : "",
        },
        {
            icon: <TbBed className="icon" />,
            label: tour?.isOvernighStay
                ? t("tourDetail.overnightYes", "Hoteldə gecələmə")
                : t("tourDetail.overnightNo", "Hoteldə gecələmə yoxdur"),
        },
        {
            icon: <LuTicketPercent className="icon" />,
            label: tour?.isTicket
                ? t("tourDetail.ticketIncluded", "Aviabilet daxildir")
                : t("tourDetail.ticketNotIncluded", "Aviabilet daxil deyil"),
        },
        {
            icon: <TfiHeadphoneAlt className="icon" />,
            label: tour?.isVisa
                ? t("tourDetail.visaAvailable", "Viza dəstəyi var")
                : t("tourDetail.visaNotAvailable", "Viza dəstəyi yoxdur"),
        },
        {
            icon: <PiTruck className="icon" />,
            label: tour?.isInsurance
                ? t("tourDetail.insuranceIncluded", "Sığorta daxildir")
                : t("tourDetail.insuranceNotIncluded", "Sığorta daxil deyil"),
        },
        {
            icon: <VscPerson className="icon" />,
            label: t("tourDetail.guide", "Tur bələdçisi"),
        }
    ];
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (tour?.tourType === "outgoing") {
            navigate("/outGoing");
        } else if (tour?.tourType === "incomming") {
            navigate("/tours");
            console.log("sss")
        }
    };

    return (
        <div className="tourDetail">

            <div className="container">
                <div className="head">
                    <p>
                        {t("tourDetail.breadcrumb", "Ana səhifə / Turlar /")}{" "}
                        <span>{title}</span>
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
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <h5>{t("tourDetail.included", "Tura daxildir")}</h5>
                            <div className="wrapper1">
                                <div className="settings gy-3">
                                    {settings.map((item, index) => (
                                        <div className={item.col} key={index}>
                                            <div className="setting">
                                                {item.icon}{" "}
                                                <span style={{ marginLeft: "8px" }}>
                                                    {item.label}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                                <div className={"col-12"}>
                                    <button
                                        className={"reserveBtn"}
                                        onClick={() => {
                                            setSelectedTourId(tour?.id);
                                            setOpen(true);
                                        }}
                                    >
                                        {t("reserveCard.reserve")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ rowGap: "50px" }}>
                    <div className="col-12">
                        <div className="same-content">
                            <h1>{t("tourDetail.similarTours", "Oxşar Turlar")}</h1>
                            <button className="all desktop-only" onClick={handleNavigate}>
                                {t("tourDetail.viewAll", "Hamısına bax")}
                            </button>
                        </div>
                    </div>
                    {tours?.slice(0, 3).map((item, index) => (
                        <SameTourCard
                            key={item.id}
                            title={
                                language === "en"
                                    ? item.titleEng || item.title
                                    : language === "ru"
                                        ? item.titleRu || item.title
                                        : item.title
                            }
                            image={TOUR_CARD_IMG_URL + item.cardImageUrl}
                            index={index}
                            id={item.id}
                        />
                    ))}

                    <div className="mobile-only">
                        <button className="all" onClick={handleNavigate}>
                            {t("tourDetail.viewAll", "Hamısına bax")}
                        </button>
                    </div>
                </div>
            </div>
            {open && (
                <ReserveModal
                    tour={tour}
                    onClose={() => setOpen(false)}
                    setOpen={setOpen}
                    open={open}
                />
            )}
        </div>
    );
}

export default TourDetail;
