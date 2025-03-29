import "./index.scss"
import logo from "../../../assets/LogoEsasRed.png"
import foot from "../../../assets/FooterVectorRed.png"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

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
                  <a href={"https://www.facebook.com/TurAzerbaijan/"} target="_blank"><FaFacebookF className={"icon"} /></a>
                 <a href={"https://www.instagram.com/premiertour.az/"} target="_blank"> <FaInstagram className={"icon"} /></a>
                </div>
              </div>
            </div>
            <div className={"col-lg-7 col-md-6"}>
              <div className={"row"}>
                <div className={"col-lg-4 col-md-6"}>
                  <div className={"footer-service"}>
                    <h3>{t("footer.linksTitle", "Keçidlər")}</h3>
                    <li><Link to={"/"}>{t("footer.home", "Ana səhifə")}</Link></li>
                    <li><Link to={"/outGoing"}>{t("footer.tours", "Ölkəxarici turlar")}</Link></li>
                    <li><Link to={"/tours"}>{t("footer.domesticTours", "Ölkədaxili turlar")}</Link></li>
                    <li><Link to={"/contact"}>{t("footer.contact", "Əlaqə")}</Link></li>
                  </div>
                </div>
                <div className={"col-lg-4 col-md-6"}>
                  <div className={"footer-service"}>
                    <h3>{t("footer.termsTitle", "Şərtlər və Qaydalar")}</h3>
                    <li>
                      <Link to={'/services#1'}>
                        {t("footer.bookingPayments", "Rezervasiya və ödənişlər")}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/services#2'}>
                        {t("footer.cancellationsRefunds", "Ləğv etmə və Geri Ödənişlər")}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/services#3'}>
                        {t("footer.travelInsurance", "Səyahət Sığortası")}
                      </Link>
                    </li>
                  </div>
                </div>

                <div className={"col-lg-4 col-md-6"}>
                  <div className={"footer-service"}>
                    <h3>{t("footer.contactInfoTitle", "Əlaqə məlumatları")}</h3>
                    <li><a href={"tel:+994508961299"} target="_blank">+994 50 896 12 99</a></li>
                    <li><a href={"mailto:premiertour.az@gmail.com"} target="_blank">premiertour.az@gmail.com</a></li>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-lg-6"}>
              <h6>{t("footer.copyright", "© Copyright")} <span>Premier Tour</span> 2025. {t("footer.rightsReserved", "Bütün hüquqlar qorunur.")}</h6>
            </div>
            <div className={"col-lg-6"}>
              <h6 className={"created"}>Created by <a href={"https://www.qavo.codes/"}>Qavo Codes</a></h6>
            </div>
          </div>
        </div>
        <img src={foot} alt="" className={"vector"} />
      </div>
  )
}

export default Footer;
