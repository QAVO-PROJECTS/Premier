import "./index.scss"
import  logo from "../../../assets/Logo Esas.png"
import foot from "../../../assets/Vector.png"
import { FaFacebookF} from "react-icons/fa";
import {FaInstagram, FaXTwitter} from "react-icons/fa6";
const Footer = () => {
  return (
    <div className={"footer"}>
      <div className="container">
        <div className={"row gy-5"}>
            <div className={"col-4"}>
             <div className={"footer-content"}>
               <img src={logo} alt="" style={{width:"150px",height:"65px"}}/>
               <p> Dünyanı kəşf etmək, yeni təcrübələr yaşamaq və yaddaqalan anlar yaratmaq üçün mükəmməl səyahət seçimidir."</p>
               <div className={"social-media"}>
                 <FaFacebookF className={"icon"}/>
                 <FaInstagram className={"icon"}/>
                 <FaXTwitter className={"icon"}/>
               </div>
             </div>
            </div>
            <div className={"col-7"}>
              <div className={"row"}>
                <div className={"col-4"}>
                  <div className={"footer-service"}>
                    <h3>Keçidlər</h3>
                    <li>Ana səhifə</li>
                    <li>Turlar</li>
                    <li>Ölkədaxili turlar</li>
                    <li>Əlaqə</li>
                  </div>
                </div>
                <div className={"col-4"}>
                  <div className={"footer-service"}>
                    <h3>Şərtlər və Qaydalar</h3>
                    <li>Rezervasiya və ödənişlər</li>
                    <li>Ləğv etmə və Geri Ödənişlər</li>
                    <li>Səyahət Sığortası</li>
                    <li>Müştəri Məsuliyyəti</li>
                  </div>
                </div>
                <div className={"col-4"}>
                  <div className={"footer-service"}>
                    <h3>Əlaqə məlumatları</h3>
                    <li>+994 70 654 34 98</li>
                    <li>Premiertour@gmail.com</li>
                  </div>
                </div>
              </div>
            </div>
          <div className={"col-12"}>
            <h6> © Copyright <span>Premier Tour</span>  2025. Bütün hüquqlar qorunur.</h6>
          </div>
        </div>
      </div>
      <img src={foot} alt="" className={"vector"}/>
    </div>
  )
}

export default Footer