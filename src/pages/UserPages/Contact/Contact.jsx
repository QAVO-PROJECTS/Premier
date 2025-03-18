import React, { useEffect } from 'react';
import "./contact.scss";
import { RiMailOpenFill, RiWhatsappFill } from "react-icons/ri";
import { PiInstagramLogoFill } from "react-icons/pi";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook, FaPhone } from "react-icons/fa";
import { MdLocationOn, MdWatchLater } from "react-icons/md";
import back from "../../../assets/blue.png";
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
    const { t } = useTranslation();

    // AOS animasiyalarını ilkinləşdiririk
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className={"contact"} data-aos="fade-up">
            <div className={"container"} data-aos="fade-up">
                <div className={"head"} data-aos="fade-right">
                    <p>
                        {t("contact.breadcrumb", "Ana səhifə /")}{" "}
                        <span>{t("contact.pageTitle", "Əlaqə")}</span>
                    </p>
                </div>
                <div className={"title"} data-aos="fade-right">
                    <h2>{t("contact.title", "Bizimlə Əlaqə")}</h2>
                    <p>
                        {t(
                            "contact.subtitle",
                            "Səyahətinizlə bağlı suallarınız var? Elə indi bizimlə əlaqə saxlayın və xəyalınızdakı turu birlikdə gerçəkləşdirək"
                        )}
                    </p>
                </div>
                <div className={"row gx-5 gy-5"} data-aos="fade-up">
                    <div className={"col-lg-6 col-md-6"}>
                        <div className={"form"} data-aos="zoom-in">
                            <h2>{t("contact.formTitle", "Formanı dolduraraq bizimlə əlaqə saxlayın")}</h2>
                            <form>
                                <div className={"row"}>
                                    <div className={'col-lg-6'}>
                                        <label>{t("contact.firstNameLabel", "Adınız")}</label>
                                        <input
                                            type="text"
                                            placeholder={t("contact.firstNamePlaceholder", "Ad")}
                                            required
                                        />
                                    </div>
                                    <div className={"col-lg-6"}>
                                        <label>{t("contact.lastNameLabel", "Soyadınız")}</label>
                                        <input
                                            type="text"
                                            placeholder={t("contact.lastNamePlaceholder", "Soyad")}
                                            required
                                        />
                                    </div>
                                    <div className={"col-12"}>
                                        <label>{t("contact.emailLabel", "Email")}</label>
                                        <input
                                            type="email"
                                            placeholder={t("contact.emailPlaceholder", "premiertour@gmail.com")}
                                            required
                                        />
                                    </div>
                                    <div className={"col-12"}>
                                        <label>{t("contact.phoneLabel", "Telefon Nömrəsi")}</label>
                                        <input
                                            type="text"
                                            placeholder={t("contact.phonePlaceholder", "+994 55 852 33 99")}
                                            required
                                        />
                                    </div>
                                    <div className={"col-12"}>
                                        <label>{t("contact.messageLabel", "Qeyd")}</label>
                                        <textarea rows="5" required></textarea>
                                    </div>
                                </div>
                                <button type="submit">{t("contact.submitButton", "Göndər")}</button>
                            </form>
                        </div>
                    </div>
                    <div className={"col-lg-6 col-md-6"}>
                        <div className={"contact-part"} data-aos="zoom-in">
                            <div className={"header"} data-aos="fade-right">
                                <h5>{t("contact.socialTitle", "Sosyal Medya:")}</h5>
                                <div className={"social"}>
                                    <RiWhatsappFill className={"icon"} />
                                    <PiInstagramLogoFill className={"icon"} />
                                    <AiFillTikTok className={"icon"} />
                                    <FaFacebook className={"icon"} />
                                </div>
                            </div>
                            <div className={"row gy-4"} data-aos="fade-up">
                                <div className={"col-lg-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon blue"}>
                                            <MdLocationOn />
                                        </div>
                                        <div className={"content"}>
                                            <p>{t("contact.addressLabel", "Ünvan")}</p>
                                            <span>{t("contact.addressValue", "Bakı, Nizami küçəsi 45")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-lg-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon orange"}>
                                            <FaPhone />
                                        </div>
                                        <div className={"content"}>
                                            <p>{t("contact.phoneCardLabel", "Telefon nömrəsi")}</p>
                                            <span>{t("contact.phoneCardValue", "+994 55 876 44 55")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-lg-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon green"}>
                                            <RiMailOpenFill />
                                        </div>
                                        <div className={"content"}>
                                            <p>{t("contact.emailCardLabel", "E-mail")}</p>
                                            <span>{t("contact.emailCardValue", "premiertour@gmail.com")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-lg-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon purple"}>
                                            <MdWatchLater />
                                        </div>
                                        <div className={"content"}>
                                            <p>{t("contact.hoursLabel", "İş saatı")}</p>
                                            <span>{t("contact.hoursValue", "10:00 - 20:00")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"map"} data-aos="fade-up">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.1223320125227!2d49.870123675826804!3d40.40614067144131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d4dbe0d1d61%3A0xc059fa4b6641d0cd!2sPremier%20Tour!5e0!3m2!1saz!2saz!4v1741175929226!5m2!1saz!2saz"
                                    width="100%"
                                    height="445"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={back} alt="" className={"back"} data-aos="zoom-in" />
        </div>
    );
}

export default Contact;
