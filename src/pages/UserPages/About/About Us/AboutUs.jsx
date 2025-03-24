import "./aboutUs.scss";
import image from "../../../../assets/aboutCards.jpg";
import { GoArrowRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function AboutUs() {
    const { t } = useTranslation();

    // AOS animasiyalarını ilkinləşdiririk
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="aboutUs" data-aos="fade-up">
            <div className="container" data-aos="fade-up">
                {/* Section 1 */}
                <div className="row" data-aos="fade-right">
                    <div className="col-lg-6">
                        <div className="image">
                            <img src={image} alt={t("aboutUs.section1.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="content right" data-aos="fade-left">
                            <h1>{t("aboutUs.section1.number")}</h1>
                            <h4>{t("aboutUs.section1.title")}</h4>
                            <p>{t("aboutUs.section1.description")}</p>
                            <button>
                                {t("aboutUs.section1.buttonText")} <GoArrowRight className="icon" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="row box" data-aos="fade-right">
                    <div className="col-lg-6">
                        <div className="content left" data-aos="fade-left">
                            <h1>{t("aboutUs.section2.number")}</h1>
                            <h4>{t("aboutUs.section2.title")}</h4>
                            <p>{t("aboutUs.section2.description")}</p>
                            <button>
                                {t("aboutUs.section2.buttonText")} <GoArrowRight className="icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image" data-aos="fade-up">
                            <img src={image} alt={t("aboutUs.section2.title")} />
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="row" data-aos="fade-right">
                    <div className="col-lg-6">
                        <div className="image" data-aos="fade-up">
                            <img src={image} alt={t("aboutUs.section3.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="content right" data-aos="fade-left">
                            <h1>{t("aboutUs.section3.number")}</h1>
                            <h4>{t("aboutUs.section3.title")}</h4>
                            <p>{t("aboutUs.section3.description")}</p>
                            <button>
                                {t("aboutUs.section3.buttonText")} <GoArrowRight className="icon" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 4 */}
                <div className="row box" data-aos="fade-right">
                    <div className="col-lg-6">
                        <div className="content left" data-aos="fade-left">
                            <h1>{t("aboutUs.section4.number")}</h1>
                            <h4>{t("aboutUs.section4.title")}</h4>
                            <p>{t("aboutUs.section4.description")}</p>
                            <button>
                                {t("aboutUs.section4.buttonText")} <GoArrowRight className="icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image" data-aos="fade-up">
                            <img src={image} alt={t("aboutUs.section4.title")} />
                        </div>
                    </div>
                </div>

                {/* More Button */}
                <div className="button" data-aos="zoom-in">
                    <button>{t("aboutUs.moreButton")}</button>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
