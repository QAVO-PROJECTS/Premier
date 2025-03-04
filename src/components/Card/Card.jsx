import React from 'react';
import  "./card.scss"
import {FaArrowRightLong} from "react-icons/fa6";
import  image from "../../images/5b9cf82fb66a7a54720e233be60ac45e.jpg"
import {FaStar} from "react-icons/fa";
function Card() {
    return (
        <div className={"col-3"}>
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
                        <p>$ 350 / <span>person</span></p>
                    </div>
                    <button><FaArrowRightLong /></button>
                </div>
            </div>
        </div>
    );
}

export default Card;