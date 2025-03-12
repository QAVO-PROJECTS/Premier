import React from "react";
import "./StartPage.scss";
import {ThreeDots} from "react-loader-spinner"; // Stil faylı

const StartPage = () => {
    return (
        <div className="start-page-container">

            <div className="start-page-spinner">
                <ThreeDots
                    visible={true}
                    height="100"
                    width="100"
                    color="#0D60FE"
                    radius="5"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />

            </div>
        </div>
    );
};

export default StartPage;
