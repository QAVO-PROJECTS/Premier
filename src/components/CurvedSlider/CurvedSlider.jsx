import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./curvedSlider.scss";

const testimonials = [
    { name: "Aysel M.", review: "Bu şirkətlə Maldivlərə səyahət etdik...", image: "https://via.placeholder.com/50" },
    { name: "Ramin S.", review: "İlk dəfə Avropaya səyahət etdim...", image: "https://via.placeholder.com/50" },
    { name: "Nigar T.", review: "Paris və Amsterdam tur paketini seçdik...", image: "https://via.placeholder.com/50" },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image: "https://via.placeholder.com/50" }
];

const CurvedSlider = () => {
    const [activeIndex, setActiveIndex] = useState(1); // İlk dəfə ortadakı slayd aktiv olsun

    return (
        <div className="slider-container">
            <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={true}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="curved-swiper"
            >
                {testimonials.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className={`curved-slide ${index === activeIndex ? "active" : ""}`}
                    >
                        <div className="testimonial-card">
                            <img src={item.image} alt={item.name} className="avatar" />
                            <h3>{item.name}</h3>
                            <p>{item.review}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CurvedSlider;
