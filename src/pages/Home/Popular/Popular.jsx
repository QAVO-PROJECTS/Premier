import React from 'react';
import Card from "../../../components/Card/Card.jsx";
import "./popular.scss"
import background from "../../../images/Rectangle 39840.png"
import {FaArrowLeft} from "react-icons/fa6";
import {FaArrowRight} from "react-icons/fa6";
function Popular() {
    return (
        <div className={"popular"}>
            <div className={"container"}>
               <div className={"title"}>
                   <h2>Ən Populyar Ölkələr</h2>
                   <p>Səyahətsevərlərin ən çox bəyəndiyi istiqamətlər! Populyar şəhərlər, rahat turlar və unikal təcrübələr sizi gözləyir.</p>
               </div>
                <div className={"row p-5"}>
                    <div className={"col-12 text-end "} style={{marginBottom:"40px"}}>
                        <button className={"white"}><FaArrowLeft /></button>
                        <button className={"blue"}><FaArrowRight /></button>
                    </div>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
            <div className={"background"}></div>
        </div>
    );
}

export default Popular;