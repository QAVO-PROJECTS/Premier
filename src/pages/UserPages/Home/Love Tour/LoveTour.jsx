import React, { useRef, useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

function LoveTour() {
    const { t } = useTranslation();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null); // Seçilmiş turun məlumatı
    const { data: getAllTours } = useGetAllToursQuery();
    const tours = getAllTours?.data;

    // AOS animasiyalarını ilkinləşdiririk
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    // Kartın "Rezervasiya et" düyməsinə basılınca çağırılan funksiya
    const handleCardOpen = (tour) => {
        setSelectedTour(tour);
        setOpen(true);
    };

    return (
        <div className="love-tour" data-aos="fade-up">
            <div className="container" data-aos="fade-up">
                <div className="title" data-aos="fade-right">
                    <h2>{t("home.loveTour.title", "Ən çox seçilən və sevilən turlar")}</h2>
                    <p>
                        {t("home.loveTour.subtitle", "Ən çox tələb olunan turlarımızla siz də unudulmaz xatirələr yaradın. Rahat uçuşlar, lüks otellər və maraqlı marşrutlarla sizə xüsusi təkliflər təqdim edirik.")}
                    </p>
                </div>
                <div className="col-12 text-end paginate d-none d-md-block" style={{ marginBottom: "40px" }} data-aos="fade-left">
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
                        onBeforeInit={(swiper) => {
                            if (prevRef.current && nextRef.current) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                    >
                        {tours && tours.map((tour) => (
                            <SwiperSlide key={tour.id}>
                                {/* onOpen prop-u vasitəsilə valideynə məlumat ötürürük */}
                                <ReserveCard tour={tour} onOpen={() => handleCardOpen(tour)} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="text-center more" style={{ marginTop: "70px" }} data-aos="fade-up">
                    <button onClick={() => setOpen(true)}>{t("home.loveTour.button", "Ətraflı bax")}</button>
                </div>
                {/* Modal LoveTour bölməsində render olunur və seçilmiş turun məlumatı oraya ötürülür */}
                {open && <ReserveModal open={open} setOpen={setOpen} tour={selectedTour} />}
            </div>
        </div>
    );
}

export default LoveTour;
