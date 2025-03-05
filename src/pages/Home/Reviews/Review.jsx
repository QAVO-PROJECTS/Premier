import React from 'react';
import "./review.scss"
import plane from  "../../../images/Plane vector.png"
function Review() {
    return (
        <div className={"review"}>
            <div className={"title"}>
                <h2>Müştəri Rəyləri</h2>
            </div>
            <div className={"text-center"}>
                <img src={plane} alt=""/>
            </div>
        </div>
    );
}

export default Review;