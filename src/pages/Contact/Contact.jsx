import React from 'react';
import "./contact.scss"
import {RiMailOpenFill, RiWhatsappFill} from "react-icons/ri";
import {PiInstagramLogoFill} from "react-icons/pi";
import {AiFillTikTok} from "react-icons/ai";
import {FaFacebook, FaPhone} from "react-icons/fa";
import {MdLocationOn, MdWatchLater} from "react-icons/md";
import back from "../../images/blue.png"
function Contact() {
    return (
        <div className={"contact"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>Ana səhifə /  <span>Əlaqə</span></p>
                </div>
                <div className={"title"}>
                    <h2>Bizimlə Əlaqə</h2>
                    <p>Səyahətinizlə bağlı suallarınız var? Elə indi bizimlə əlaqə saxlayın və xəyalınızdakı turu birlikdə gerçəkləşdirək</p>
                </div>
                <div className={"row gx-5"}>
                    <div className={"col-6"}>
                        <div className={"form"}>
                            <h2>Formanı dolduraraq bizimlə əlaqə saxlayın</h2>
                            <form>

                                <div className={"row"}>
                                    <div className={'col-6'}>
                                        <label>Adınız</label>
                                        <input type="text" placeholder="Ad" required/>
                                    </div>
                                    <div className={"col-6"}>
                                        <label>Soyadınız</label>
                                        <input type="text" placeholder="Soyad" required/>
                                    </div>
                                    <div className={"col-12"}>
                                        <label>Email</label>
                                        <input type="email" placeholder="premiertour@gmail.com" required/>
                                    </div>
                                    <div className={"col-12"}>
                                        <label>Telefon Nömrəsi</label>
                                        <input type="text" placeholder="+994 55 852 33 99" required/>
                                    </div>
                                    <div className={"col-12"}>
                                        <label>Qeyd</label>
                                        <textarea rows="5" required></textarea>
                                    </div>
                                </div>
                                <button type="submit">Göndər</button>
                            </form>
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"contact-part"}>
                            <div className={"header"}>
                                <h5>Sosyal Medya:</h5>
                                <div className={"social"}>
                                    <RiWhatsappFill  className={"icon"}/>
                                    <PiInstagramLogoFill  className={"icon"}/>
                                    <AiFillTikTok  className={"icon"}/>
                                    <FaFacebook  className={"icon"}/>
                                </div>
                            </div>
                            <div className={"row gy-4"}>
                                <div className={"col-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon blue"}>
                                            <MdLocationOn />
                                        </div>
                                        <div className={"content"}>
                                            <p>Ünvan</p>
                                            <span>Bakı, Nizami küçəsi 45</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon orange"}>
                                            <FaPhone />
                                        </div>
                                        <div className={"content"}>
                                            <p>Telefon nömrəsi</p>
                                            <span>+994 55 876 44 55</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon green"}>
                                            <RiMailOpenFill />
                                        </div>
                                        <div className={"content"}>
                                            <p>E-mail</p>
                                            <span>premiertour@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className={"contact-card"}>
                                        <div className={"icon purple"}>
                                            <MdWatchLater />
                                        </div>
                                        <div className={"content"}>
                                            <p>İş saatı</p>
                                            <span>10:00 - 20:00</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className={"map"}>
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
            <img src={back} alt="" className={"back"}/>
        </div>
    );
}

export default Contact;