import React, { useState } from 'react';
import './navbar.scss';
import { Link } from "react-router-dom";

import flagAz from '/src/assets/azerbaijan.png';
import flagEn from '/src/assets/uk.png';
import flagRu from '/src/assets/circle.png';
import image1 from '/src/assets/Logo Esas.png';
import { FaChevronDown } from "react-icons/fa";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [toursDropdownOpen, setToursDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleLangDropdown = () => {
        setLangDropdownOpen(!langDropdownOpen);
    };

    const toggleToursDropdown = () => {
        setToursDropdownOpen(!toursDropdownOpen);
    };

    return (
        <section id="myNavbar">
            <div className="container">
                <div className="wrapper">
                    <div className="logo">
                        <img src={image1} alt="Logo"/>
                    </div>
                    <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <Link to="/" className="link">Home</Link>
                        <div className="dropdown tours-dropdown">
                            <button className="dropbtn link" onClick={toggleToursDropdown} style={{
                                fontStyle: '23px !important',
                            }}>
                                Tours <FaChevronDown/>
                            </button>
                            <div className={`dropdown-content ${toursDropdownOpen ? 'show' : ''}`}>
                                <div>
                                    <Link to={"/tours"}>Ölkədaxili</Link>
                                </div>
                                <div>
                                    <Link to={""}>Ölkəxarici</Link>
                                </div>
                            </div>
                        </div>
                        <Link to="/about" className="link">About</Link>
                        <Link to="/contact" className="link">Contact</Link>
                        <Link to="/blog" className="link">Blogs</Link>
                        <Link to="/services" className="link">Services</Link>
                    </nav>
                    <div className="language">
                        <div className="dropdown" onClick={toggleLangDropdown}>
                            <button className="dropbtn">
                                <img src={flagAz} alt="AZ Flag"/>
                                <FaChevronDown/>
                            </button>
                            <div className={`dropdown-content ${langDropdownOpen ? 'show' : ''}`}>
                                <div>
                                    <img src={flagAz} alt="AZ"/>
                                    AZ
                                </div>
                                <div>
                                    <img src={flagEn} alt="EN"/>
                                    EN
                                </div>
                                <div>
                                    <img src={flagRu} alt="RU"/>
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
