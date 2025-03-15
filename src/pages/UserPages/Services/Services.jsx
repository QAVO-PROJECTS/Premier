import React from 'react';
import image from "../../../assets/Rectangle 39858.png";
import {LuIdCard, LuTicketPercent} from "react-icons/lu";
import {GoArrowRight} from "react-icons/go";
import './services.scss'
import {IoBusSharp} from "react-icons/io5";

function Services() {
    return (
        <div className={"services"}>
            <div className={"banner"}>
                <div className={"container"}>
                    <div className={"head"}>
                        <p>Ana səhifə / <span>Xidmətlərimiz</span></p>
                    </div>
                    <div className={"title"}>
                        <h2>Xidmətlərimiz</h2>
                        <p>Rahat və unudulmaz səyahət üçün peşəkar xidmətlər</p>
                    </div>

                </div>
                <img src={image} alt=''/>
            </div>
            <div className={"container"}>
                <div className={"services-card"}>
                    <div className={"row"} style={{marginBottom: "90px"}}>
                        <div className={"col-4"}>
                            <div className={"servis-card"}>
                                <div className={"servis-card-icon"}>
                                    <LuTicketPercent/>
                                </div>
                                <h5>Aviabilet satışı</h5>
                                <p>Dünyanın aparıcı aviaşirkətləri ilə birbaşa əməkdaşlıq.</p>
                                <button><a href="#1"><GoArrowRight className={"icon"}/></a></button>
                            </div>
                        </div>
                        <div className={"col-4"}>
                            <div className={"servis-card"}>
                                <div className={"servis-card-icon"}>
                                    <LuIdCard/>
                                </div>
                                <h5>Viza dəstəyi</h5>
                                <p>Viza üçün müraciət edən şəxslərə hərtərəfli dəstək təklif edirik.</p>
                                <button><a href="#2"><GoArrowRight className={"icon"}/></a></button>
                            </div>
                        </div>
                        <div className={"col-4"}>
                            <div className={"servis-card"}>
                                <div className={"servis-card-icon"}>
                                    <IoBusSharp/>
                                </div>
                                <h5>Transfer xidmətləri</h5>
                                <p>Lüks və komfortlu nəqliyyat vasitələri ilə yüksək səviyyəli transfer.</p>
                                <button><a href="#3"><GoArrowRight className={"icon"}/></a></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"services-more"}>
                    <h3 id={"1"}>1. Premier Tur Aviabilet Satışı – Etibarlı və Sürətli Xidmət!</h3>
                    <p>
                        Premier Tur olaraq, Beynəlxalq Hava Nəqliyyatı Assosiasiyasının (IATA) akkreditasiyasına sahibik
                        və dünyanın aparıcı aviaşirkətləri ilə birbaşa əməkdaşlıq edirik. Bu, müştərilərimizə ən sərfəli
                        qiymətlərlə, təhlükəsiz və etibarlı aviabilet xidmətləri təqdim etməyimizə imkan yaradır.<br/>
                        ✅ Rezervasiya və bilet satışı üçün rəsmi agentlik statusu<br/>✅ Dünyanın istənilən nöqtəsinə
                        operativ və sərfəli aviabilet seçimləri <br/>✅ Qatar Airways, Türk Hava Yolları, Emirates, Lufthansa,
                        British Airways, FlyDubai və digər aparıcı aviaşirkətlərlə əməkdaşlıq <br/>
                        📍 Rahat və sərfəli səyahət üçün aviabiletinizi bizimlə sifariş edin! 🌍🎟️
                    </p>
                    <h3 id={"2"}>
                        2. Premier Tur Aviabilet Satışı – Etibarlı və Sürətli Xidmət!
                    </h3>
                    <p>
                        Səyahət etmək üçün lazım olan viza üçün müraciət edən şəxslərə hərtərəfli dəstək təklif edirik. Xidmətlərimiz aşağıdakılardan ibarətdir:<br/>
                        <strong>Viza Müraciətinin Hazırlanması:</strong> Səyahət planınıza uyğun olaraq viza üçün bütün sənədləri hazırlamağa kömək edirik. Bu, viza müraciət formasının doldurulmasından tutmuş, lazımi əlavə sənədlərin, məsələn, maliyyə və səyahət sığortası sənədlərinin hazırlanmasına qədər hər şeyi əhatə edir.<br/>
                        <strong>Viza Tipinin Seçilməsi:</strong> Hansı viza növü ilə müraciət etməli olduğunuzu müəyyənləşdirməyə kömək edirik – turizm, iş, təhsil və ya digər xüsusi vizalar.<br/>
                        <strong>Viza İcazələri ilə Əlaqədar Dəstək:</strong> Müraciətinizin vəziyyətini izləmək, viza icazələrinizin alınması və hər hansı bir problem yaranarsa, onu həll etmək üçün sizə dəstək veririk.<br/>
                        <strong>Konsulluq və Səfirliklə Əlaqə:</strong> Konsulluq və ya səfirliklə əlaqə qurmağa kömək edirik, randevu alırıq və viza müraciətiniz üçün lazım olan məlumatları təmin edirik.<br/>
                        <strong>Viza Müsahibəsi Hazırlığı:</strong> Əgər viza üçün müsahibə tələb olunursa, müsahibəyə necə hazırlıq görməyiniz və qarşılaşacağınız suallara necə cavab verməyiniz barədə sizi məlumatlandırırıq.<br/>
                    </p>
                    <h3 id={'3'}>
                        3. Transfer Xidmətləri – Rahat və Təhlükəsiz Səfərlər!
                    </h3>
                    <p>
                        Premier Tur olaraq, lüks və komfortlu nəqliyyat vasitələri ilə yüksək səviyyəli transfer xidməti təqdim edirik. Sizin rahatlığınız və təhlükəsizliyiniz bizim üçün prioritetdir!<br/>
                        ✅ Təhlükəsiz və peşəkar sürücülər <br/>✅ Komfortlu avtomobillər, mikroavtobuslar və avtobuslar<br/>✅ Türk, ingilis və rus dillərində danışan sürücülər<br/>✅ Hava limanlarında VIP qarşılama və müşayiət<br/>
                        ✈️ Dünya Aviaşirkətləri Xidmətinizdədir!<br/>
                        Premier Tur qlobal hava yolları şəbəkəsinə çıxış təmin edərək, sizə dünyanın istənilən nöqtəsinə rahat və sərfəli uçuş imkanı yaradır.<br/>
                        📍 Səyahətinizin hər anında bizimlə güvəndə olun! 🌍
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Services;