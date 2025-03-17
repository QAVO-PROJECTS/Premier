import './tours.scss'
import tours from '../../../assets/Rectangle 39858 (1).png'
import city from "../../../assets/fluent_city-20-regular.png"
import Pagination from "../../../components/UserComponents/Pagination/Pagination.jsx";
import Recommed from "./Recommed/Recommed.jsx";
import TourCard from "../../../components/UserComponents/TourCard/index.jsx";

function Tours() {
    return (
        <div className={"tours"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>Ana səhifə / Turlar / <span>Ölkədaxili turlar</span></p>
                </div>
                <div className={"search row gy-3"} >
                    <div className={"col-lg-3 col-md-6 col-sm-6"}>
                        <div className={"search-bar"}>
                            <div className={"searchIcon"}>
                                <img src={city} alt=""/>
                            </div>
                            <div className={"servis-content"}>
                                <h5>Ölkə</h5>
                                <div className="btn-group">
                                    <button className="btn dropdown-toggle p-0" style={{color: "grey"}} type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Ölkə seç
                                    </button>
                                    <ul className="dropdown-menu">
                                        {/* Dropdown item-ləri əlavə et */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-3 col-md-6 col-sm-6"}>
                        <div className={"search-bar"}>
                            <div className={"searchIcon"}>
                                <img src={city} alt=""/>
                            </div>
                            <div className={"servis-content"}>
                                <h5>Şəhər</h5>
                                <div className="btn-group">
                                    <button className="btn dropdown-toggle p-0" style={{color: "grey"}} type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Şəhər seç
                                    </button>
                                    <ul className="dropdown-menu">
                                        {/* Dropdown item-ləri əlavə et */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-3 col-md-6 col-sm-6"}>
                        <div className={"search-bar"}>
                            <div className={"servis-content"}>
                                <input type={"date"} placeholder="Başlanğıc"/>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-3 col-md-6 col-sm-6"}>
                        <div className={"search-bar"}>
                            <div className={"servis-content"}>
                                <input type={"date"} placeholder="Son"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"tour-cards"}>
                    <div className={"card-head"}>
                        <h2>Ölkədaxili turlar</h2>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" style={{
                                padding: "20px 50px",
                                boxShadow: "1px 1px 16px 0px #5A5A5A1C",
                                borderRadius: "12px"
                            }} type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Sırala
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">A-z</a></li>
                                <li><a className="dropdown-item" href="#">Z-a</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={"row gy-4"} style={{marginBottom: "80px"}}>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                        <TourCard/>
                    </div>
                    {/* MD və daha böyük ekranlarda pagination göstər */}
                    <div className="d-none d-md-block">
                        <Pagination/>
                    </div>
                    {/* SM və daha aşağı ekranlarda "Ətraflı bax" düyməsi göstər */}
                    <div className="d-block d-md-none text-center">
                        <button
                            className="btn"
                            style={{
                                height: "63px",
                                gap: "8px",
                                padding: "18px 47.5px",
                                borderRadius: "52px",
                                border: "1px solid #000000",
                                background: "inherit",
                                fontWeight: "500",
                                fontSize: "18px",
                                lineHeight: "100%",
                            }}>
                            Ətraflı bax
                        </button>
                    </div>
                </div>
            </div>
            <Recommed/>
            <img src={tours} alt="tours" className={"banner-image-tour"}/>
        </div>
    );
}

export default Tours;
