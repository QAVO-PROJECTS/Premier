import React, {useRef} from 'react';
import Card from "../../../components/Card/Card.jsx";
import "./popular.scss"
import {FaArrowLeft} from "react-icons/fa6";
import {FaArrowRight} from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
function Popular() {

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className={"popular"}>
            <div className={"container"}>
               <div className={"title"}>
                   <h2>Ən Populyar Ölkələr</h2>
                   <p>Səyahətsevərlərin ən çox bəyəndiyi istiqamətlər! Populyar şəhərlər, rahat turlar və unikal təcrübələr sizi gözləyir.</p>
               </div>
                <div className={"row p-5"}>
                    <div className={"col-12 text-end "} style={{marginBottom:"40px"}}>
                        <button ref={prevRef}  className={"white"}><FaArrowLeft /></button>
                        <button ref={nextRef}  className={"blue"} ><FaArrowRight /></button>
                    </div>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current
                        }}
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            if (prevRef.current && nextRef.current) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                        className="mySwiper"
                    >
                            <SwiperSlide><Card/></SwiperSlide>
                            <SwiperSlide><Card/></SwiperSlide>
                            <SwiperSlide><Card/></SwiperSlide>
                            <SwiperSlide><Card/></SwiperSlide>
                            <SwiperSlide><Card/></SwiperSlide>
                            <SwiperSlide><Card/></SwiperSlide>
                            <SwiperSlide><Card/></SwiperSlide>
                            <SwiperSlide><Card/></SwiperSlide>
                            <SwiperSlide><Card/></SwiperSlide>
                    </Swiper>
                </div>

            </div>
            <div className={"background"}></div>
        </div>
    );
}

export default Popular;