import { useRef, useState, useEffect } from 'react';
import Index from "../../../../components/UserComponents/Card/index.jsx";
import "./popular.scss";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { useGetAllPopularCountriesQuery } from "../../../../services/adminApi.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Popular() {
    const { t } = useTranslation();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const { data: getAllPopularCountries } = useGetAllPopularCountriesQuery();
    const populars = getAllPopularCountries?.data || [];

    // Swiper instance və aktiv slayd indeksi üçün state-lər
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Ekran ölçüsünü izləmək üçün state
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Ekran ölçüsündəki dəyişiklikləri izləmək
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Pagination üçün bullet sayını hesablamaq
    const isDesktop = windowWidth >= 1024;
    const bulletCount = isDesktop
        ? Math.ceil(populars.length / 3)
        : populars.length;

    // Aktiv bullet-un hesablanması
    const activeBullet = isDesktop
        ? Math.floor(activeIndex / 3)
        : activeIndex;

    return (
        <div className="popular" data-aos="fade-up">
            <div className="container" data-aos="fade-up">
                <div className="title" data-aos="fade-right">
                    <h2>{t("home.popular.title", "Ən Populyar Ölkələr")}</h2>
                    <p>
                        {t(
                            "home.popular.subtitle",
                            "Səyahətsevərlərin ən çox bəyəndiyi istiqamətlər! Populyar şəhərlər, rahat turlar və unikal təcrübələr sizi gözləyir."
                        )}
                    </p>
                </div>
                <div className="row p-5" data-aos="fade-in">
                    <div className="col-12 text-end d-none d-md-block" style={{ marginBottom: "40px" }}>
                        <button ref={prevRef} className="white">
                            <FaArrowLeft />
                        </button>
                        <button ref={nextRef} className="blue">
                            <FaArrowRight />
                        </button>
                    </div>
                    <Swiper
                        spaceBetween={30}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                        onSwiper={(swiper) => {
                            setSwiperInstance(swiper);
                            if (prevRef.current && nextRef.current) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                        // Keçid tamamlandıqda aktiv indeksi yeniləyirik
                        onSlideChangeTransitionEnd={(swiper) => setActiveIndex(swiper.realIndex)}
                    >
                        {populars.map((item, index) => (
                            <SwiperSlide key={item.id || index}>
                                <Index item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Custom Pagination */}
                    {populars.length > 0 && (
                        <div className="custom-pagination" data-aos="fade-up">
                            {[...Array(bulletCount)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`custom-bullet ${activeBullet === index ? "active" : ""}`}
                                    onClick={() => {
                                        if (swiperInstance) {
                                            // Desktopda hər bullet 3 kartı, mobilda isə tək kartı göstərir
                                            swiperInstance.slideTo(isDesktop ? index * 3 : index);
                                        }
                                    }}
                                ></span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="background" data-aos="zoom-in"></div>
        </div>
    );
}

export default Popular;
