import React from 'react';
import {CiCalendarDate} from "react-icons/ci";
import {TbBed} from "react-icons/tb";
import {LuTicketPercent} from "react-icons/lu";
import {TfiHeadphoneAlt} from "react-icons/tfi";
import image from '../../../assets/14b27fe7450f54d11627f5cb8e073b76.jpg'
import "./reserveCard.scss"
function ReserveCard() {
    return (
        <div className={"col-4 w-100"}>
            <div className={"reserveCard"}>
                <div className={"image"}>
                    <img src={image} alt=''/>
                </div>
                <div className={"card-content"}>
                    <div className={"text"}>
                        <h3>Yunanistan</h3>

                        <li><CiCalendarDate  className={"icon"}/>  10.06.2025 - 16.06.2025</li>
                        <li><TbBed  className={"icon"}/>  Hoteldə gecələmə</li>
                        <li><LuTicketPercent  className={"icon"}/>  Aviabilet</li>
                        <li><TfiHeadphoneAlt  className={"icon"}/>  Səyahət sığortası</li>
                        <button>Rezervasiya et</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReserveCard;