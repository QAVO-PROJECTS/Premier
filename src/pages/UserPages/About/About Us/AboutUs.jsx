import "./aboutUs.scss";
import xankendi from "/src/assets/xankendi.jpg"
import qala from "/src/assets/qala.jpg"
import agali from "/src/assets/8Bh6q2KCJ6Pv6K2m8oq6NnkUnI1hSo6r.jpg"
import oldGates from "/src/assets/46944556.jpg"
import natavan from "/src/assets/natavan.jpg"
import { GoArrowRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import {FaInstagram} from "react-icons/fa6";
import "aos/dist/aos.css";
import AOS from "aos";
import {useEffect} from "react";
function AboutUs() {
    const { t } = useTranslation();
    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000,
                once: true,
            });
        }, 800);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="aboutUs">
            <div className="container">
                <div className="row box">
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="image">
                            <img src={agali} alt={t("aboutUs.section1.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="content right">
                            <h1>{t("aboutUs.section1.number")}</h1>
                            <h4>{t("aboutUs.section1.title")}</h4>
                            <p>{t("aboutUs.section1.description")}</p>
                            <button>
                                <a href={'https://www.instagram.com/agali.hotel.zengilan?igsh=eWZtMncxa3QwYTBh'} target="_blank">
                                <FaInstagram className={"icon"}/>   {t("aboutUs.section1.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="row ">
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="content left">
                            <h1>{t("aboutUs.section2.number")}</h1>
                            <h4>{t("aboutUs.section2.title")}</h4>
                            <p>{t("aboutUs.section2.description")}</p>
                            <button>
                                <a href={"https://www.instagram.com/natavan_restaurant?igsh=MTZ5bnRmYndzNTh2Mw== "} target="_blank"><FaInstagram className={"icon"}/>  {t("aboutUs.section2.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="image">
                            <img src={natavan} alt={t("aboutUs.section2.title")} />
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="row box">
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="image">
                            <img src={xankendi} alt={t("aboutUs.section3.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="content right">
                            <h1>{t("aboutUs.section3.number")}</h1>
                            <h4>{t("aboutUs.section3.title")}</h4>
                            <p>{t("aboutUs.section3.description")}</p>
                            <button>
                                <a href={'https://www.instagram.com/khankandi.qalahotel?igsh=NGxkZzYwdWF6YXIw '} target="_blank"><FaInstagram className={"icon"}/>  {t("aboutUs.section3.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row ">
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="content left">
                            <h1>{t("aboutUs.section4.number")}</h1>
                            <h4>{t("aboutUs.section4.title")}</h4>
                            <p>{t("aboutUs.section4.description")}</p>
                            <button>
                                <a href={"https://www.instagram.com/oldgatescafe/?igsh=eHQwamZrNzR0cTA2"} target="_blank"><FaInstagram className={"icon"}/> {t("aboutUs.section4.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="image">
                            <img src={oldGates} alt={t("aboutUs.section4.title")} />
                        </div>
                    </div>
                </div>
                <div className="row box">
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="image">
                            <img src={qala} alt={t("aboutUs.section5.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="content right">
                            <h1>{t("aboutUs.section5.number")}</h1>
                            <h4>{t("aboutUs.section5.title")}</h4>
                            <p>{t("aboutUs.section5.description")}</p>
                            <button>
                                <a href={"https://www.instagram.com/qalahotel_shaki/?igsh=MXRkamllcjYwcGw5cw%3D%3D"} target="_blank"><FaInstagram className={"icon"}/> {t("aboutUs.section4.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AboutUs;
