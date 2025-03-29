import React, { useEffect } from 'react';
import image from "../../../assets/ServicesBannerRed.png";
import { LuIdCard, LuTicketPercent } from "react-icons/lu";
import { GoArrowRight } from "react-icons/go";
import './services.scss';
import { IoBusSharp } from "react-icons/io5";
import { useTranslation, Trans } from 'react-i18next';
import ScrollToTop from "../../../components/ScrollToTop/index.jsx";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Services() {
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            // Hash dəyərindəki '#' simvolunu çıxarırıq
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Smooth scroll
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="services" data-aos="fade-up">
            <ScrollToTop />
            <div className="banner" data-aos="fade-in">
                <div className="container" data-aos="zoom-in">
                    <div className="head" data-aos="fade-right">
                        <p>
                            {t("services.breadcrumb", "Ana səhifə /")}{" "}
                            <span>{t("services.pageTitle", "Xidmətlərimiz")}</span>
                        </p>
                    </div>
                    <div className="title" data-aos="fade-up">
                        <h2>{t("services.mainTitle", "Xidmətlərimiz")}</h2>
                        <p>{t("services.subtitle", "Rahat və unudulmaz səyahət üçün peşəkar xidmətlər")}</p>
                    </div>
                </div>
                <img src={image} alt='' className="servis-banner-image" data-aos="zoom-in"/>
            </div>
            <div className="container" data-aos="fade-up">
                <div className="services-card" data-aos="fade-in">
                    <div className="row" style={{ marginBottom: "90px", rowGap: "200px" }} data-aos="zoom-in">
                        <div className="col-lg-4" data-aos="flip-left">
                            <div className="servis-card">
                                <div className="servis-card-icon">
                                    <LuTicketPercent />
                                </div>
                                <h5>{t("services.card1.title", "Aviabilet satışı")}</h5>
                                <button>
                                    <a href="#1">
                                        <GoArrowRight className="icon" />
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="flip-up">
                            <div className="servis-card">
                                <div className="servis-card-icon">
                                    <LuIdCard />
                                </div>
                                <h5>{t("services.card2.title", "Viza dəstəyi")}</h5>
                                <button>
                                    <a href="#2">
                                        <GoArrowRight className="icon" />
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="flip-right">
                            <div className="servis-card">
                                <div className="servis-card-icon">
                                    <IoBusSharp />
                                </div>
                                <h5>{t("services.card3.title", "Transfer xidmətləri")}</h5>
                                <button>
                                    <a href="#3">
                                        <GoArrowRight className="icon" />
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="services-more" data-aos="fade-up">
                    <div className="service-more">
                        <div className="iki" id="1" style={{
                            height: '80px',
                            width: '100%',
                            visibility: 'hidden',
                        }}></div>
                        <div className="zadsdasd" data-aos="fade-in">
                            <h3>
                                {t("services.more.section1.title", "1. Premier Tur Aviabilet Satışı – Etibarlı və Sürətli Xidmət!")}
                            </h3>
                            <p>
                                <div style={{marginBottom:"7px"}}>{t("services.more.section1.description")}</div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section1.description1" >
                                </Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section1.description2"></Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section1.description3"></Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section1.description4"></Trans></div>
                                <div>{t("services.more.section1.description5")}</div>
                            </p>
                        </div>
                    </div>
                    <div className="service-more" data-aos="fade-up">
                        <div className="iki" id="2" style={{
                            height: '80px',
                            width: '100%',
                            visibility: 'hidden',
                        }}></div>
                        <div className="zadsdasd" data-aos="fade-in">
                            <h3>
                                {t("services.more.section2.title", "2. Premier Tur Aviabilet Satışı – Etibarlı və Sürətli Xidmət!")}
                            </h3>
                            <p>
                                <div style={{marginBottom:"7px"}}>{t("services.more.section2.description")}</div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section2.description1" >
                                </Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section2.description2"></Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section2.description3"></Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section2.description4"></Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section2.description5"></Trans></div>
                                <div>{t("services.more.section2.description6")}</div>
                            </p>
                        </div>
                    </div>
                    <div className="service-more" data-aos="fade-up">
                        <div className="iki" id="3" style={{
                            height: '80px',
                            width: '100%',
                            visibility: 'hidden',
                        }}></div>
                        <div className="zadsdasd" data-aos="fade-in">
                            <h3>
                                {t("services.more.section3.title", "3. Transfer Xidmətləri – Rahat və Təhlükəsiz Səfərlər!")}
                            </h3>
                            <p>
                                <div style={{marginBottom:"7px"}}>{t("services.more.section3.description")}</div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section3.description1" >
                                </Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section3.description2"></Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section3.description3"></Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section3.description4"></Trans></div>
                                <div style={{marginBottom:"7px"}}>✅ <Trans i18nKey="services.more.section3.description5"></Trans></div>
                                <div>{t("services.more.section3.description6")}</div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
