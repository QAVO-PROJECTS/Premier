import React, {useState} from 'react';
import './tourDetail.scss'
import {CiCalendarDate} from "react-icons/ci";
import {TbBed} from "react-icons/tb";
import {LuTicketPercent} from "react-icons/lu";
import {LiaHeadsetSolid} from "react-icons/lia";
import {PiTruck} from "react-icons/pi";
import {VscPerson} from "react-icons/vsc";
import {FaPhone} from "react-icons/fa";
import {RiMailOpenFill} from "react-icons/ri";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import {FreeMode, Navigation, Thumbs} from "swiper/modules";
import SameTourCard from "../../../components/UserComponents/SameTourCard/index.jsx";
import image1 from '/src/assets/tour.jpg'

function TourDetail() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const arr = [{
        title: "İtaliya",
        image: image1

    },
        {
            title: "İspanya ",
            image: image1

        },
        {
            title: "Amsterdam",
            image: image1

        },
    ]
    return (
        <div className={"tourDetail"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>Ana səhifə / Turlar / <span>Monteneqro</span></p>
                </div>
                <div className={"row mb-5"}>
                    <div className={"col-lg-5"}>
                        <Swiper
                            spaceBetween={10}
                            thumbs={{swiper: thumbsSwiper}}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper2"
                        >
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-2.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
                            </SwiperSlide>
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={2}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Thumbs, Navigation]}
                            className="mySwiper"
                            navigation={true}
                        >
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-2.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={"col-lg-7"}>
                        <div className={'content'}>
                            <h3>Monteneqro Turu – Adriatik Sahillərində Unudulmaz Səyahət</h3>
                            <p>Mavi Adriatik dənizi, dağ mənzərələri və tarixi şəhərləri ilə səyahətsevərləri valeh edən
                                bir ölkədir. Bu turda Kotor körfəzi, Budva çimərlikləri, Sveti Stefan adası və Durmitor
                                milli parkı kimi unikal yerləri kəşf edəcəksiniz.Mavi Adriatik dənizi, dağ mənzərələri və tarixi şəhərləri ilə səyahətsevərləri valeh edən
                                bir ölkədir..</p>
                            <h5>Tura daxildir</h5>
                            <div className={"settings row gy-3"}>
                                <div className={"col-lg-5"}>
                                    <div className={"setting"}><CiCalendarDate className={"icon"}/> 10.06.2025 - 16.06.2025
                                    </div>
                                </div>
                                <div className={"col-lg-5"}>
                                    <div className={"setting"}><TbBed className={"icon"}/> Hoteldə gecələmə</div>

                                </div>
                                <div className={"col-lg-4"}>
                                    <div className={"setting"}><LuTicketPercent className={"icon"}/> Aviabilet</div>

                                </div>
                                <div className={"col-lg-4"}>
                                    <div className={"setting"}><LiaHeadsetSolid className={"icon"}/> Viza dəstəyi</div>

                                </div>
                                <div className={"col-lg-3"}>
                                    <div className={"setting"}><PiTruck className={"icon"}/> Transfer</div>

                                </div>
                                <div className={"col-lg-4"}>
                                    <div className={"setting"}><VscPerson className={"icon"}/> Tur bələdçisi</div>

                                </div>


                            </div>
                            <h5>Əlavə məlumat üçün bizimlə əlaqə</h5>
                            <div className={"row gy-3"}>
                                <div className={"col-lg-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon green"}>
                                            <RiMailOpenFill/>
                                        </div>
                                        <div className={"content"}>
                                            <p>E-mail</p>
                                            <span>premiertour@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-lg-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon orange"}>
                                            <FaPhone/>
                                        </div>
                                        <div className={"content"}>
                                            <p>Telefon nömrəsi</p>
                                            <span>+994 55 876 44 55</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{
                    rowGap: '50px'
                }}>
                    <div className={"col-12"}>
                        <div className={"same-content"}>
                            <h1>Oxşar Turlar</h1>
                            <button>Hamısına bax</button>
                        </div>
                    </div>
                    {arr.map((item, index) => (
                        <SameTourCard key={index} title={item.title} image={item.image} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TourDetail;