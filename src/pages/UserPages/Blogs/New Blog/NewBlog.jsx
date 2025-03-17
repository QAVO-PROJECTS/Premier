import React from 'react';
import "./newBlog.scss"
import {GoArrowRight} from "react-icons/go";
import image from "../../../../assets/Rectangle 39853.png"

function NewBlog() {
    return (
        <div className={"newBlog"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>Ana səhifə / <span>Bloq</span></p>
                </div>
                <div className={"title"}>
                    <div></div>
                    <h2>Ən Yeni</h2>
                </div>
                <div className={"row"}>
                    <div className={"col-lg-6"}>
                        <div className={"image"}>
                            <img src={image} alt=""/>
                        </div>
                    </div>
                    <div className={"col-lg-6"}>
                        <div className={"text"}>
                            <div className={"date"}>
                                02.03.2025
                            </div>
                            <h3>Türkiyədə Yay Tətili üçün Ən Yaxşı 5 Bölgə – Antalya, Bodrum, yoxsa Kapadokya?</h3>
                            <p>Türkiyə yay turizmi baxımından dünyanın ən məşhur istiqamətlərindən biridir. Həm
                                dəniz-günəş istirahəti, həm də tarixi və mədəni sərvətlərlə zəngin bölgələri ilə hər
                                kəsin zövqünə uyğun bir yer tapmaq mümkündür. Bəs hansı bölgə sizin üçün daha uyğundur?
                                Gəlin, Türkiyənin ən populyar 5 yay tətili bölgəsini müqayisə edək!</p>
                            <div style={{textAlign: "end"}}>
                                <button>Ətraflı oxu <GoArrowRight className={"icon"}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewBlog;