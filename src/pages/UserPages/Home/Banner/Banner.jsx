import { useState, useEffect } from 'react';
import './banner.scss';
import { CiSearch } from 'react-icons/ci';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Banner() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleSearch = () => {
        if (inputValue.trim()) {
            setLoading(true);
            setTimeout(() => {
                setSearchTerm(inputValue.trim());
            }, 1500);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        // Show content after a short delay (optional)
        const timer = setTimeout(() => {
            setShowContent(true);
            AOS.refresh(); // Ensure AOS animations trigger when content appears
        }, 1000); // Adjust delay as needed (e.g., 1000ms = 1 second)

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (searchTerm) {
            navigate(`/search-tours?searchTerm=${searchTerm}`);
        }
    }, [searchTerm, navigate]);

    return (
        <div className="banner-home">
            <div className="container">
                <div className="row justify-content-end">
                    <div
                        className={`col-12 col-lg-9 order-2 order-lg-1 left text-end ${
                            showContent ? 'visible' : ''
                        }`}
                    >
                        <h1 data-aos="fade-right" data-aos-delay="100">
                            <Trans i18nKey="home.bannerHome.title">
                                Dünyanı <span>Premier Tour</span> ilə Kəşf Et
                            </Trans>
                        </h1>
                        <p data-aos="fade-right" data-aos-delay="300">
                            {t(
                                'home.bannerHome.subtitle',
                                'Sizin üçün ən möhtəşəm və unudulmaz turları seçirik – rahat, əyləncəli və dolğun səyahət təcrübəsi üçün bizə güvənin!'
                            )}
                        </p>
                        <div
                            className="d-flex gap-3 choosen"
                            data-aos="fade-right"
                            data-aos-delay="100"
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t(
                                    'home.bannerHome.inputPlaceholder',
                                    'Hara getmək istəyirsiniz ? Şəhər, ölkə və ya tur adı daxil edin...'
                                )}
                            />
                            <button onClick={handleSearch} disabled={loading}>
                                {loading ? (
                                    <CircleLoader color="#ffffff" loading size={25} />
                                ) : (
                                    <CiSearch className="icon-banner" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;