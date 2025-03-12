import React from 'react';
import './tours.scss'
import tours from '../../images/Rectangle 39858 (1).png'
import city from "../../images/fluent_city-20-regular.png"
import Card from "../../components/Card/Card.jsx";
import TourCard from "../../components/TourCard/TourCard.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Recommed from "./Recommed/Recommed.jsx";
function Tours() {
    return (
        <div className={"tours"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>Ana səhifə / Turlar / <span>Ölkədaxili turlar</span></p>
                </div>
                <div className={"search"}>
                    <div className={"search-bar"}>
                        <div className={"searchIcon"}>
                            <img src={city} alt=""/>
                        </div>
                        <div className={"content"}>
                            <h5>Ölkə</h5>
                            <div className="btn-group">
                                <button className="btn dropdown-toggle p-0 " style={{color:"grey"}} type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    Ölkə seç
                                </button>
                                <ul className="dropdown-menu">

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={"search-bar"}>
                        <div className={"searchIcon"}>
                            <img src={city} alt=""/>
                        </div>
                        <div className={"content"}>
                            <h5>Şəhər</h5>
                            <div className="btn-group">
                                <button className="btn dropdown-toggle p-0 " style={{color:"grey"}} type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    Şəhər seç
                                </button>
                                <ul className="dropdown-menu">

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={"search-bar"}>
                        <div className={"content"}>
                            <input type={"date"} placeholder="Başlanğıc"/>
                        </div>
                    </div>
                    <div className={"search-bar"}>
                        <div className={"content"}>
                            <input type={"date"} placeholder="Son"/>
                        </div>
                    </div>
                </div>
                <div className={"tour-cards"}>
                    <div className={"card-head"}>
                        <h2>Ölkədaxili turlar</h2>
                        <div className="dropdown">
                            <button className="btn  dropdown-toggle" style={{padding:"20px 50px",
                            boxShadow:"1px 1px 16px 0px #5A5A5A1C",borderRadius:"12px"}} type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Sırala
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">A-z</a></li>
                                <li><a className="dropdown-item" href="#">Z-a</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={"row gy-4 "} style={{marginBottom:"80px"}}>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                    </div>
                    <Pagination/>
                </div>
            </div>
            <Recommed/>
            <img src={tours} alt="tours" className={"banner-image-tour"}/>
        </div>
    );
}

export default Tours;