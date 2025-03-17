import React, { useState } from "react";
import { Link } from "react-router-dom";
import aze from "../../../assets/azerbaijan.png";
import rus from "../../../assets/circle.png";
import eng from "../../../assets/uk.png";
import logo from "../../../assets/Logo Esas.png";
import "./navbar.scss";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const lang = "eng";

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleBurger = () => {
        setIsBurgerOpen((prev) => {
            const newState = !prev;
            console.log(newState);
            return newState;
        });
    };

    return (
        <div className="navbar-sec">
            <nav className="navbar navbar-expand-md" aria-label="Fourth navbar example">
                <div className="container p-0">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Logo" style={{ width: "150px", height: "65px" }} />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleBurger}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className={`collapse navbar-collapse ${isBurgerOpen ? "show" : ""}`}
                        id="navbarsExample04"
                        style={{ backgroundColor: "white" }}
                    >
                        <ul className="navbar-nav m-auto mb-2 mb-md-0 gap-3">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Tours
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/tours">
                                            Ölkədaxili
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/tours">
                                            Ölkəxarici
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blog">
                                    Blog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services">
                                    Services
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="nav-item dropdown"
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        <div className="nav-link dropdown-toggle" onClick={toggleDropdown}>
                            {lang === "aze" ? (
                                <img src={aze} alt="AZE" style={{ width: "30px", height: "30px" }} />
                            ) : lang === "eng" ? (
                                <img src={eng} alt="ENG" style={{ width: "30px", height: "30px" }} />
                            ) : lang === "rus" ? (
                                <img src={rus} alt="RUS" style={{ width: "30px", height: "30px" }} />
                            ) : (
                                ""
                            )}
                        </div>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu show">
                                <li>
                                    <Link className="dropdown-item">
                                        <img
                                            src={aze}
                                            alt="AZE"
                                            style={{ width: "30px", height: "30px", marginRight: "10px" }}
                                        />{" "}
                                        AZE
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item">
                                        <img
                                            src={rus}
                                            alt="RUS"
                                            style={{ width: "30px", height: "30px", marginRight: "10px" }}
                                        />{" "}
                                        RUS
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item">
                                        <img
                                            src={eng}
                                            alt="ENG"
                                            style={{ width: "30px", height: "30px", marginRight: "10px" }}
                                        />{" "}
                                        ENG
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
