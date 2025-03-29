import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { useGetAllCustomerViewsQuery } from "../../../services/adminApi.jsx";
import { CUSTOMER_IMG_URL } from "../../../constants.js";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./index.scss"; // Custom stil üçün SCSS faylınız

const SwiperComponent = () => {
    const { data: getAllCustomerViews } = useGetAllCustomerViewsQuery();
    const views = getAllCustomerViews?.data || [];
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    if (views.length === 0) return null;

    return (
        <div className="swiper-wrapper-mobile">
            <Swiper
                modules={[EffectCoverflow]}
                loop={true}
                spaceBetween={30}
                effect="coverflow"
                speed={800} // Keçid sürətini 800ms təyin edirik
                coverflowEffect={{
                    rotate: 50, // slaydın dönmə bucağı
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {views.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="testimonial-card"
                            style={{
                                backgroundColor: index % 2 === 0 ? "#FFEEF0" : "#ffffff",
                                border: "1px solid #EAEAEA",
                                padding: "20px",
                                borderRadius: "8px",
                                margin: "0 auto",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "30px",
                                }}
                            >
                                <img
                                    src={CUSTOMER_IMG_URL + item?.profilImage}
                                    alt={item.customerName}
                                    className="avatar"
                                />
                                <h3>{item.customerName}</h3>
                            </div>
                            <p>{item.reviewText}</p>
                            <div className="card-foot">
                                <div className="stars">
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                        <i key={i} className="fas fa-star" />
                                    ))}
                                </div>
                                <h2>"</h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Custom Pagination */}
            <div className="custom-pagination">
                {views.map((_, index) => (
                    <span
                        key={index}
                        className={`custom-bullet ${activeIndex === index ? "active" : ""}`}
                        onClick={() => swiperInstance && swiperInstance.slideToLoop(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default SwiperComponent;
