import React, { useRef, useState, useEffect } from 'react';
import './tourBlog.scss';
import { FaArrowLeft, FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import Index from "../../../../components/UserComponents/BlogCard/index.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css/navigation';

function TourBlog() {
    const arr = new Array(6).fill(0);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);

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

    return (
        <div className="tour-blog">
            <div className="container">
                <div className="head">
                    <div className="title">
                        <h2>Səyahət Bloqu</h2>
                        <p>
                            Dünyanı kəşf etməyə hazırsınız? Səyahət hekayələri, faydalı məsləhətlər və unudulmaz məkanlar haqqında yazılar burada!
                        </p>
                    </div>
                    <button className={"d-none d-md-block"}>
                        Hamısına bax <FaArrowRightLong />
                    </button>
                </div>

                <div className="row slider-row">
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
                        {arr.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Index index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="col-12 text-end paginate" style={{ marginTop: "40px" }}>
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
