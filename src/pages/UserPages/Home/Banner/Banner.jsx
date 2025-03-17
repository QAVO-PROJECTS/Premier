import React from 'react';
import banner from "../../../../assets/banner.png"
import "./banner.scss"
import {CiSearch} from "react-icons/ci";
import plane from "../../../../assets/Plane vector 2.png"
import homeBanner from "../../../../assets/homeBannerMobile.png"
function Banner() {
    return (
        <div className={"banner-home"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-lg-6 align-content-center left"}>
                        <h1>Dünyanı <span>Premier Tour</span> ilə Kəşf Et</h1>
                        <p>Sizin üçün ən möhtəşəm və unudulmaz turları seçirik – rahat, əyləncəli və dolğun səyahət
                            təcrübəsi üçün bizə güvənin!</p>
                        <div className={"d-flex gap-3 choosen"}>
                           <input type={"text"} placeholder={" Hara getmək istəyirsiniz ? Şəhər, ölkə və ya tur adı daxil edin..."}/>
                            <button><CiSearch/></button>
                        </div>
                        <img src={plane} alt="" style={{}} className={"plane-image"}/>
                    </div>
                    <div className={"col-6 d-none d-lg-block"}>
                        <div className={"image"}>
                            <img src={banner} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <img src={homeBanner} alt="" className={"home-banner d-block d-md-none"} />
        </div>
    );
}

export default Banner;