import React, { useRef, useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './tourBlog.scss';
import { FaArrowLeft, FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import Index from "../../../../components/UserComponents/BlogCard/index.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css/navigation';
import { useGetAllBlogsQuery } from "../../../../services/adminApi.jsx";
import { useTranslation } from 'react-i18next';

function TourBlog() {
    const { t } = useTranslation();
    const arr = new Array(6).fill(0);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);

    // AOS animasiyalarını ilkinləşdiririk
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            // Yenidən navigation düymələrinin elementlərini təyin edirik
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            // Mövcud navigation instance-ni yenidən initialize edirik
            swiperInstance.navigation.destroy();
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    const { data: getAllBlogs } = useGetAllBlogsQuery();
    const blogs = getAllBlogs?.data.slice(0, 8);

    return (
        <div className="tour-blog" data-aos="fade-up">
            <div className="container" data-aos="fade-up">
                <div className="head" data-aos="fade-right">
                    <div className="title">
                        <h2>{t("home.tourBlog.title", "Səyahət Bloqu")}</h2>
                        <p>
                            {t(
                                "home.tourBlog.subtitle",
                                "Dünyanı kəşf etməyə hazırsınız? Səyahət hekayələri, faydalı məsləhətlər və unudulmaz məkanlar haqqında yazılar burada!"
                            )}
                        </p>
                    </div>
                    <button className={"d-none d-md-block"} data-aos="zoom-in">
                        {t("home.tourBlog.button", "Hamısına bax")} <FaArrowRightLong />
                    </button>
                </div>

                <div className="row slider-row" data-aos="fade-left">
                    <Swiper
                        onSwiper={setSwiperInstance}
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
                            1440: {
                                slidesPerView: 4,
                            },
                        }}
                        spaceBetween={30}
                        grabCursor={true}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                        onBeforeInit={(swiper) => {
                            // Bu callback sayəsində navigation elementləri ilkin olaraq təyin edilir
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                    >
                        {blogs && blogs.map((blog, index) => (
                            <SwiperSlide key={index} data-aos="fade-up">
                                <Index index={index} blog={blog} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="col-12 text-end paginate" style={{ marginTop: "40px" }} data-aos="fade-up">
                    <button ref={prevRef} className="white">
                        <FaArrowLeft />
                    </button>
                    <button ref={nextRef} className="blue">
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TourBlog;
