import React from 'react';
import  "./tourcard.scss"
import {FaArrowRightLong} from "react-icons/fa6";
import  image from "../../images/5b9cf82fb66a7a54720e233be60ac45e.jpg"
import {FaStar} from "react-icons/fa";
function TourCard() {
    return (
        <div className={"col-md-3 col-sm-6 col-xs-12 "}>
            <div className={"card"}>
                <div className={"image"}>
                    <img src={image} alt=""/>
                    <div className={"raiting"}>
                        <p>5.0 </p> <FaStar />
                    </div>
                </div>
                <div className={"card-content"}>
                    <div className={"text"}>
                        <h3>Yunanistan</h3>
                    </div>
                    <button><FaArrowRightLong className={'mb-1'}/></button>
                </div>
            </div>
        </div>
    );
}

export default TourCard;