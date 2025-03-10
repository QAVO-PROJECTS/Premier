import React from "react";
import {Link} from "react-router-dom";
import  aze from "../../images/azerbaijan.png"
import  rus from "../../images/circle.png"
import  eng from "../../images/uk.png"
import  logo from "../../images/Logo Esas.png"
import  "./navbar.scss"
const Navbar = () => {
    const lang = "eng"
    return (
        <div className="navbar-sec">
            <nav
                className="navbar navbar-expand-md "
                aria-label="Fourth navbar example"
            >
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="" style={{width:"150px",height:"65px"}}/>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample04"
                        aria-controls="navbarsExample04"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav m-auto mb-2 mb-md-0 gap-3">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/"} >
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
                                        <Link className="dropdown-item">
                                             Ölkədaxili
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item">
                                            Ölkəxarici
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/about"} >
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact"  >
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/blog"}>
                                    Blog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" >
                                    Services
                                </Link>
                            </li>


                        </ul>
                        <li className="nav-item dropdown " style={{cursor:"pointer"}}>
                            <a
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {lang ==="aze" ? <img src={aze} alt="" style={{width:"30px",height:"30px"}}/> : (lang==="eng") ? <img src={eng} alt="" style={{width:"30px",height:"30px"}}/> : (lang==="rus") ? <img src={rus} alt="" style={{width:"30px",height:"30px"}}/> : ""}
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item " >
                                        <img src={aze} alt="" style={{width:"30px",height:"30px",marginRight:"10px"}}/> AZE
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" >
                                        <img src={rus} alt="" style={{width:"30px",height:"30px",marginRight:"10px"}}/> RUS
                                    </Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" >
                                        <img src={eng} alt="" style={{width:"30px",height:"30px",marginRight:"10px"}}/> ENG
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
