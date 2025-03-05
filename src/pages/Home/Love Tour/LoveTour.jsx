import React from 'react';
import './loveTour.scss'
import ReserveCard from "../../../components/ReserveCard/ReserveCard.jsx";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

function LoveTour() {
    return (
        <div className={"love-tour"}>
            <div className={"container"}>
                <div className={"title"}>
                    <h2>Ən çox seçilən və sevilən turlar</h2>
                    <p>Ən çox tələb olunan turlarımızla siz də unudulmaz xatirələr yaradın. Rahat uçuşlar, lüks otellər və maraqlı marşrutlarla sizə xüsusi təkliflər təqdim edirik.</p>
                </div>
                {/*<div className={"row"}>*/}
                {/*    <ReserveCard/>*/}
                {/*    <ReserveCard/>*/}
                {/*    <ReserveCard/>*/}
                {/*</div>*/}
                <div className={"row"}>
                    <Swiper
                        slidesPerView={3.5}
                        spaceBetween={30}
                        grabCursor={true}

                        className="mySwiper"
                    >
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                        <SwiperSlide><ReserveCard/></SwiperSlide>
                    </Swiper>
                </div>
                <div className={"text-center more"} style={{marginTop:"70px"}}><button>Ətraflı bax</button></div>
            </div>
        </div>
    );
}

export default LoveTour;