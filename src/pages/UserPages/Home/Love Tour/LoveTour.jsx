import React, {useRef, useState} from 'react';
import './loveTour.scss'
import ReserveCard from "../../../../components/UserComponents/ReserveCard/ReserveCard.jsx";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ReserveModal from "../../../../components/UserComponents/ReserveModal/index.jsx";
function LoveTour() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [open, setOpen] = useState(false)
    return (
        <div className={"love-tour"}>
            <div className={"container"}>
                <div className={"title"}>
                    <h2>Ən çox seçilən və sevilən turlar</h2>
                    <p>Ən çox tələb olunan turlarımızla siz də unudulmaz xatirələr yaradın. Rahat uçuşlar, lüks otellər və maraqlı marşrutlarla sizə xüsusi təkliflər təqdim edirik.</p>
                </div>
                <div className={"col-12 text-end paginate"} style={{marginBottom:"40px"}}>
                    <button ref={prevRef}  className={"white"}><FaArrowLeft /></button>
                    <button ref={nextRef}  className={"blue"} ><FaArrowRight /></button>
                </div>
                <div className={"row slider-row"}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        grabCursor={true}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current
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
                <div className={"text-center more"} style={{marginTop:"70px"}}><button onClick={() => setOpen(true)}>Ətraflı bax</button></div>
                {open && <ReserveModal open={open} setOpen={setOpen}/>}
            </div>
        </div>
    );
}

export default LoveTour;