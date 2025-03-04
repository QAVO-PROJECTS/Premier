import React from 'react';
import banner from "../../../images/banner.png"
import "./banner.scss"
import {CiSearch} from "react-icons/ci";
import {IoPeopleOutline} from "react-icons/io5";
import {FaChevronDown} from "react-icons/fa";
import {LuCalendarDays} from "react-icons/lu";
import {MdOutlineTour, MdOutlineWatchLater} from "react-icons/md";

function Banner() {
    return (
        <div className={"banner"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-6 align-content-center"}>
                        <h1>Dünyanı <span>Premier Tour</span> ilə Kəşf Et</h1>
                        <p>Sizin üçün ən möhtəşəm və unudulmaz turları seçirik – rahat, əyləncəli və dolğun səyahət
                            təcrübəsi üçün bizə güvənin!</p>
                        <div className={"d-flex gap-3 choosen"}>
                            <div className={"choose"}>
                                <IoPeopleOutline className={"icon"}/>
                                <div>
                                    <p>Nəfər</p>
                                    <span>Sayı seç          <FaChevronDown/></span>
                                </div>
                            </div>
                            <div className={"choose"}>
                                <LuCalendarDays className={"icon"}/>
                                <div>
                                    <p>Tarix</p>
                                    <span>Tarixi seç       <FaChevronDown/></span>
                                </div>
                            </div>
                            <div className={"choose"}>
                                <MdOutlineWatchLater className={"icon"}/>
                                <div>
                                    <p>Saat</p>
                                    <span>Vaxtı seç       <FaChevronDown/></span>
                                </div>
                            </div>
                            <div className={"choose"}>
                                <MdOutlineTour className={"icon"}/>
                                <div>
                                    <p>Tur</p>
                                    <span>Turu seç       <FaChevronDown/></span>
                                </div>
                            </div>
                            <button><CiSearch/></button>
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"image"}>
                            <img src={banner} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;