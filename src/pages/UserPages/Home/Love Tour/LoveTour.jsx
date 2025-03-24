import {useRef, useState} from 'react';
import './loveTour.scss';
import ReserveCard from "../../../../components/UserComponents/ReserveCard/ReserveCard.jsx";
import 'swiper/css';
import {Swiper, SwiperSlide} from "swiper/react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules';
import ReserveModal from "../../../../components/UserComponents/ReserveModal/index.jsx";
import {useGetAllToursQuery} from "../../../../services/adminApi.jsx";
import {useTranslation} from 'react-i18next';
import {useNavigate} from "react-router-dom";

function LoveTour() {
    const {t} = useTranslation();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const {data: getAllTours} = useGetAllToursQuery();
    const tours = getAllTours?.data;

    const handleCardOpen = (tour) => {
        setSelectedTour(tour);
        setOpen(true);
    };
    const navigate = useNavigate();

    return (
        <div className="love-tour">
            <div className="container">
                <div className="love-title">
                    <h2>{t("home.loveTour.title", "Ən çox seçilən və sevilən turlar")}</h2>
                    <p>
                        {t("home.loveTour.subtitle", "Ən çox tələb olunan turlarımızla siz də unudulmaz xatirələr yaradın. Rahat uçuşlar, lüks otellər və maraqlı marşrutlarla sizə xüsusi təkliflər təqdim edirik.")}
                    </p>
                </div>
                <div className="col-12 text-end paginate d-none d-md-block" style={{marginBottom: "40px"}}>
                    <button ref={prevRef} className="white">
                        <FaArrowLeft/>
                    </button>
                    <button ref={nextRef} className="blue">
                        <FaArrowRight/>
                    </button>
                </div>
                <div className="row slider-row">
                    <Swiper
                        spaceBetween={30}
                        grabCursor={true}
                        breakpoints={{
                            0: {slidesPerView: 1},
                            768: {slidesPerView: 2},
                            1024: {slidesPerView: 3},
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
                                <ReserveCard tour={tour} onOpen={() => handleCardOpen(tour)}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="text-center more" style={{marginTop: "70px"}}>
                    <button onClick={() => navigate("/tours")}>{t("home.loveTour.button", "Ətraflı bax")}</button>
                </div>
            </div>
            {open && <ReserveModal open={open} setOpen={setOpen} tour={selectedTour}/>}
        </div>
    );
}

export default LoveTour;
