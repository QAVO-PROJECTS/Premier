import React from 'react';
import "./review.scss"
import plane from  "../../../images/Plane vector.png"
import CurvedSlider from "../../../components/CurvedSlider/CurvedSlider.jsx";
function Review() {
    return (
        <div className={"review"}>
            <div className={"container"}>
                <div className={"title"}>
                    <h2>Müştəri Rəyləri</h2>
                </div>
                <div>
                    <CurvedSlider/>

                </div>
                <div className={"text-center"}>
                    <img src={plane} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Review;