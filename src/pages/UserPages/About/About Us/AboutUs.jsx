import "./aboutUs.scss";
import image from "../../../../assets/aboutCards.jpg";
import premier from "/src/assets/PremierHotel.jpg"
import qala from "/src/assets/406437754.jpg"
import agali from "/src/assets/8Bh6q2KCJ6Pv6K2m8oq6NnkUnI1hSo6r.jpg"
import oldGates from "/src/assets/46944556.jpg"
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
                <div className="row">
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="image">
                            <img src={premier} alt={t("aboutUs.section1.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="content right">
                            <h1>{t("aboutUs.section1.number")}</h1>
                            <h4>Premier Hotel</h4>
                            <p>{t("aboutUs.section1.description")}</p>
                            <button>
                                <a href={"https://www.instagram.com/premiertour.az?igsh=MTdqa3RhdHNocDZrMw=="}><FaInstagram className={"icon"}/>   {t("aboutUs.section1.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="row box">
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="content left">
                            <h1>{t("aboutUs.section2.number")}</h1>
                            <h4>Qala Hotel</h4>
                            <p>{t("aboutUs.section2.description")}</p>
                            <button>
                                <a href={"https://www.instagram.com/qalahotels.az?igsh=dzRjcnFtanFnYWNw "}><FaInstagram className={"icon"}/>  {t("aboutUs.section2.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="image">
                            <img src={qala} alt={t("aboutUs.section2.title")} />
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="row">
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="image">
                            <img src={agali} alt={t("aboutUs.section3.title")} />
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="content right">
                            <h1>{t("aboutUs.section3.number")}</h1>
                            <h4>Agalı Hotel Zangilan</h4>
                            <p>{t("aboutUs.section3.description")}</p>
                            <button>
                                <a href={'https://www.instagram.com/agali.hotel.zengilan?igsh=eWZtMncxa3QwYTBh'}><FaInstagram className={"icon"}/>  {t("aboutUs.section3.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 4 */}
                <div className="row box">
                    <div className="col-lg-6" data-aos={"fade-right"}>
                        <div className="content left">
                            <h1>{t("aboutUs.section4.number")}</h1>
                            <h4>Premier Old Gates Hotel</h4>
                            <p>{t("aboutUs.section4.description")}</p>
                            <button>
                                <a href={"https://www.instagram.com/premieroldgates/"}><FaInstagram className={"icon"}/> {t("aboutUs.section4.buttonText")} <GoArrowRight className="icon" /></a>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos={"fade-up"}>
                        <div className="image">
                            <img src={oldGates} alt={t("aboutUs.section4.title")} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AboutUs;
