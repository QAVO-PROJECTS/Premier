import React, { useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import { useGetAllPopularCountriesQuery } from "../../../../services/adminApi.jsx";

function Popular() {
    const { t } = useTranslation();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const { data: getAllPopularCountries } = useGetAllPopularCountriesQuery();
    const populars = getAllPopularCountries?.data;

    // AOS animasiyalarını ilkinləşdiririk
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className={"popular"} data-aos="fade-up">
            <div className={"container"} data-aos="fade-up">
                <div className={"title"} data-aos="fade-right">
                    <h2>{t("home.popular.title", "Ən Populyar Ölkələr")}</h2>
                    <p>
                        {t(
                            "home.popular.subtitle",
                            "Səyahətsevərlərin ən çox bəyəndiyi istiqamətlər! Populyar şəhərlər, rahat turlar və unikal təcrübələr sizi gözləyir."
                        )}
                    </p>
                </div>
                <div className={"row p-5"} data-aos="fade-left">
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
                        {populars &&
                            populars.map((item, index) => (
                                <SwiperSlide key={item.id || index}>
                                    <Index item={item} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
            <div className={"background"} data-aos="zoom-in"></div>
        </div>
    );
}

export default Popular;
