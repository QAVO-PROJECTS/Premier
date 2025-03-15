import React from 'react';
import "./banner.scss"
import image from "../../../../assets/Rectangle 39858.png"
function Banner() {
    return (
        <div className={"banner"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>Ana səhifə / <span>Haqqımızda</span></p>
                </div>
                <div className={"title"}>
                    <h2>Haqqımızda</h2>
                    <p>Premier Tur olaraq, müştərilərimizə unudulmaz səyahət təcrübəsi təqdim etməyi hədəfləyirik.</p>
                </div>

            </div>
            <img  src={image} alt=''/>
        </div>
);
}

export default Banner;