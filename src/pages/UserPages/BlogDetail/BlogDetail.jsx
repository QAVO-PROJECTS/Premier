import './blogDetail.scss'
import image from "../../../assets/blogDetail.jpg"
import {FiCopy} from "react-icons/fi";
import {FaArrowRightLong, FaXTwitter} from "react-icons/fa6";
import {FaFacebook, FaLinkedin} from "react-icons/fa";
import image1 from "../../../assets/contentIage.jpg"
import BlogDetailCard from "../../../components/UserComponents/BlogDetailCard/BlogDetailCard.jsx";
function BlogDetail() {
    return (
        <div id={"blog-detail"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>Ana səhifə / Bloq / <span>Dünyanın Ən Yaxşı Hava Limanları – Harada Rahat Gözləmək Olar?</span></p>
                </div>
                <div className={"blogContent"}>
                    <div className={"date"}>
                        02.03.2025
                    </div>
                    <h1>Dünyanın Ən Yaxşı Hava Limanları – Harada Rahat Gözləmək Olar?</h1>
                    <p>Səyahət edərkən hava limanında vaxt keçirmək bəzən yorucu ola bilər, amma bəzi hava limanları sərnişinlər üçün rahat və lüks şərait yaradır. Gəlin, dünyanın ən yaxşı hava limanlarını araşdıraq və hansı hava limanında gözləməyin daha xoş olduğunu öyrənək!</p>
                    <img src={image} alt=""/>
                </div>
                <div className={"blog-detail-content"}>
                    <div className={"title"}>
                        <div className={"text"}>
                            <h6>Premier Tur Səyahət Blogu</h6>
                            <p>Müəllif</p>
                        </div>
                        <div className={"social"}>
                            <div className={"detail-icon"}>
                                <FiCopy />   Copy link
                            </div>
                            <div className={"detail-icon"}>
                                <FaXTwitter />
                            </div>
                            <div className={"detail-icon"}>
                                <FaFacebook />
                            </div>
                            <div className={"detail-icon"}>
                                <FaLinkedin />
                            </div>
                        </div>
                    </div>
                    <div className={'detail-content'}>
                        <h4>1. Sinqapur Changi Hava Limanı (SIN) – Dünyanın Lideri</h4>
                        <p>Sinqapurun Changi Hava Limanı dəfələrlə dünyanın ən yaxşı hava limanı seçilib. Buraya adi hava limanı kimi baxmaq mümkün deyil – bu, əslində böyük bir istirahət və əyləncə mərkəzidir. Jewel Changi kompleksi hava limanının ən diqqətçəkən məkanlarından biridir. Burada dünyanın ən hündür qapalı şəlaləsi, yaşıl tropik bağlar və interaktiv əyləncə zonaları var.
                            Changi hava limanında vaxt keçirmək üçün çox sayda maraqlı seçimlər mövcuddur. Sərnişinlər pulsuz kinoteatrdan istifadə edə, ticarət mərkəzində brend mağazalara baş çəkə və ya rahat lounge zonalarında dincələ bilərlər. Sərnişinlər üçün xüsusi yuxu kabinələri və rahat kreslolar da mövcuddur. Wi-Fi xidməti sürətlidir və hər kəs üçün pulsuzdur.
                            Əgər uzun tranzitiniz varsa, Changi hava limanı sizi sıxmadan zamanınızı əyləncəli keçirməyə imkan yaradacaq ən yaxşı yerdir.</p>
                        <img src={image1} alt=""/>
                        <em>Əgər uzun tranzitiniz varsa, Changi hava limanı sizi sıxmadan zamanınızı əyləncəli keçirməyə imkan yaradacaq ən yaxşı yerdir.</em>
                        <h4>2.Seul Incheon Beynəlxalq Hava Limanı (ICN) – Texnologiya və Komfortun Birliyi</h4>
                        <p>Cənubi Koreyanın paytaxtı Seulda yerləşən Incheon Beynəlxalq Hava Limanı, sərnişinlər üçün ən rahat hava limanlarından biri hesab olunur. Bura səyahətçilərə təqdim etdiyi texnoloji yeniliklər və yüksək xidmət səviyyəsi ilə tanınır.
                            Hava limanında pulsuz duş otaqları, yüksək səviyyəli istirahət zonaları və Koreya mədəniyyətini tanıdan sərgilər var. Burada sərnişinlər üçün xüsusi buz meydançası, golf sahəsi və hətta SPA mərkəzi mövcuddur. Bunlardan əlavə, Incheon hava limanında pulsuz Wi-Fi xidməti var və çox rahat işləyir.
                            Əgər siz gözləmə zamanı həm texnologiya, həm də rahatlıq istəyirsinizsə, Seul Incheon Beynəlxalq Hava Limanı mükəmməl seçimdir.</p>
                        <img src={image1} alt=""/>
                        <h4>3.Sürix Hava Limanı (ZRH) – Avropanın Ən Rahat Hava Limanı</h4>
                        <p>İsveçrənin Sürix Hava Limanı Avropanın ən rahat və səliqəli hava limanlarından biridir. Burada hər şey səmərəli və dəqiq təşkil edilib, sərnişinlər üçün rahat və stressiz mühit yaradılıb.
                            Sürix hava limanında sürətli təhlükəsizlik yoxlamaları və pasport nəzarəti prosesi tranzit edən sərnişinlər üçün böyük üstünlükdür. Burada geniş lounge zonaları, qapalı və açıq istirahət yerləri, eləcə də müxtəlif restoranlar var. Duty-free mağazalar yüksək keyfiyyətli məhsullar təklif edir və geniş çeşidlərə malikdir.</p>
                        <img src={image1} alt=""/>
                    </div>
                    <div className={"title"}>
                        <div className={"text"}>
                            <h6>Premier Tur Səyahət Blogu</h6>
                            <p>Müəllif</p>
                        </div>
                        <div className={"social"}>
                            <div className={"detail-icon"}>
                                <FiCopy />   Copy link
                            </div>
                            <div className={"detail-icon"}>
                                <FaXTwitter />
                            </div>
                            <div className={"detail-icon"}>
                                <FaFacebook />
                            </div>
                            <div className={"detail-icon"}>
                                <FaLinkedin />
                            </div>
                        </div>
                    </div>

                </div>
                <div className={"blog-recommed"}>
                    <div className={"recommedTitle"}>
                        <h5>Blogdan</h5>
                        <button>Hamısına bax   <FaArrowRightLong /></button>
                    </div>
                    <p>Dünyanı kəşf etməyə hazırsınız? Səyahət hekayələri, faydalı məsləhətlər və unudulmaz məkanlar haqqında yazılar burada!</p>
                    <div className={"row gy-3"}>
                        <BlogDetailCard/>
                        <BlogDetailCard/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;