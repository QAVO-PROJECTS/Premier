import { useRef, useState, useEffect } from 'react';
import Index from "../../../../components/UserComponents/Card/index.jsx";
import "./popular.scss";
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
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const popularRef = useRef(null);

    const { data: getAllPopularCountries } = useGetAllPopularCountriesQuery();
    const populars = getAllPopularCountries?.data || [];
    const modifiedPopulars = [null, ...populars, null];

    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [lastWheelTime, setLastWheelTime] = useState(0);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Handle window resize for breakpoints
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Enable throttled horizontal scroll on wheel
    useEffect(() => {
        const popularElement = popularRef.current;
        if (!popularElement || !swiperInstance) return;

        const handleWheel = (event) => {
            event.preventDefault();
            const currentTime = Date.now();
            const timeDiff = currentTime - lastWheelTime;

            // Throttle: Only allow a slide change every 300ms
            if (timeDiff < 1000) return;

            const delta = event.deltaY;
            if (delta > 0) {
                swiperInstance.slideNext();
            } else if (delta < 0) {
                swiperInstance.slidePrev();
            }

            setLastWheelTime(currentTime);
        };

        popularElement.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            popularElement.removeEventListener('wheel', handleWheel);
        };
    }, [swiperInstance, lastWheelTime]);

    // Determine slides-per-view breakpoints
    const isDesktop = windowWidth >= 1024;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    // Render
    return (
        <div className="popular" data-aos="fade-up" ref={popularRef}>
            <div className="row py-5" data-aos="fade-in">
                <Swiper
                    spaceBetween={30}
                    speed={600} // Slow down slide transition
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
                    onSlideChange={(swiper) =>
                        setActiveIndex(swiper.realIndex)
                    }
                >
                    {modifiedPopulars.map((item, index) => (
                        <SwiperSlide key={item?.id || index}>
                            {item ? (
                                <Index
                                    item={item}
                                    nextItem={modifiedPopulars[index + 1] || null}
                                    isActive={
                                        index ===
                                        (isDesktop || isTablet ? activeIndex + 1 : activeIndex)
                                    }
                                />
                            ) : (
                                <div className="empty-slide"></div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Vertical Titles Scroller */}
                {populars.length > 0 && (
                    <div className="titles-container" data-aos="fade-up">
                        <div
                            className="titles-wrapper"
                            style={{ transform: `translateY(-${activeIndex * 200}px)` }}
                        >
                            {populars.map((item) => {
                                let name = item.name;
                                if (language === "en" && item.nameEng) name = item.nameEng;
                                if (language === "ru" && item.nameRu) name = item.nameRu;
                                return (
                                    <div key={item.id} className="title-item">
                                        {name.toLocaleUpperCase()}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Custom Pagination Bullets */}
                {populars.length > 0 && (
                    <div className="custom-pagination" data-aos="fade-up">
                        {Array.from({ length: populars.length }).map((_, idx) => (
                            <span
                                key={idx}
                                className={`custom-bullet ${
                                    activeIndex === idx ? "active" : ""
                                }`}
                                onClick={() => swiperInstance?.slideTo(idx + 1)}
                            ></span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Popular;