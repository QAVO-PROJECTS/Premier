import React from 'react';
import { useTranslation } from 'react-i18next';
import main from '../../../assets/npResult.png';
import "./index.scss";
import {Link} from "react-router-dom";

function NotResult() {
    const { t } = useTranslation();
    return (
        <div className="notResult">
            <div className="result">
                <div className="notResultImage">
                    <img src={main} alt={t("notResult.alt")} />
                </div>
                <h2>{t("notResult.title")}</h2>
                <p>{t("notResult.description")}</p>
                <button ><Link to={"/"} style={{color:"white"}}>{t("notResult.goBack")}</Link></button>
            </div>
        </div>
    );
}

export default NotResult;
