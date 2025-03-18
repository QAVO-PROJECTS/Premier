import React from 'react';
import "./banner.scss";
import image from "../../../../assets/Rectangle 39858.png";
import { useTranslation } from 'react-i18next';

function Banner() {
    const { t } = useTranslation();

    return (
        <div className={"banner"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>
                        {t("aboutUs.banner.breadcrumb", "Ana səhifə /")}{" "}
                        <span>{t("aboutUs.banner.pageTitle", "Haqqımızda")}</span>
                    </p>
                </div>
                <div className={"title"}>
                    <h2>{t("aboutUs.banner.mainTitle", "Haqqımızda")}</h2>
                    <p>
                        {t("aboutUs.banner.subtitle", "Premier Tur olaraq, müştərilərimizə unudulmaz səyahət təcrübəsi təqdim etməyi hədəfləyirik.")}
                    </p>
                </div>
            </div>
            <img src={image} alt='' className={'banner-image'} />
        </div>
    );
}

export default Banner;
