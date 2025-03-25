import React from 'react';
import { useTranslation } from 'react-i18next';
import main from '../../../assets/npResult.png';
import "./index.scss";

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
            </div>
        </div>
    );
}

export default NotResult;
