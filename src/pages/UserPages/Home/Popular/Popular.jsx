import React, { useRef } from 'react';
import Index from "../../../../components/UserComponents/Card/index.jsx";
import "./popular.scss";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

function Popular() {
    const { t } = useTranslation();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className={"popular"}>
            <div className={"container"}>
                <div className={"title"}>
                    <h2>{t("home.popular.title", "Ən Populyar Ölkələr")}</h2>
                    <p>
                        {t(
                            "home.popular.subtitle",
                            "Səyahətsevərlərin ən çox bəyəndiyi istiqamətlər! Populyar şəhərlər, rahat turlar və unikal təcrübələr sizi gözləyir."
                        )}
                    </p>
                </div>
                <div className={"row p-5"}>
                    <div className={"col-12 text-end d-none d-md-block"} style={{ marginBottom: "40px" }}>
                        <button ref={prevRef} className={"white"}>
                            <FaArrowLeft />
                        </button>
                        <button ref={nextRef} className={"blue"}>
                            <FaArrowRight />
                        </button>
                    </div>
                    <Swiper
                        spaceBetween={30}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            if (prevRef.current && nextRef.current) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                        className="mySwiper"
                    >
                        <SwiperSlide><Index /></SwiperSlide>
                        <SwiperSlide><Index /></SwiperSlide>
                        <SwiperSlide><Index /></SwiperSlide>
                        <SwiperSlide><Index /></SwiperSlide>
                        <SwiperSlide><Index /></SwiperSlide>
                        <SwiperSlide><Index /></SwiperSlide>
                        <SwiperSlide><Index /></SwiperSlide>
                        <SwiperSlide><Index /></SwiperSlide>
                        <SwiperSlide><Index /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className={"background"}></div>
        </div>
    );
}

export default Popular;
