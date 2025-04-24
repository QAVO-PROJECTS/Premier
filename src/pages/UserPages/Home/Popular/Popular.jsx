import { useRef, useState, useEffect } from 'react';
import Index from "../../../../components/UserComponents/Card/index.jsx";
import "./popular.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
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
    const modifiedPopulars = populars;

    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0); // Tracks the center slide index
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [lastWheelTime, setLastWheelTime] = useState(0);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Enable throttled horizontal scroll
    useEffect(() => {
        const popularElement = popularRef.current;
        if (!popularElement || !swiperInstance) return;

        const handleWheel = (event) => {
            event.preventDefault();
            const currentTime = Date.now();
            const timeDiff = currentTime - lastWheelTime;

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

    // Calculate the center slide index for desktop
    const getCenterSlideIndex = (swiper) => {
        if (!swiper || !modifiedPopulars.length) return 0;

        if (isDesktop) {
            // In desktop mode (slidesPerView: 3), calculate the center slide index
            // Use realIndex to handle looping correctly
            let centerIndex = swiper.realIndex +1;
            // Adjust for the center slide in a 3-slide view
            return centerIndex % modifiedPopulars.length;
        } else {
            // In mobile or tablet mode, use realIndex directly
            return swiper.realIndex;
        }
    };

    // Calculate title offset based on the center slide index
    const titleHeight = 200; // Height of each title-item
    const titleOffset = activeIndex * titleHeight;

    return (
        <div className="popular" data-aos="fade-up">
            <div className="row" data-aos="fade-in" ref={popularRef}>
                <Swiper
                    spaceBetween={30}
                    speed={600}
                    loop={true}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination',
                        bulletClass: 'custom-bullet',
                        bulletActiveClass: 'active',
                    }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                    onSwiper={(swiper) => {
                        setSwiperInstance(swiper);
                        if (prevRef.current && nextRef.current) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                        // Set initial activeIndex based on center slide
                        setActiveIndex(getCenterSlideIndex(swiper));
                    }}
                    onSlideChange={(swiper) => {
                        // Update activeIndex to reflect the center slide
                        setActiveIndex(getCenterSlideIndex(swiper));
                    }}
                >
                    {modifiedPopulars.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <Index
                                item={item}
                                nextItem={modifiedPopulars[(index + 1) % modifiedPopulars.length] || null}
                                isActive={index === activeIndex}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Vertical Titles Scroller */}
                {populars.length > 0 && (
                    <div className="titles-container" data-aos="fade-up">
                        <div
                            className="titles-wrapper"
                            style={{
                                transform: `translateY(-${titleOffset}px)`,
                                transition: 'transform 0.6s ease',
                            }}
                        >
                            {populars.map((item, index) => {
                                let name = item.name;
                                if (language === "en" && item.nameEng) name = item.nameEng;
                                if (language === "ru" && item.nameRu) name = item.nameRu;
                                return (
                                    <div key={item.id} className="title-item">
                                        <h2>{name.toLocaleUpperCase()}</h2>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Pagination */}
            {populars.length > 0 && (
                <div className="custom-pagination" data-aos="fade-up">
                    {Array.from({ length: populars.length }).map((_, idx) => (
                        <span
                            key={idx}
                            className={`custom-bullet ${activeIndex === idx ? "active" : ""}`}
                            onClick={() => {
                                if (swiperInstance) {
                                    // Directly use idx for slideToLoop to align with realIndex
                                    swiperInstance.slideToLoop(idx);
                                }
                            }}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Popular;