import "./index.scss"
import logo from "../../../assets/Logo Esas.png"
import foot from "../../../assets/Vector.png"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
      <div className={"footer"}>
        <div className="container">
          <div className={"row gy-5"}>
            <div className={"col-lg-4 col-md-6"}>
              <div className={"footer-content"}>
                <img src={logo} alt="" style={{ width: "150px", height: "65px" }} />
                <p>{t("footer.tagline", "Dünyanı kəşf etmək, yeni təcrübələr yaşamaq və yaddaqalan anlar yaratmaq üçün mükəmməl səyahət seçimidir.")}</p>
                <div className={"social-media"}>
                  <FaFacebookF className={"icon"} />
                  <FaInstagram className={"icon"} />
                  <FaXTwitter className={"icon"} />
                </div>
              </div>
            </div>
            <div className={"col-lg-7 col-md-6"}>
              <div className={"row"}>
                <div className={"col-lg-4 col-md-6"}>
                  <div className={"footer-service"}>
                    <h3>{t("footer.linksTitle", "Keçidlər")}</h3>
                    <li>{t("footer.home", "Ana səhifə")}</li>
                    <li>{t("footer.tours", "Turlar")}</li>
                    <li>{t("footer.domesticTours", "Ölkədaxili turlar")}</li>
                    <li>{t("footer.contact", "Əlaqə")}</li>
                  </div>
                </div>
                <div className={"col-lg-4 col-md-6"}>
                  <div className={"footer-service"}>
                    <h3>{t("footer.termsTitle", "Şərtlər və Qaydalar")}</h3>
                    <li>{t("footer.bookingPayments", "Rezervasiya və ödənişlər")}</li>
                    <li>{t("footer.cancellationsRefunds", "Ləğv etmə və Geri Ödənişlər")}</li>
                    <li>{t("footer.travelInsurance", "Səyahət Sığortası")}</li>
                    <li>{t("footer.customerLiability", "Müştəri Məsuliyyəti")}</li>
                  </div>
                </div>
                <div className={"col-lg-4 col-md-6"}>
                  <div className={"footer-service"}>
                    <h3>{t("footer.contactInfoTitle", "Əlaqə məlumatları")}</h3>
                    <li>{t("footer.phone", "+994 70 654 34 98")}</li>
                    <li>{t("footer.email", "Premiertour@gmail.com")}</li>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-12"}>
              <h6>{t("footer.copyright", "© Copyright")} <span>Premier Tour</span> 2025. {t("footer.rightsReserved", "Bütün hüquqlar qorunur.")}</h6>
            </div>
          </div>
        </div>
        <img src={foot} alt="" className={"vector"} />
      </div>
  )
}

export default Footer;
