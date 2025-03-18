import React, { useState, useEffect } from 'react';
import './navbar.scss';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import flagAz from '/src/assets/azerbaijan.png';
import flagEn from '/src/assets/uk.png';
import flagRu from '/src/assets/circle.png';
import image1 from '/src/assets/Logo Esas.png';
import { FaChevronDown } from "react-icons/fa";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [toursDropdownOpen, setToursDropdownOpen] = useState(false);

    const { t, i18n } = useTranslation();

    // Komponent yüklənəndə localStorage-dan dil məlumatını oxuyur və tətbiq edir
    useEffect(() => {
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
        // Seçilən dili localStorage-da saxlayırıq
        localStorage.setItem('i18nextLng', lng);
        setLangDropdownOpen(false);
    };

    // İndiki dili bayrağa uyğun təyin edirik
    let currentFlag = flagAz; // default
    if (i18n.language?.startsWith("en")) {
        currentFlag = flagEn;
    } else if (i18n.language?.startsWith("ru")) {
        currentFlag = flagRu;
    } else if (i18n.language?.startsWith("az")) {
        currentFlag = flagAz;
    }

    return (
        <section id="myNavbar">
            <div className="container">
                <div className="wrapper">
                    <div className="logo">
                        <img src={image1} alt="Logo" />
                    </div>
                    <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <Link to="/" className="link">{t("navbar.home")}</Link>
                        <div className="dropdown tours-dropdown">
                            <button
                                className="dropbtn link"
                                onClick={toggleToursDropdown}
                                style={{ fontSize: '23px' }}  // Düzəldilmiş inline stil
                            >
                                {t("navbar.tours")} <FaChevronDown />
                            </button>
                            <div className={`dropdown-content ${toursDropdownOpen ? 'show' : ''}`}>
                                <div>
                                    <Link to="/tours">{t("navbar.domestic")}</Link>
                                </div>
                                <div>
                                    <Link to="">{t("navbar.international")}</Link>
                                </div>
                            </div>
                        </div>
                        <Link to="/about" className="link">{t("navbar.about")}</Link>
                        <Link to="/contact" className="link">{t("navbar.contact")}</Link>
                        <Link to="/blog" className="link">{t("navbar.blogs")}</Link>
                        <Link to="/services" className="link">{t("navbar.services")}</Link>
                    </nav>
                    <div className="language">
                        <div className="dropdown" onClick={toggleLangDropdown}>
                            <button className="dropbtn">
                                <img src={currentFlag} alt="Current Flag" />
                                <FaChevronDown />
                            </button>
                            <div className={`dropdown-content ${langDropdownOpen ? 'show' : ''}`}>
                                <div onClick={() => handleLanguageChange('az')}>
                                    <img src={flagAz} alt="AZ Flag" />
                                    AZ
                                </div>
                                <div onClick={() => handleLanguageChange('en')}>
                                    <img src={flagEn} alt="EN Flag" />
                                    EN
                                </div>
                                <div onClick={() => handleLanguageChange('ru')}>
                                    <img src={flagRu} alt="RU Flag" />
                                    RU
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hamburger menü */}
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
