import "./aboutUs.scss";
import image from "../../../../assets/aboutCards.jpg";
import { GoArrowRight } from "react-icons/go";
import { useTranslation } from "react-i18next";

function AboutUs() {
    const { t } = useTranslation();

    return (
        <div className="aboutUs">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="image">
                            <img src={image} alt={t("aboutUs.section1.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="content right">
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
                <div className="row box">
                    <div className="col-lg-6">
                        <div className="content left">
                            <h1>{t("aboutUs.section2.number")}</h1>
                            <h4>{t("aboutUs.section2.title")}</h4>
                            <p>{t("aboutUs.section2.description")}</p>
                            <button>
                                {t("aboutUs.section2.buttonText")} <GoArrowRight className="icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image">
                            <img src={image} alt={t("aboutUs.section2.title")} />
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="image">
                            <img src={image} alt={t("aboutUs.section3.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="content right">
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
                <div className="row box">
                    <div className="col-lg-6">
                        <div className="content left">
                            <h1>{t("aboutUs.section4.number")}</h1>
                            <h4>{t("aboutUs.section4.title")}</h4>
                            <p>{t("aboutUs.section4.description")}</p>
                            <button>
                                {t("aboutUs.section4.buttonText")} <GoArrowRight className="icon" />
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image">
                            <img src={image} alt={t("aboutUs.section4.title")} />
                        </div>
                    </div>
                </div>

                {/* More Button */}
                <div className="button">
                    <button>{t("aboutUs.moreButton")}</button>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
