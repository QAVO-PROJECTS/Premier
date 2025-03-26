import "./review.scss";
import plane from "/src/assets/plane.png";
import Index from "../../../../components/UserComponents/CurvedSlider/index.jsx";
import { useTranslation } from 'react-i18next';

function Review() {
    const { t } = useTranslation();

    return (
        <div className={"review"}>
            <div className={"container"}>
                <div className={"title"}>
                    <h2>{t("home.review.title", "Müştəri Rəyləri")}</h2>
                </div>
                <div>
                    <Index />
                </div>
                <div className={"text-center"}>
                    <img src={plane} alt="" className={"reviewImg"} />
                </div>
            </div>
        </div>
    );
}

export default Review;
