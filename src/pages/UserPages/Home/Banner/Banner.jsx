import { useState, useEffect } from 'react';
import image from "../../../../assets/BannerEsasRed2.png";
import "./banner.scss";
import { CiSearch } from "react-icons/ci";
import plane from "../../../../assets/BannerPlaneRed.png";
import homeBanner from "../../../../assets/HomeMobileBanner.png";
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import image2 from '/src/assets/MobileBannerRed.png'
import { CircleLoader } from "react-spinners";

function Banner() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (inputValue.trim()) {
            setLoading(true);
            // 1.5 saniyə sonra searchTerm güncellenir
            setTimeout(() => {
                setSearchTerm(inputValue.trim());
            }, 1500);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            navigate(`/search-tours?searchTerm=${searchTerm}`);
        }
    }, [searchTerm, navigate]);

    return (
        <div className="banner-home">
            <div className="container">
                <div className="row">
                    {/* Text sütunu: mobilde ikinci, desktopda birinci */}
                    <div className="col-12 col-lg-6 order-2 order-lg-1 left">
                        <h1>
                            <Trans i18nKey="home.bannerHome.title">
                                Dünyanı <span>Premier Tour</span> ilə Kəşf Et
                            </Trans>
                        </h1>
                        <p>
                            {t("home.bannerHome.subtitle", "Sizin üçün ən möhtəşəm və unudulmaz turları seçirik – rahat, əyləncəli və dolğun səyahət təcrübəsi üçün bizə güvənin!")}
                        </p>
                        <div className="d-flex gap-3 choosen">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t("home.bannerHome.inputPlaceholder", "Hara getmək istəyirsiniz ? Şəhər, ölkə və ya tur adı daxil edin...")}
                            />
                            <button onClick={handleSearch} disabled={loading}>
                                {loading ? (
                                    <CircleLoader
                                        color="#ffffff"
                                        loading
                                        size={25}
                                    />
                                ) : (
                                    <CiSearch className="icon-banner" />
                                )}
                            </button>
                        </div>
                        <img src={plane} alt="" className="plane-image" />
                    </div>

                    {/* Şəkil sütunu: mobilde birinci, desktopda ikinci */}
                    <div className="col-12 col-lg-6 order-1 order-lg-2">
                        {/* Desktop üçün görünəcək şəkil */}
                        <div className="image d-none d-md-block">
                            <img src={image} alt="desktop banner" />
                        </div>
                        {/* Mobil üçün görünəcək şəkil */}
                        <div className="image2 d-block d-md-none">
                            <img src={image2} alt="mobile banner" />
                        </div>
                    </div>
                </div>
            </div>

            <img src={homeBanner} alt="" className="home-banner d-block d-md-none" />
        </div>
    );
}

export default Banner;
