import React, { useEffect } from 'react';
import "./review.scss";
import plane from "/src/assets/plane.png";
import Index from "../../../../components/UserComponents/CurvedSlider/index.jsx";
import { useTranslation } from 'react-i18next';
import { useGetAllCustomerViewsQuery } from "../../../../services/adminApi.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Review() {
    const { t } = useTranslation();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="review" data-aos="fade-up">
            <div className="container" data-aos="fade-in">
                <div className="title" data-aos="fade-right">
                    <h2>{t("home.review.title", "Müştəri Rəyləri")}</h2>
                </div>
                <div data-aos="zoom-in">
                    <Index />
                </div>
                <div className="text-center" data-aos="flip-up">
                    <img src={plane} alt="" className="reviewImg" />
                </div>
            </div>
        </div>
    );
}

export default Review;
