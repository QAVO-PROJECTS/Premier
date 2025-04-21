import { useState, useEffect } from 'react';
import './navbar.scss';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

import flagAz from '/src/assets/azerbaijan.png';
import flagEn from '/src/assets/uk.png';
import flagRu from '/src/assets/circle.png';
import image1 from '/src/assets/PremierTourLogoRed.png';
import { FaChevronDown } from "react-icons/fa";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [toursDropdownOpen, setToursDropdownOpen] = useState(false);

    const [langTimeoutId, setLangTimeoutId] = useState(null);
    const [toursTimeoutId, setToursTimeoutId] = useState(null);

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 100, // Animation duration (0.5s)
            easing: 'ease-out', // Smooth easing
            once: true, // Animate only once
        });

        const storedLang = localStorage.getItem('i18nextLng');
        if (storedLang && storedLang !== i18n.language) {
            i18n.changeLanguage(storedLang);
        }
    }, [i18n]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleLangDropdown = () => {
        setLangDropdownOpen(!langDropdownOpen);
    };

    const toggleToursDropdown = () => {
        setToursDropdownOpen(!toursDropdownOpen);
    };

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
        setLangDropdownOpen(false);
    };

    let currentFlag = flagAz; // default
    if (i18n.language?.startsWith("en")) {
        currentFlag = flagEn;
    } else if (i18n.language?.startsWith("ru")) {
        currentFlag = flagRu;
    } else if (i18n.language?.startsWith("az")) {
        currentFlag = flagAz;
    }

    // Language dropdown timeout handlers
    const handleLangMouseEnter = () => {
        if (langTimeoutId) {
            clearTimeout(langTimeoutId);
            setLangTimeoutId(null);
        }
    };

    const handleLangMouseLeave = () => {
        const timeout = setTimeout(() => {
            setLangDropdownOpen(false);
        }, 1000);
        setLangTimeoutId(timeout);
    };

    // Tours dropdown timeout handlers
    const handleToursMouseEnter = () => {
        if (toursTimeoutId) {
            clearTimeout(toursTimeoutId);
            setToursTimeoutId(null);
        }
    };

    const handleToursMouseLeave = () => {
        const timeout = setTimeout(() => {
            setToursDropdownOpen(false);
        }, 1000);
        setToursTimeoutId(timeout);
    };

    return (
        <section
            id="myNavbar"
            data-aos="slide-down" // AOS slide-down animation
            data-aos-delay="100" // Slight delay for smooth transition
            data-aos-anchor-placement="top-center" // Trigger when top enters viewport
        >
            <div className="container">
                <div className="wrapper">
                    <div className="logo">
                        <img
                            src={image1}
                            alt="Logo"
                            onClick={() => {
                                navigate('/');
                                setMenuOpen(false);
                            }}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <Link
                            to="/"
                            className={`link ${location.pathname === '/' ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t("navbar.home")}
                        </Link>

                        <div
                            className="dropdown tours-dropdown"
                            onMouseEnter={handleToursMouseEnter}
                            onMouseLeave={handleToursMouseLeave}
                        >
                            <button
                                className={`dropbtn link ${(location.pathname === '/tours' || location.pathname === '/outGoing') ? 'active' : ''}`}
                                onClick={toggleToursDropdown}
                            >
                                {t("navbar.tours")} <FaChevronDown className={`zakirinChevronu ${(location.pathname === '/tours' || location.pathname === '/outGoing') ? 'active' : ''}`} />
                            </button>
                            <div className={`dropdown-content ${toursDropdownOpen ? 'show' : ''}`}>
                                <div>
                                    <Link
                                        to="/tours"
                                        onClick={() => {
                                            setToursDropdownOpen(false);
                                            setMenuOpen(false);
                                        }}
                                        className={`link ${location.pathname === '/tours' ? 'active' : ''}`}
                                    >
                                        {t("navbar.domestic")}
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/outGoing"
                                        onClick={() => {
                                            setToursDropdownOpen(false);
                                            setMenuOpen(false);
                                        }}
                                        className={`link ${location.pathname === '/outGoing' ? 'active' : ''}`}
                                    >
                                        {t("navbar.international")}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/about"
                            className={`link ${location.pathname === '/about' ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t("navbar.about")}
                        </Link>
                        <Link
                            to="/blog"
                            className={`link ${location.pathname === '/blog' ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t("navbar.blogs")}
                        </Link>
                        <Link
                            to="/services"
                            className={`link ${location.pathname === '/services' ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t("navbar.services")}
                        </Link>
                        <Link
                            to="/contact"
                            className={`link ${location.pathname === '/contact' ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t("navbar.contact")}
                        </Link>
                    </nav>

                    <div className="language">
                        <div
                            className="dropdown"
                            onClick={toggleLangDropdown}
                            onMouseEnter={handleLangMouseEnter}
                            onMouseLeave={handleLangMouseLeave}
                        >
                            <button className="dropbtn">
                                <img src={currentFlag} alt="Current Flag" />
                                <FaChevronDown className={"zakirinChevronu"} />
                            </button>
                            <div className={`dropdown-content ${langDropdownOpen ? 'show' : ''}`}>
                                <div onClick={() => handleLanguageChange('az')}>
                                    <img src={flagAz} alt="AZ Flag" /> AZ
                                </div>
                                <div onClick={() => handleLanguageChange('en')}>
                                    <img src={flagEn} alt="EN Flag" /> EN
                                </div>
                                <div onClick={() => handleLanguageChange('ru')}>
                                    <img src={flagRu} alt="RU Flag" /> RU
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="burger" onClick={toggleMenu}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navbar;