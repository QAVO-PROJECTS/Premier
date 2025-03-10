import React from 'react';
import "./aboutUs.scss"
import image from "../../../images/aboutCards.jpg"
import {GoArrowRight} from "react-icons/go";

function AboutUs() {
    return (
        <div className={"aboutUs"}>
            <div className={"container"}>
                <div className={'row'} style={{rowGap:"100px",marginBottom:"100px"}}>
                    <div className={'col-6'}>
                        <div className={"image"}>
                            <img src={image}/>
                        </div>
                    </div>
                    <div className={'col-6'}>
                        <div className={"content right"}>
                            <h1>01</h1>
                            <h4>Türkiyədə Yay Tətili üçün Ən Yaxşı 5 Bölgə – Antalya, Bodrum, yoxsa Kapadokya?</h4>
                            <p>Türkiyə yay turizmi baxımından dünyanın ən məşhur istiqamətlərindən biridir. Həm
                                dəniz-günəş istirahəti, həm də tarixi və mədəni sərvətlərlə zəngin bölgələri ilə hər
                                kəsin zövqünə uyğun bir yer tapmaq mümkündür. </p>
                            <button>Ətraflı bax <GoArrowRight className={"icon"}/></button>
                        </div>
                    </div>

                    <div className={'col-6'}>
                        <div className={"content left"}>
                            <h1>02</h1>
                            <h4>Türkiyədə Yay Tətili üçün Ən Yaxşı 5 Bölgə – Antalya, Bodrum, yoxsa Kapadokya?</h4>
                            <p>Türkiyə yay turizmi baxımından dünyanın ən məşhur istiqamətlərindən biridir. Həm
                                dəniz-günəş istirahəti, həm də tarixi və mədəni sərvətlərlə zəngin bölgələri ilə hər
                                kəsin zövqünə uyğun bir yer tapmaq mümkündür. </p>
                            <button>Ətraflı bax <GoArrowRight className={"icon"}/></button>
                        </div>
                    </div>
                    <div className={'col-6'}>
                        <div className={"image"}>
                            <img src={image}/>
                        </div>
                    </div>


                    <div className={'col-6'}>
                        <div className={"image"}>
                            <img src={image}/>
                        </div>
                    </div>
                    <div className={'col-6'}>
                        <div className={"content right"}>
                            <h1>03</h1>
                            <h4>Türkiyədə Yay Tətili üçün Ən Yaxşı 5 Bölgə – Antalya, Bodrum, yoxsa Kapadokya?</h4>
                            <p>Türkiyə yay turizmi baxımından dünyanın ən məşhur istiqamətlərindən biridir. Həm
                                dəniz-günəş istirahəti, həm də tarixi və mədəni sərvətlərlə zəngin bölgələri ilə hər
                                kəsin zövqünə uyğun bir yer tapmaq mümkündür. </p>
                            <button>Ətraflı bax <GoArrowRight className={"icon"}/></button>
                        </div>
                    </div>

                    <div className={'col-6'}>
                        <div className={"content left"}>
                            <h1>04</h1>
                            <h4>Türkiyədə Yay Tətili üçün Ən Yaxşı 5 Bölgə – Antalya, Bodrum, yoxsa Kapadokya?</h4>
                            <p>Türkiyə yay turizmi baxımından dünyanın ən məşhur istiqamətlərindən biridir. Həm
                                dəniz-günəş istirahəti, həm də tarixi və mədəni sərvətlərlə zəngin bölgələri ilə hər
                                kəsin zövqünə uyğun bir yer tapmaq mümkündür. </p>
                            <button>Ətraflı bax <GoArrowRight className={"icon"}/></button>
                        </div>
                    </div>
                    <div className={'col-6'}>
                        <div className={"image"}>
                            <img src={image}/>
                        </div>
                    </div>

                </div>
                <div className={"button"}>
                    <button>Daha çox</button>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;