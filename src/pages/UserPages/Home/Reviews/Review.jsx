import React, { useState, useEffect } from "react";
import "./review.scss";
import plane from "/src/assets/plane.png";
import { useTranslation } from "react-i18next";
import CurvedSlider from "../../../../components/UserComponents/CurvedSlider/index.jsx";
import SwiperComponent from "../../../../components/UserComponents/SimpleSlider/index.jsx";

function Review() {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // 768px-dən aşağı ölçü mobil hesab edilir
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="review">
            <div className="container">
                <div className="title">
                    <h2>{t("home.review.title", "Müştəri Rəyləri")}</h2>
                </div>
                <div>
                    {isMobile ? <SwiperComponent /> : <CurvedSlider />}
                </div>
                <div className="text-center">
                    <img src={plane} alt="Plane" className="reviewImg" />
                </div>
            </div>
        </div>
    );
}

export default Review;
