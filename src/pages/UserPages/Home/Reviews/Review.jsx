import React from 'react';
import "./review.scss"
import plane from "../../../../assets/airp.png"
import Index from "../../../../components/UserComponents/CurvedSlider/index.jsx";
function Review() {
    return (
        <div className={"review"}>
            <div className={"container"}>
                <div className={"title"}>
                    <h2>Müştəri Rəyləri</h2>
                </div>
                <div>
                    <Index/>

                </div>
                <div className={"text-center"}>
                    <img src={plane} alt="" className={"reviewImg"} />
                </div>
            </div>
        </div>
    );
}

export default Review;