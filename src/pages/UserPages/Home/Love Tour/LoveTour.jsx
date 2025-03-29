import { useRef, useState, useEffect } from 'react';
import './loveTour.scss';
import ReserveCard from "../../../../components/UserComponents/ReserveCard/ReserveCard.jsx";
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ReserveModal from "../../../../components/UserComponents/ReserveModal/index.jsx";
import { useGetAllToursQuery } from "../../../../services/adminApi.jsx";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

function LoveTour() {
    const { t } = useTranslation();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const { data: getAllTours } = useGetAllToursQuery();
    const tours = getAllTours?.data || [];

    // Swiper instance və aktiv slide üçün state-lər
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleCardOpen = (tour) => {
        setSelectedTour(tour);
        setOpen(true);
    };

    return (
        <div className="love-tour" >
            <div className="container" data-aos="fade-in">
                <div className="love-title" data-aos="fade-right">
                    <h2>{t("home.loveTour.title", "Ən çox seçilən və sevilən turlar")}</h2>
                    <p>
                        {t("home.loveTour.subtitle", "Ən çox tələb olunan turlarımızla siz də unudulmaz xatirələr yaradın. Rahat uçuşlar, lüks otellər və maraqlı marşrutlarla sizə xüsusi təkliflər təqdim edirik.")}
                    </p>
                </div>
                <div className="col-12 text-end paginate d-none d-md-block" style={{ marginBottom: "40px" }} data-aos="fade-right">
                    <button ref={prevRef} className="white">
                        <FaArrowLeft />
                    </button>
                    <button ref={nextRef} className="blue">
                        <FaArrowRight />
                    </button>
                </div>
                <div className="row slider-row" data-aos="zoom-in">
                    <Swiper
                        spaceBetween={30}
                        grabCursor={true}
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
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    >
                        {tours.map((tour) => (
                            <SwiperSlide key={tour.id}>
                                <ReserveCard tour={tour} onOpen={() => handleCardOpen(tour)} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Custom Pagination */}
                {tours.length > 0 && (
                    <div className="custom-pagination" data-aos="fade-up">
                        {tours.map((_, index) => (
                            <span
                                key={index}
                                className={`custom-bullet ${activeIndex === index ? "active" : ""}`}
                                onClick={() => swiperInstance && swiperInstance.slideTo(index)}
                            ></span>
                        ))}
                    </div>
                )}
                <div className="text-center more" style={{ marginTop: "70px" }} data-aos="fade-up">
                    <button onClick={() => navigate("/tours")}>{t("home.loveTour.button", "Ətraflı bax")}</button>
                </div>
            </div>
            {open && <ReserveModal open={open} setOpen={setOpen} tour={selectedTour} />}
        </div>
    );
}

export default LoveTour;
